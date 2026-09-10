import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".astro/**",
      "_action_files/**",
      "_fastpages_docs/**",
      "_includes/**",
      "_layouts/**",
      "_notebooks/**",
      "_pages/**",
      "_posts/**",
      "_word/**",
      "assets/**",
      "images/**",
    ],
  },
  ...eslintPluginAstro.configs.recommended,
];
