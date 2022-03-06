module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: '微斯人的博客',
    description: '微斯人的杂货铺',
    base:'/blog/',

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        // logo: 'https://vuejs.org/images/logo.png',
        sidebar: [
            {
                text: 'JavaScript异步',
                link: '/JavaScript异步'
            },
            {
                text: '手写',
                link: '/手写',
                children: [
                    {
                        text: 'Promise',
                        link: '/手写/promise.md'
                    },
                    {
                        text: 'isArray',
                        link: '/手写/isArray.md'
                    },
                    {
                        text: 'reduce',
                        link: '/手写/reduce.md'
                    },
                    {
                        text: 'sym',
                        link: '/手写/sym.md'
                    },
                    {
                        text: '生成器执行器',
                        link: '/手写/run.md'
                    },
                ]
            },
            {
                text: 'vue源码',
                link: '/vue源码'
            },
            {
                text: 'http常用知识',
                link: '/http常用知识'
            },
            {
                text: 'Linux常用命令',
                link: '/Linux常用命令'
            },
            {
                text: 'git',
                link: '/git'
            },
            {
                text: '代码片段',
                link: '/代码片段'
            },
            {
                text: 'vue.js设计与实现的阅读笔记',
                link: '/vue.js设计与实现的阅读笔记'
            },
        ],
        contributors: false,
        lastUpdatedText: '最后更新于',
    },
}