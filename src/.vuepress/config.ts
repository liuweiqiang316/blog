import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",

  // locales: {
  //   "/": {
  //     lang: "en-US",
  //     title: "Blog Demo",
  //     description: "A blog demo for vuepress-theme-hope",
  //   },
  //   "/zh/": {
  //     lang: "zh-CN",
  //     title: "微斯人的博客",
  //     // description: "vuepress-theme-hope 的博客演示",
  //   },
  // },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
