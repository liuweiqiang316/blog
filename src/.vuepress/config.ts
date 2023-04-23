import { defineUserConfig } from "vuepress";
import { path } from "@vuepress/utils";
import theme from "./theme.js";

const BASE_URL: any = process.env.BASE_URL || "/";

export default defineUserConfig({
  base: BASE_URL,

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

  alias: {
    "@theme-hope/components/PageFooter": path.resolve(
      __dirname,
      "./layout/Footer.vue"
    ),
  },

  // Enable it with pwa
  // shouldPrefetch: false,
});
