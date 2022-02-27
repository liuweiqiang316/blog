module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: '微斯人的博客',
    description: '微斯人的杂货铺',

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',
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
                        text: 'isArray',
                        link: '/手写/isArray.md'
                    }
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
        ],
        contributors: false,
        lastUpdatedText: '最后更新于',
    },
}