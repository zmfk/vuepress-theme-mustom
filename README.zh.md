<h1 align="center">Mustom</h1>

<div align="center">

Simple design theme for VuePress，Blog，醉梦 の 置物处 | SuiMu's THINGSHOUSE (QQ: 2272909403)

</div>

<div align="center">

![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square) 
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/zmfk/vuepress-theme-mustom?style=flat-square) 
![License](https://img.shields.io/github/license/zmfk/vuepress-theme-mustom?style=flat-square)

</div>

![preview](https://raw.githubusercontent.com/zmfk/vuepress-theme-mustom/master/screenshots/preview.jpg)  

例子: [vuepress-theme-mustom-sample](https://github.com/zmfk/vuepress-theme-mustom-sample) 

文档语言:
- [中文](https://github.com/zmfk/vuepress-theme-mustom/blob/master/README.zh.md)
- [English](https://github.com/zmfk/vuepress-theme-mustom/blob/master/README.md)

> **当你看完本文档之后，如果还是感觉不会不清楚，请仔细研究我 [docs](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs) 的目录结构，或者也可以在 Github Issues 里面放出你的问题，我有空就回复。最好是加本人 QQ：2272909403。**

> **要是主题出 Bug 了或者有什么建议想提，可以发到 Github Issues 里，不用在意什么报告的格式啥的。当然最好加本人 QQ：2272909403。**

# 安装

创建以下结构的文件夹，如果想看 `docs` 的详细结构，点这里 [docs](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs)。`_posts` 文件夹请参考 [docs/_posts](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs/_posts)。

```yml
# 在创建的新文件夹里

+ docs # 放网站资源
  - _posts # 放文章资源
  - .vuepress # 放静态资源和配置
    + public # 放静态资源
    + config.js # 配置
+ package.json # 使用命令 `npm init` 生成
```

在新文件夹中运行一下其中一个命令，安装 `vuepress` 和 `vuepress-theme-mustom`。

```bash
yarn add @zmfk/vuepress-theme-mustom -D  #无法使用，没上传  --zm
```

或使用 npm

```bash
npm i @zmfk/vuepress-theme-mustom -D  #无法使用，没上传  --zm
```

或点 [这里](https://github.com/zmfk/vuepress-theme-mustom/archive/master.zip) 手动下载并解压主题文件夹到上一步的新建文件夹。接着对照下方代码设置 `config.js` 中属性 `theme`。

```js
theme: require.resolve('../../vuepress-theme-mustom-master/')
```

安装成功后，使用以下命令运行到 `localhost`。

```bash
vuepress dev docs
```

或者生成到 `docs/.vuepress/dist`

```bash
vuepress build docs
```

# 简单讲解 `_secret.tpl.js`

想看我的 `_secret.tpl.js` 长啥样可以点 [这里](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs/.vuepress/_secret.tpl.js)。

使用一个分离的保密文件的话，`appid` 和 `appkey` 什么的就不用上传到线上，有一些保密作用吧。可以参照以下代码在 `config.js` 引用保密文件。

```js
const secret = require('./_secret');

module.exports = { // https://www.vuepress.cn/zh/config/
  // ...
  themeConfig: {
    // ...
    translate: secret.translate, // 百度翻译设置
    comment: secret.comment, // vssue 设置
    // ...
  }
  // ...
}
```

# 简单讲解 `config.js`

想看我的 `config.js` 长啥样可以点 [这里](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs/.vuepress/config.js)。

> 加油喵

## 普通 VuePress 设置

```js
module.exports = { // https://www.vuepress.cn/zh/config/
  // Entry of used theme
  // theme: require.resolve('../../'), // My value
  // manually download theme, and folder `vuepress-theme-mustom-master` is in the root of the project
  // theme: require.resolve('../../vuepress-theme-mustom-master/'),
  theme: '@zmfk/vuepress-theme-mustom', // Your value         //未发布，无用 --zm
  // Site base
  // base: '/', // My value, due to https://zmfk.github.io/
  base: '/MyBlog/', // Your value, if https://yourUsername.github.io/MyBlog/
  // Default title that appended to your site title
  // title: '醉梦 の 置物处 | SuiMu's THINGSHOUSE', // My value
  title: 'XXX 的博客 | XXX\'s Blog', // Your value
  // Default description that appended to your site description
  description: 'XXX 的博客, XXX\'s Blog, XXX, Mustom, VuePress',

  themeConfig: {
    // ...
    // About this section, go to header "Configuration of themeConfig"
  }

  // It isn't necessary to change 'head' if you want to replace files directly
  // favicon is in folder docs/.vuepress/public/
  // apple-touch-icon is in folder docs/.vuepress/public/assets/img/
  head: [
    // PWA settings, https://www.vuepress.cn/plugin/official/plugin-pwa.html
    ['link', { rel: 'icon', href: '/favicon.ico', type: "image/x-icon" }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' }],
    ['link', { rel: 'apple-touch-icon', href: '/assets/img/apple-touch-icon.png' }]
  ],
  // It isn't necessary to change 'markdown' if you don't mind to use settings below
  // https://www.vuepress.cn/zh/config/#markdown
  markdown: {
    lineNumbers: false,
    extractHeaders: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  },
  // It isn't necessary to change 'evergreen'
  evergreen: true, // using old browser ?
  // To use jsdelivr cdn, you should change the publicPath below
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        output: {
          // My value, username=zmfk, repo=zmfk.github.io, branch=master
          //publicPath: 'https://cdn.jsdelivr.net/gh/zmfk/zmfk.github.io@master/'
          // Your value, if username=XXX, repo=MyBlog, branch=master
          publicPath: 'https://cdn.jsdelivr.net/gh/XXX/MyBlog@master/'
        }
      }
    }
  }
}
```

## 配置 `themeConfig`

> 以下所有属性都是包含在 `config.js` 的 `themeConfig` 里的

> `author`, `year`, `maximizeLaunch`, `noEmpty` 和 `images`; 这些属性挺简单的，你们可以自己试试。设置 `maximizeLaunch` 为 `true` 可以让开始封面的图最大化到全窗口。 `noEmpty` 可以关闭空白占位组件。`images` 可以让你自定义能改的图片的链接，但是必须符合以下代码中的格式。

```js
images: { // for image replacment; no base needed; first layer key points to component name
  ad: '/assets/img/ad.png',
  avatar: '/assets/img/avatar.png',
  background: '/assets/img/background.png',
  brand: '/assets/img/brand.png',
  hitokoto: {
    left: '/assets/img/hitokoto.left.png',
    right: '/assets/img/hitokoto.right.png',
  },
  empty: '/assets/img/empty.png',
  records: '/assets/img/records.png',
},
```

### domain

**这个属性只用于 sitemap 的生成**

- 我的设置值: `'https://zmfk.github.io'`
- 你可以设置成: `'https://yourdomain.com/'`

### year

建站起始年份，用于页脚版权显示。例如：

```js
year: 2026,
```

### feedpulse

![feedpulse](https://raw.githubusercontent.com/zmfk/vuepress-theme-mustom/master/screenshots/feedpulse.jpg)

用于显示访客来源统计（替代已失效的 Clustrmaps）。需要前往 [FeedPulse](https://feed-pulse.com/generator) 生成专属嵌入代码，然后按下方配置。设置 `feedpulse` 为 `null` 或删掉它可以关闭该组件。

```js
feedpulse: {
  siteId: "你的siteid", // 从 FeedPulse 生成器获取
  caption: ["访客来源", "Visitor Sources"], // [zh, en]
  options: {
    w: 240,           // 宽度
    bc: "ffffff",     // 背景色
    tc: "333333",     // 文字色
    brd: "f5f5f5",    // 边框色
    hb: "f5f5f5",     // 头部背景色
    hf: "333333",     // 头部文字色
    font: "Nunito",   // 字体
    rows: 6,          // 行数
    cols: 3,          // 列数
    cod: 0,           // 0 = 显示国家代码
    poll: 5000,       // 轮询间隔（毫秒）
    lang: "zh",       // 组件语言
    bstyle: "minimal" // 徽章风格（minimal = 无动画）
  }
},
```

### customBackgrounds

这个属性可以让你添加背景图片，但只会在默认皮肤里显示。如果添加了多个背景图，就会以幻灯片播放的形式展示。你可以对照以下代码中的格式设置。

```js
customBackgrounds: [
  '/assets/img/background.png',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596065328389&di=ad7a9cc49e45547721005bd528325f0d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F58b4ef69ed377.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596063652971&di=8b659ee5cd46f4006d082b626eb3bd0d&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F180330%2F4-1P330160644.jpg'
],
```

### socialShare

![socialShare](https://raw.githubusercontent.com/zmfk/vuepress-theme-mustom/master/screenshots/socialShare.jpg)

参考 [这里](https://sns.goyfe.com/guide/) 来设置。以下代码会生成上图的结果。

```js
socialShare: { // https://sns.goyfe.com/guide/
  networks: ['qq', 'weibo', 'douban', 'email', 'whatsapp', 'facebook', 'reddit', 'telegram', 'line'],
  email: '2272909403@qq.com',
  fallbackImage: '/assets/img/avatar.png',
  noGlobalSocialShare: true
},
```

### notification

![notification](https://raw.githubusercontent.com/zmfk/vuepress-theme-mustom/master/screenshots/notification.jpg)

> `msg` 中字符串必须按照特定顺序/下标. 0 => `zh`, 1 => `en`

你可以在进站时有多个通知弹出，并且它们会一个接一个的显示，不会同时显示。type 可以为 'default'、'warning' 或 'error'（对应不同颜色）。`msg` 必需按顺序存放中英文的字符串。以下代码会生成上图的结果。

```js
notification: [
  { // welcome msg
    type: 'default', // default or warning or error
    msg: [
      '<strong>欢迎来到我的个人网站！技术交流请加 QQ 群：还没有喵，也可以加本人QQ：2272909403，或者点击页面左下角扫码找我哦~<strong>', // zh
      '<strong>Welcome to my personal website! <strong>' // en
    ]
  },
],
```

### qrcodes

![qrcodes](https://raw.githubusercontent.com/zmfk/vuepress-theme-mustom/master/screenshots/qrcodes.jpg)

> `locale` 中字符串必须按照特定顺序/下标. 0 => `zh`, 1 => `en`

`locale` 必需按顺序存放中英文的字符串。以下代码会生成上图的结果。

```js
qrcodes: [{ // qrcode for contact and friending
  locale: [
    'QQ', // zh
    'QQ' // en
  ],
  path: '/assets/img/qq.png' // no base needed
}, {
  locale: [
    '微信', // zh
    'WeChat' // en
  ],
  path: '/assets/img/wechat.png' // no base needed
}],
```

### header

![header](https://raw.githubusercontent.com/zmfk/vuepress-theme-mustom/master/screenshots/header.jpg)

> `sitename` 中字符串必须按照特定顺序/下标. 0 => `zh`, 1 => `en`

`sitename` 必需按顺序存放中英文的字符串。以下代码会生成上图的结果。

```js
header: {
  sitename: [
    '<em><span>醉梦 の</span></em><strong><span>置物处</span></strong>', // zh
    '<em><span>SuiMu\'s</span></em><strong><span>THINGSHOUSE</span></strong>' //en 
  ]
},
```

### brand

![brand](https://raw.githubusercontent.com/zmfk/vuepress-theme-mustom/master/screenshots/brand.jpg)

> `signatures` 中字符串必须按照特定顺序/下标. 0 => `zh`, 1 => `en`

`signatures` 必需按顺序存放中英文的字符串。以下代码会生成上图的结果。

```js
brand: {
  signatures: [
    '我行即我思 , 我思即我<br>&nbsp;', // zh
    'I act, therefore I think;<br>  I think, therefore I am.<br>&nbsp;' // en
  ],
  contacts: [{
    icon: '<i class="fab fa-github fa-fw"></i>',
    text: 'zmfk',
    link: 'https://github.com/zmfk'
  }, {
    icon: '<i class="fas fa-envelope fa-fw"></i>',
    text: '2272909403@qq.com',
    link: 'mailto:2272909403@qq.com'
  }, {
    icon: '<i class="fab fa-qq fa-fw"></i>',
    text: '2272909403',
    link: 'tencent://Message/?uin=2272909403'
  }]
},
```

### menus

> `caption` 和 `text` 中字符串必须按照特定顺序/下标. 0 => `zh`, 1 => `en`

`caption` 和 `text` 必需按顺序存放中英文的字符串。

你可以删除某些链接。如果你有一个跟我一样的 [docs](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs) 目录结构，那这个属性不必要改。

```yml
# 在创建的新文件夹里

+ docs # 放网站资源
  - _posts # 放文章资源，自动生成“主页”和“归档”页面
  - .vuepress # 放静态资源和配置
  - about # “关于”页面
  - codes # “代码库”页面
  - icons # “图标字体库”页面
  - records # “记录”页面
  # “图库”页面为自动生成
```

以下代码对应以上目录结构。

```js
menus: [{
  caption: [
    '菜单',   // zh
    'MENU'    // en
  ],
  icon: '<i class="fas fa-sitemap fa-fw"></i>',
  items: [
    {
      icon: '<i class="fas fa-home fa-fw"></i>',
      text: ['首页', 'Home'],
      link: '/'
    },
    {
      icon: '<i class="fas fa-archive fa-fw"></i>',
      text: ['归档', 'Archive'],
      link: '/archive/'
    },
    {
      icon: '<i class="fas fa-box fa-fw"></i>',
      text: ['代码库', 'Code Library'],
      link: '/codes/'
    },
    {
      icon: '<i class="fas fa-icons fa-fw"></i>',
      text: ['图标字体库', 'Icon Font Library'],
      link: '/icons/'
    },
    {
      icon: '<i class="fas fa-edit fa-fw"></i>',
      text: ['记录', 'Records'],
      link: '/records/'
    },
    {
      icon: '<i class="fas fa-images fa-fw"></i>',
      text: ['图库', 'Gallery'],
      link: '/gallery/'
    },
    {
      icon: '<i class="fas fa-user fa-fw"></i>',
      text: ['关于', 'About'],
      link: '/about/'
    }
  ]
}],
```

### meting

![meting](https://raw.githubusercontent.com/zmfk/vuepress-theme-mustom/master/screenshots/meting.jpg)

以下代码会生成上图的结果。

```js
meting: {
  //已经移除
},
```

### portals

![portals](https://raw.githubusercontent.com/zmfk/vuepress-theme-mustom/master/screenshots/portals.jpg)

以下代码会生成上图的结果。

```js
// external links; use for the component that displays after clicking on the left-top button of header
portals: [{
  name: "My Site",
        desc: "醉梦 の 个人网站 | SuiMu の Personal Website",
        icon: "/assets/img/avatar.png",
        link: "/"
}, {
}],
```

### hitokoto

You can put your words to `customs` for displaying, and these words are randomly picked on home page loaded. `type` is for hitokoto service setting referred to [developer.hitokoto.cn](https://developer.hitokoto.cn/sentence/#请求参数)

你可以设置自己的话或句子。设置好后，每次进首页都会随机显示 `customs` 中的一句话。 设置 `type` 可以参考 [请求参数](https://developer.hitokoto.cn/sentence/#请求参数)。

```js
hitokoto: {
  customs: [/*{ // format; if customs exist, API will be ignored, and customs will be in use
    word: 'https://developer.hitokoto.cn',
    from: '一言开发者中心'
  }*/],
  type: 'i' // https://developer.hitokoto.cn/sentence/#请求参数
},
```

### gallery

你可以添加线上的图片到图库页面。添加的图片会置顶显示，接着才是自动检测的本地图片。本地图片都是凡在 `/docs/.vuepress/public/gallery` 中，点 [这里](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs/.vuepress/public/gallery) 看我是怎么样子放的。

```js
gallery: [/*{ format; these gallery items will be appended to /gallery/ page
  name: 'test image from baidu',
  url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596063652971&di=8b659ee5cd46f4006d082b626eb3bd0d&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F180330%2F4-1P330160644.jpg'
}*/],
```

### pwa

> `message` 和 `buttonText` 中字符串必须按照特定顺序/下标. 0 => `zh`, 1 => `en`

`message` 和 `buttonText` 必需按顺序存放中英文的字符串。

`popupComponent` 是已经设置好的包含在主题资源中的自定义组件。如果你不想要这个更新弹窗，可以设置 `updatePopup` 为 `false`。如果你 SW 相关功能都不想要，可以把 `serviceWorker` 和 `updatePopup` 都设成 `false`。

```js
pwa: { // https://www.vuepress.cn/plugin/official/plugin-pwa.html
  serviceWorker: true,
  popupComponent: 'CustomSWUpdatePopup',
  updatePopup: {
    message: [
      '检测到可用的新内容。', // zh
      'New content is available.' // en
    ],
    buttonText: [
      '更新缓存', // zh
      'Refresh' // en
    ]
  }
}
```

## 文章 Front-Matter

> `categories` 和 `tags` 必须只有一层，即一维数组。本主题**不支持**分类标签使用多维数组。

每篇文章都需要有跟以下结构相似的 front-matter。

```yml
---
title: 'Post Title'
categories: # flat, ONLY ONE layer acceptable
  - cate1
  - cate2
tags: # flat, ONLY ONE layer acceptable
  - tag1
  - tag2
date: 2020-12-12 00:00:00
updated: 2020-12-12 00:00:00
---
```

## 普通页面 Front-Matter

从我的“关于”页面找的例子，或者查看原 `index.md` 文件可以点 [这里](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs/about/index.md)。

```yml
---
title: 关于 | About
---
```

### 想要做和我的“记录”页面相似的页面？

根据以下格式写代码，或者查看我的“记录”页面原 `index.md` 文件可以点 [这里](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs/records/index.md)。

```yml
---
title: # page title
records:
  enabled: true # set this to true to enable Records component
  items:
    - cover: # [empty] to use default cover
      date: # string
      title:
      # e.g. [empty]
      # e.g. book / article / paper / newspaper / report / picture / anime / video / movie / audio / project / website
      # e.g. [customized] --> "Journal"
      type:
      author:
      source:
      # format 'number/total' OR '100%' OR [customized]; [empty] to use 'N/A', NO DECIMAL POINT ALLOW
      # e.g. 12 / 34 ; 32/52 ; 22% ; 88% ; "Latest" ; "Complete"
      progress:
      summary:
---
```

### 想要做和我的“代码库”页面相似的页面？

> 代码库在 Github 仓库中的结构可以参考 [zmfk/code-lib](https://github.com/zmfk/code-lib)   

根据以下格式写代码，或者查看我的“代码库”页面原 `index.md` 文件可以点 [这里](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs/codes/index.md)。

```yml
---
title: # page title
github:
  user: # Github username
  repo: # Github repo
  readme:
    enabled: true # set this to true to enable Readme component
  stack:
    enabled: true # set this to true to enable Stack component
---
```

### 想要做和我的“图标字体库”页面相似的页面？

> 图标字体库在 Github 仓库中的结构可以参考 [zmfk/icon-lib](https://github.com/zmfk/icon-lib)

根据以下格式写代码，或者查看我的“图标字体库”页面原 `index.md` 文件可以点 [这里](https://github.com/zmfk/vuepress-theme-mustom/blob/master/docs/icons/index.md)。

```yml
---
title: # page title
github:
  user: # Github username
  repo: # Github repo
  readme:
    enabled: true # set this to true to enable Readme component
  iframe:
    enabled: true # set this to true to enable Iframe component
    url: https://zmfk.github.io/icon-lib/ # subpage should be in same-origin
```

## 主题更新日志

### Update 2026-09-18
1. 替换 PWA 图标（android-chrome-192x192.png、android-chrome-512x512.png）
2. 替换 apple-touch-icon.png，适配 iOS 主屏幕
3. 替换 background.png，更新默认皮肤背景
4. 替换 avatar.png 与 brand.png，更新个人标识
5. 更新 README 预览截图（portals.jpg、preview.jpg）

### Update 2026-09-17
1. 用 FeedPulse 替换已失效的 Clustrmaps 访客统计组件
2. 新增 components/parts/FeedPulse.vue，支持从 config.js 读取参数
3. 修改 Aside.vue，移除 Clustrmaps 并引入 FeedPulse
4. 更新 docs/.vuepress/config.js，新增 feedpulse 配置项，移除 clustrmaps
5. 更新语言文件，用 feedpulse 替换 clustrmaps
6. 为 FeedPulse 添加 CSS 兜底，禁止内部动画，彻底消除闪烁

### Update 2026-05-13
1. 更改 Giscus 从源码库至部署库
2. Iframe.vue 与 Audioplayer.vue 加入 sandbox 属性 allow-scripts allow-same-origin allow-popups

### Update 2026-05-08
1. 修复代码库页面与图标页面展开悬浮、展开收起同步的问题
2. 更新网页进度条

### Update 2026-05-07
1. 更新 config.js 中 ad 路径、codes 与 icons 页面配置
2. 更新 codes 和 icons 页面，去掉注释
3. 更新 README

### Update 2026-05-06
1. 新增 Happyday.vue 彩蛋组件
2. 加入彩蛋部分
3. 更改 README 中的图片

### Update 2026-04-25
1. 新增 Giscus 评论系统，支持中英切换时跟随切换语言
2. 优化中英切换健壮性，避免快速点击导致状态不一致
3. 将 Live2D 模型修改为 z16，添加 z16 模型文件
4. 新增 live2d 和 LOCK-JSON 相关配置
5. 修改 index.js 和 config.js，防止本地修改 config 时接收到 undefined 崩溃

### Update 2026-04-23
1. 更新密钥模板和工作流配置
2. 更新地图插件
3. 更新 README，修正关于页、记录页说明
4. 修改关于页 "I am so cute =w=" 错位问题
5. 修改 LICENSE
6. 更新 README.zh.md，修正部分 config 内容

### Update 2026-04-22
1. 添加 GitHub Actions 自动部署工作流
2. 移除 build 脚本中的 NODE_OPTIONS，适配 Actions 环境
3. 修复生产环境样式丢失：移除 CDN publicPath
4. 完整博客源码，准备部署

### Update 2026-04-17
1. Fork 自 jinyaoMa/vuepress-theme-mustom
2. 替换 avatar.png、brand.png，更新个人标识