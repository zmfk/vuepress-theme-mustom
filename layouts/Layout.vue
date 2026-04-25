<template>
  <div class="Layout">
    <!-- author:jinyaoMa -->
    <Article />
    <Gallery v-if="$frontmatter.gallery && $frontmatter.gallery.enabled" />
    <Records v-if="$frontmatter.records && $frontmatter.records.enabled" />
    <Readme
      v-if="isGithubOk && $frontmatter.github.readme && $frontmatter.github.readme.enabled"
      :user="$frontmatter.github.user"
      :repo="$frontmatter.github.repo"
    />
    <Stack
      v-if="isGithubOk && $frontmatter.github.stack && $frontmatter.github.stack.enabled"
      :user="$frontmatter.github.user"
      :repo="$frontmatter.github.repo"
    />
    <Iframe
      v-if="isGithubOk && $frontmatter.github.iframe && $frontmatter.github.iframe.enabled"
      :user="$frontmatter.github.user"
      :repo="$frontmatter.github.repo"
    />
    <div class="giscus-container" ref="giscusContainer"></div>
  </div>
</template>

<script>
import Article from "@theme/components/Article";
import Gallery from "@theme/components/Gallery";
import Records from "@theme/components/Records";
import Readme from "@theme/components/Readme";
import Stack from "@theme/components/Stack";
import Iframe from "@theme/components/Iframe";

export default {
  name: "Layout",
  components: {
    Article,
    Gallery,
    Records,
    Readme,
    Stack,
    Iframe,
  },
  data() {
    return {
      giscusIframe: null,
      currentTheme: null,
      giscusReady: false,
      giscusLoading: false   // 新增：标记是否正在加载评论区
    };
  },
  computed: {
    isGithubOk() {
      return (
        this.$frontmatter.github &&
        this.$frontmatter.github.user &&
        this.$frontmatter.github.repo
      );
    },
    effectiveTheme() {
      const skin = this.mustom$Skin;
      const isNight = this.mustom$IsNight;
      return isNight || skin === 'memariani' ? 'dark' : 'light';
    },
    currentLang() {
      const lang = this.mustom$Lang;
      return lang && lang.startsWith("zh") ? "zh-CN" : "en";
    }
  },
  mounted() {
    this.currentTheme = this.effectiveTheme;
    this.loadGiscus();
  },
  watch: {
    '$route.path'() {
      this.loadGiscus();
    },
    effectiveTheme(newTheme) {
      if (this.currentTheme !== newTheme) {
        this.currentTheme = newTheme;
        this.updateGiscusTheme(newTheme);
      }
    },
    // 改进：处理加载中的语言切换，避免冲突
    currentLang(newLang, oldLang) {
      if (newLang !== oldLang) {
        if (this.giscusLoading) {
          // 正在加载中，放弃当前加载，以新语言重新开始
          this.loadGiscus();
        } else if (this.giscusReady) {
          // 已就绪，快速切换
          this.updateGiscusLang(newLang);
        } else {
          // 尚未开始加载
          this.loadGiscus();
        }
      }
    }
  },
  methods: {
    getGiscusIframe() {
      const container = this.$refs.giscusContainer;
      if (!container) return null;
      return container.querySelector("iframe.giscus-frame");
    },

    loadGiscus() {
      const container = this.$refs.giscusContainer;
      if (!container) return;
      container.innerHTML = '';   // 清空容器，中止任何正在进行的加载
      this.giscusReady = false;
      this.giscusLoading = true;  // 标记加载中

      const oldScript = document.querySelector('script[src="https://giscus.app/client.js"]');
      if (oldScript) oldScript.remove();

      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'zmfk/vuepress-theme-mustom');
      script.setAttribute('data-repo-id', 'R_kgDOSIcmvg');
      script.setAttribute('data-category', 'General');
      script.setAttribute('data-category-id', 'DIC_kwDOSIcmvs4C7Vwc');
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '0');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');
      script.setAttribute('data-theme', this.currentTheme);
      script.setAttribute('data-lang', this.currentLang);
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;
      
      script.onload = () => {
        this.$nextTick(() => {
          const iframe = this.getGiscusIframe();
          if (iframe) {
            this.giscusIframe = iframe;
            this.giscusReady = true;
          }
          this.giscusLoading = false;
        });
      };

      // 新增：处理脚本加载失败
      script.onerror = () => {
        this.giscusLoading = false;
      };
      
      container.appendChild(script);

      // 本地开发代理（仅开发环境）
      if (process.env.NODE_ENV === 'development') {
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
          let newUrl = url;
          if (url.includes('api.github.com')) {
            newUrl = url.replace('https://api.github.com', '/github-api');
          } else if (url.includes('giscus.app/api')) {
            newUrl = url.replace('https://giscus.app/api', '/giscus-api/api');
          }
          return originalFetch.call(this, newUrl, options);
        };
      }
    },

    updateGiscusTheme(theme) {
      const iframe = this.getGiscusIframe();
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          giscus: { setConfig: { theme } }
        }, 'https://giscus.app');
      }
    },

    updateGiscusLang(lang) {
      const iframe = this.getGiscusIframe();
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          giscus: { setConfig: { lang } }
        }, 'https://giscus.app');
      } else {
        // 如果 iframe 丢失，回退到重新加载
        this.giscusReady = false;
        this.loadGiscus();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.Layout
  display grid
  gap $gap
  @media (max-width $smallestWidth)
    gap 0

.giscus-container
  margin-top: 2rem
  position: relative
  z-index: 9999
</style>