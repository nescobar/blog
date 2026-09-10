---
layout: ../../layouts/ArchiveArticleLayout.astro
slug: visualize-databricks-dashboard-tableau
title: Visualizing Databricks dashboards in Tableau
description:
  es: Cómo exportar un dashboard de Databricks, publicarlo en S3 e integrarlo en Tableau.
  en: How to export a Databricks dashboard, publish it to S3, and embed it in Tableau.
publishedDate: "2020-09-16"
language: en
topic:
  es: Visualización de datos
  en: Data visualization
---
In this article I will describe the steps to set up a notebook that exports a Databricks dashboard as an HTML file and uploads it to an [S3 bucket configured for static website hosting](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html). In Tableau, we will create a dashboard that will embed the URL where the file is located.

![databricks-tableau-cropped.png](/images/databricks-tableau-cropped.png)

## Notebooks and Data Visualization Tools

Notebooks and data visualization tools are important components of an enterprise data framework. Notebooks are mainly used by data scientists for exploratory data analysis, statistical modeling and machine learning. Specialized data visualization tools such as Tableau focus on providing users with a platform to quickly build interactive reports and dashboards with almost no technical background.

In general, when there are new questions raised by business users which require data exploration and fast feedback, notebooks are very helpful because of their flexibility and speed to try out different paths and provide insights quickly. Even though notebooks could be exported in a friendly format and shared, many users prefer to use their enterprise standard visualization tool as an entry point to all reports and dashboards.

