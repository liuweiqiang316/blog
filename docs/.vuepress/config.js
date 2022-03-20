const meta = require('../meta.json')

module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: '微斯人的博客',
    description: '微斯人的杂货铺',
    base: '/blog/',

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        // logo: 'https://vuejs.org/images/logo.png',
        sidebar: meta,
        contributors: false,
        lastUpdatedText: '最后更新于',
    },
}