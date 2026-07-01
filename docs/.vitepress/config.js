import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Wang Lab',
  description: 'AI for Physics — 计算量子物理与人工智能 @ 中国科学院物理研究所',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '关于', link: '/about' },
      { text: '成员', link: '/people/' },
      { text: '研究', link: '/research/' },
      { text: '发表', link: '/publications/' },
      { text: 'AI日报', link: '/daily/' },
    ],

    sidebar: {
      '/people/': [],
      '/research/': [
        {
          text: '研究方向',
          items: [
            { text: '研究概览', link: '/research/' },
            { text: '组会记录', link: '/research/groupmeetings/' },
          ],
        },
      ],
      '/research/groupmeetings/': [
        {
          text: '按年份',
          items: [
            { text: '组会列表', link: '/research/groupmeetings/' },
            { text: '2026', link: '/research/groupmeetings/2026' },
            { text: '2025', link: '/research/groupmeetings/2025' },
            { text: '2024', link: '/research/groupmeetings/2024' },
            { text: '2023', link: '/research/groupmeetings/2023' },
            { text: '2022', link: '/research/groupmeetings/2022' },
            { text: '2021', link: '/research/groupmeetings/2021' },
            { text: '2020', link: '/research/groupmeetings/2020' },
            { text: '2019', link: '/research/groupmeetings/2019' },
          ],
        },
      ],
      '/daily/': [
        {
          text: 'AI日报',
          items: [
            { text: '日报列表', link: '/daily/' },
          ],
        },
      ],
    },

    footer: {
      message: 'Wang Lab · Institute of Physics, Chinese Academy of Sciences',
      copyright: `© ${new Date().getFullYear()} Wang Lab. Powered by VitePress.`,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wangleiphy' },
    ],

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: '页面导航',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
  },
})