There are also cases where specialized visualization tools do not have the capability to build advanced customized graphs. In my particular situation, I needed to build an interactive network graph with nodes and edges that were constantly being updated. After some research I found that I could use a Javascript library called [D3.js](https://d3js.org/) which have powerful visualization capabilities. In addition, [Databricks allows to embed D3.js visualizations in its notebooks](https://docs.databricks.com/notebooks/visualizations/html-d3-and-svg.html), so one can integrate it with the rest of the data pipeline.

There are two steps in the process: first to build the Databricks dashboard that will contain the different graphs, and then to export this so that it can be accessed from Tableau. Even though the first step of generating the network graph with D3.js is really fun, in this article I will focus on the second step.

## Running the notebook
First we need to run the notebook that have the visualizations for the dashboard we want to use. We will use the _run_id_ of the executed notebook to export the dashboard.

When this notebook runs, it will store the _run_id_ in a global temporary table. This is done by including the following snippet:

```scala
%scala
val runId = dbutils.notebook.getContext.currentRunId.toString
Seq(runId).toDF("run_id").createOrReplaceTempView("run_id")

val notebookPath = dbutils.notebook.getContext().notebookPath.get
Seq(notebookPath).toDF("notebook_path").createOrReplaceTempView("notebook_path")
```

[Original snippet on GitHub Gist](https://gist.github.com/0ff427e4396b6b31c5a0055576672fce).

The _run_id_ is then extracted from the previously created view, along with the name of the notebook. A new global temporary view will be created with the name: _run_id_notebook-name_

```python
# Get run_id from temporary view
runId = spark.table("run_id").head()["run_id"]
runId = re.findall(r'\d+', runId)[0]
runId = int(runId)
data = [[runId]]

# Get notebook name
notebook_path = spark.table("notebook_path").head()["notebook_path"]
path_split = notebook_path.split("/")
nb_name = path_split[len(path_split)-1]

# Create global temporary view with run_id_notebook-name
df = spark.createDataFrame(data, schema=schema)
df.createOrReplaceGlobalTempView("run_id_{}".format(nb_name))
```

[Original snippet on GitHub Gist](https://gist.github.com/af2aa30bf25c82e296d8c1e50ebb5bc8).


## Exporting the Databricks notebook
In a separate notebook (let's call it _network_graph_export_), we will run the notebook and get the run_id after it is executed.

```python
# Run notebook
notebook_name = 'network_graph'
dbutils.notebook.run(notebook_name, 180)

# Get run_id from notebook
global_temp_db = spark.conf.get("spark.sql.globalTempDatabase")
run_id_table = 'run_id_{}'.format(notebook_name)
run_id = table(global_temp_db + "." + run_id_table).first()[0]
```

[Original snippet on GitHub Gist](https://gist.github.com/152a8721a7ca6deff31cfb02a3e6c2ee).

We define a method that will use the previously obtained _run_id_ and the [Databricks REST API](https://docs.databricks.com/dev-tools/api/latest/index.html) to export the Dashboard in JSON format.

The _ACCOUNT_ in the _DOMAIN_ variables should be replaced by your own Databricks account name. The API requires a token for authentication. [This personal token can be generated in the Databricks UI or via the REST API](https://docs.databricks.com/dev-tools/api/latest/authentication.html).

The token is stored in what is called a [Databricks secret](https://docs.databricks.com/security/secrets/index.html). This utility can store any sort of credentials outside notebooks so that they can be retrieved when needed.

```python
# Databricks access credentials
DOMAIN = 'ACCOUNT.cloud.databricks.com'
TOKEN = dbutils.secrets.get(scope="databricks", key="token")
BASE_URL = 'https://%s/api/2.0/jobs/runs/export?run_id=' % (DOMAIN)

# Exports notebook with given run id as a JSON object
def export_notebook(run_id):
 views_to_export = '&views_to_export=DASHBOARDS'
 response = requests.get(
   BASE_URL + str(run_id) + views_to_export,
   headers={'Authorization': 'Bearer %s' % TOKEN}
 )
 return response.json()
```

[Original snippet on GitHub Gist](https://gist.github.com/f751a9d49308d63351935601f3ac0143).


## Uploading the exported file to an S3 bucket
To be able to upload the files to the S3 bucket that is configured to host static webpages, we first retrieve the access and secret keys using Databricks secrets utility.
The _upload_to_s3_ method takes the file name and actual content as parameters and creates a new file in the DBFS file store. Then, this file is uploaded to the previously defined S3 bucket.

```python
# AWS
ACCESS_KEY = dbutils.secrets.get(scope="aws-s3", key="access_key")
SECRET_KEY = dbutils.secrets.get(scope="aws-s3", key="secret_key")
ENCODED_SECRET_KEY = dbutils.secrets.get(scope="aws-s3", key="encoded_secret_key")
AWS_BUCKET_NAME = "bucket-static-webpages"

def upload_to_s3(file_name, file_content):

  # Check if file_name is a key in dashboards dictionary
  if file_name not in dashboards:
    print("{} is not a key in the dictionary".format(file_name))
    return

  # Create file in DBFS Filestore
  try:
    dbutils.fs.rm("/FileStore/graph_file_static/{}.html".format(dashboards[file_name]))
    dbutils.fs.put("/FileStore/graph_file_static/{}.html".format(dashboards[file_name]), file_content)
  except:
    dbutils.fs.put("/FileStore/graph_file_static/{}.html".format(dashboards[file_name]), file_content)

  # Upload file from Filestore to S3
  s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
  with open("/dbfs/FileStore/graph_file_static/{}.html".format(dashboards[file_name]), "rb") as f:
     s3.upload_fileobj(f, AWS_BUCKET_NAME, "{}.html".format(dashboards[file_name]), ExtraArgs={'ACL': 'public-read', 'ContentType':'text/html'})

  print("File {} uploaded to S3".format(file_name))
```

[Original snippet on GitHub Gist](https://gist.github.com/4a014af350613656ae5f8e86a17edf84).


## Running the export and upload
The JSON response that we get from the _export_notebook_ method includes all views (dashboards) related to the notebook that we executed. There, we can choose to upload to S3 as many dashboards as we need (stored in the dashboards dictionary) but in this example I'm only choosing to upload one.

```python
# Maps dashboards to HTML files
dashboards = {
  'Network Graph Dashboard' : 'network_graph'
}

# Get JSON response from HTTP export request
response = export_notebook(run_id)

# For each dashboard, get content and upload to S3
for view in response.get("views"):
  upload_to_s3(view.get("name"), view.get("content"))
```

[Original snippet on GitHub Gist](https://gist.github.com/d55489476b5b0e65465fe05b37eeeb7e).

## Embedding the Databricks dashboard in Tableau
Finally, now that the dashboard is uploaded to S3 as an HTML static file, we will use the corresponding URL to visualize it in a Tableau dashboard. To do this, we just have to create a new dashboard and drag the Web Page object to the canvas. This will open a dialog box where you need to type the URL of the HTML file located in the S3 web hosting.

![tableau-snapshot-embed-url.png](/images/tableau-snapshot-embed-url.png)


## And that's it!

Now, the Tableau dashboard will point to the URL where the exported Databricks notebook is located. If this needs to be updated frequently, you can set up a job that recreates the file from the Databricks notebook and replace the previous file in the S3 bucket with the new one.
