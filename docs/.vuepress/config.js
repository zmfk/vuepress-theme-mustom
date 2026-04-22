// 路径拼接导入 --zm
const path = require('path');

const secret = require("./_secret");





module.exports = {
  // https://www.vuepress.cn/zh/config/

  // 1. 注入 Stylus 全局变量 --zm
  stylus: {
    import: [
      path.resolve(__dirname, '../../styles/palette.styl')
    ]
  },

  theme: require.resolve("../../"),

  base: "/",

  title: "醉梦 の 置物处 | SuiMu's THINGSHOUSE",

  description:
    "醉梦, SuiMu, 酔夢, 置物处, 博客, THINGSHOUSE, Mustom, VuePress, 耀の个人网站, 醉梦の置物处, SuiMu の Personal Website, SuiMu's Personal Website",

  themeConfig: {
    domain: "https://zmfk.github.io", // for sitemap generate
    translate: secret.translate, // baidu translation
    comment: secret.comment, // vssue setting
    // clustrmaps setting
    clustrmaps: {
      id: "clustrmaps", // clstr_globe / clustrmaps
      src:
        "//cdn.clustrmaps.com/map_v2.js?cl=333333&w=a&t=t&d=kuCCiVvtASTqmAMxPSTLcjxs-p8j6ht3LUi9z9Q-OKc&co=ffffff&cmo=3acc3a&cmn=ff5353&ct=333333"
    },
    author: "SuiMu", 
    year: 2026, // year of site started
    maximizeLaunch: false, // full size image for launch
    noEmpty: false, // hide empty component
    recentPostOffset: 5, // number of recent posts each time click on 'more post'
    searchMaxSuggestions: 19, // max number of search results display
    images: {
      // for image replacment; no base needed; first layer key points to component name
      ad:
        "https://raw.githubusercontent.com/jinyaoMa/jinyaoMa/master/qrcode.png",
      avatar: "/assets/img/avatar.png",
      brand: "/assets/img/brand.png",
      hitokoto: {
        left: "/assets/img/hitokoto.left.png",
        right: "/assets/img/hitokoto.right.png"
      },
      empty: "/assets/img/empty.png",
      records: "/assets/img/records.png",
      background: "/assets/img/background.png"
    },
    dateFormatter: (time) => {
      // for sitemap dateFormatter used
      const regexAM = /├\w\d\d: AM┤/;
      const regexPM = /├\w\d\d: PM┤/;
      return new Date(
        time.replace(regexAM, "AM").replace(regexPM, "PM")
      ).toISOString();
    },
    customBackgrounds: [
      //'/assets/img/background.png',
      //'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596065328389&di=ad7a9cc49e45547721005bd528325f0d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F58b4ef69ed377.jpg',
      //'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596063652971&di=8b659ee5cd46f4006d082b626eb3bd0d&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F180330%2F4-1P330160644.jpg'
    ],
    socialShare: {
      // https://sns.goyfe.com/guide/
      networks: [
        "qq",
        "weibo",
        "douban",
        "email",
        "whatsapp",
        "facebook",
        "reddit",
        "telegram",
        "line"
      ],
      email: "2272909403@qq.com",
      fallbackImage: "/assets/img/avatar.png",
      noGlobalSocialShare: true
    },
    // startup notification; priority => index 0 = highest
    // type: 'default', 'warning', 'error'
    notification: [
      {
        // welcome msg
        type: "default",
        msg: [
          "<strong>欢迎来到我的个人网站！技术交流请加 QQ 群：还没有喵，也可以加本人QQ：2272909403<strong>", // zh
          "<strong>Welcome to my personal website! <strong>" // en
        ]
      },
      {
        type: "warning",
        msg: [
          '<strong>没东西喵</strong>', // zh
          '<strong>No content available</strong>' // en
        ]
      }
    ],
    qrcodes: [
      {
        // qrcode for contact and friending
        tooltip: [
          "扫码加我QQ", // zh
          "Scan QR code to friend me via QQ" // en
        ],
        locale: [
          "QQ", // zh
          "QQ" // en
        ],
        path: "/assets/img/qq.png" // no base needed
      },
      {
        tooltip: [
          "扫码加我微信", // zh
          "Scan QR code to friend me via WeChat" // en
        ],
        locale: [
          "微信", // zh
          "WeChat" // en
        ],
        path: "/assets/img/wechat.png" // no base needed
      }
    ],
    header: {
      sitename: [
        "<em><span>醉梦 の</span></em><strong><span>置物处</span></strong>", // zh
        "<em><span>SuiMu's</span></em><strong><span>THINGSHOUSE</span></strong>" // en
      ]
    },
    brand: {
      signatures: [
        "我行即我思 , 我思即我<br>&nbsp;", // zh
        "I act, therefore I think;<br>  I think, therefore I am.<br>&nbsp;" // en
      ],
      contacts: [
        {
          icon: '<i class="fab fa-github fa-fw"></i>',
          text: "zmfk",
          link: "https://github.com/zmfk"
        },
        {
          icon: '<i class="fas fa-envelope fa-fw"></i>',
          text: "2272909403@qq.com",
          link: "mailto://2272909403@qq.com"
        },
        {
          icon: '<i class="fab fa-qq fa-fw"></i>',
          text: "2272909403",
          link: "tencent://Message/?uin=2272909403"
        }
      ]
    },
    menus: [
      {
        caption: [
          "菜单", // zh
          "MENU" // en
        ],
        icon: '<i class="fas fa-sitemap fa-fw"></i>',
        items: [
          {
            icon: '<i class="fas fa-home fa-fw"></i>',
            text: [
              "首页", // zh
              "Home" // en
            ],
            link: "/"
          },
          {
            icon: '<i class="fas fa-archive fa-fw"></i>',
            text: [
              "归档", // zh
              "Archive" // en
            ],
            link: "/archive/"
          },
          {
            icon: '<i class="fas fa-box fa-fw"></i>',
            text: [
              "代码库", // zh
              "Code Library" // en
            ],
            link: "/codes/"
          },
          {
            icon: '<i class="fas fa-icons fa-fw"></i>',
            text: [
              "图标字体库", // zh
              "Icon Font Library" // en
            ],
            link: "/icons/"
          },
          {
            icon: '<i class="fas fa-edit fa-fw"></i>',
            text: [
              "记录", // zh
              "Records" // en
            ],
            link: "/records/"
          },
          {
            icon: '<i class="fas fa-images fa-fw"></i>',
            text: [
              "图库", // zh
              "Gallery" // en
            ],
            link: "/gallery/"
          },
          {
            icon: '<i class="fas fa-user fa-fw"></i>',
            text: [
              "关于", // zh
              "About" // en
            ],
            link: "/about/"
          }
        ]
      }
    ],
    meting: {},   //不用了 --zm
    // external links; use for the component that displays after clicking on the left-top button of header
    portals: [
      {
        name: "My Site",
        desc: "醉梦 の 个人网站 | SuiMu の Personal Website",
        icon: "/assets/img/avatar.png",
        link: "/"
      },
      {
        name: "Palette",
        desc: "想知道图片主题色？",
        icon: "https://jinyaoma.github.io/Palette/icon.png",
        link: "https://jinyaoma.github.io/Palette/"
      },
    ],
    hitokoto: {
      customs: [
        /*{ // format; if customs exist, API will be ignored, and customs will be in use
                word: 'https://developer.hitokoto.cn',
                from: '一言开发者中心'
              }*/
      ],
      type: "i" // https://developer.hitokoto.cn/sentence/#请求参数
    },
    gallery: [
      /*{ format; these gallery items will be appended to /gallery/ page
            name: 'test image from baidu',
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596063652971&di=8b659ee5cd46f4006d082b626eb3bd0d&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F180330%2F4-1P330160644.jpg'
          }*/
    ],
    pwa: {
      // https://www.vuepress.cn/plugin/official/plugin-pwa.html
      serviceWorker: true,
      popupComponent: "CustomSWUpdatePopup",
      updatePopup: {
        message: [
          "检测到可用的新内容。", // zh
          "New content is available." // en
        ],
        buttonText: [
          "更新缓存", // zh
          "Refresh" // en
        ]
      }
    }
  },

  head: [
    // Include pwa settings, https://www.vuepress.cn/plugin/official/plugin-pwa.html

    ['link', { rel: 'dns-prefetch', href: '//giscus.app' }],
    ['link', { rel: 'preconnect', href: '//giscus.app', crossorigin: 'anonymous' }],
    ['link', { rel: 'dns-prefetch', href: '//api.github.com' }],
    ['link', { rel: 'preconnect', href: '//api.github.com', crossorigin: 'anonymous' }],

    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon"
      }
    ],
    [
      "link",
      {
        rel: "manifest",
        href: "/manifest.json"
      }
    ],
    [
      "meta",
      {
        name: "theme-color",
        content: "#ffffff"
      }
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-capable",
        content: "yes"
      }
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "#ffffff"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: "/assets/img/apple-touch-icon.png"
      }
    ],

    // Search engine verify
    [
      "meta",
      {
        name: "google-site-verification",
        content: "DR-3xvCA7YBP7TIeg7__j5lxaniGh2pzocrfywyn8o0"
      }
    ],
    [
      "meta",
      {
        name: "baidu-site-verification",
        content: "zQef3H7nga"
      }
    ]
  ],

  // https://www.vuepress.cn/zh/config/#markdown
  markdown: {
    lineNumbers: false,
    extractHeaders: ["h1", "h2", "h3", "h4", "h5", "h6"]
  },

  evergreen: true, // using old browser ?

  // 2. 配置 Webpack 别名（解决 @theme 找不到的问题） --zm
  configureWebpack: (config) => {

  // 添加日志用于调试，确认 configureWebpack 是否被调用，以及 @theme 别名设置是否正确 --zm
  // console.log('>>> configureWebpack 被调用！');
  // console.log('>>> @theme alias 将被设置为:', path.resolve(__dirname, '../../'));

  // 设置别名 @theme 指向主题根目录
  config.resolve.alias['@theme'] = path.resolve(__dirname, '../../');

  // 原有的 CDN publicPath 配置（生产环境用）
  if (process.env.NODE_ENV === 'production') {
    config.output.publicPath = 'https://cdn.jsdelivr.net/gh/zmfk/zmfk.github.io@master/';
  }
}
};
