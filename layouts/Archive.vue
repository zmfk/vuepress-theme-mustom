<template>
  <div class="Archive">
    <Timeline />
    <div class="giscus-container" ref="giscusContainer"></div>
  </div>
</template>

<script>
import Timeline from "@theme/components/Timeline";

export default {
  name: "Archive",
  components: { Timeline },
  data() {
    return {
      giscusIframe: null,
      currentTheme: null,
      giscusReady: false   // 新增：标记 Giscus 是否已成功加载
    };
  },
  computed: {
    effectiveTheme() {
      const skin = this.mustom$Skin;
      const isNight = this.mustom$IsNight;
      return isNight || skin === 'memariani' ? 'dark' : 'light';
    },
    // 新增：根据全局语言计算 Giscus 界面语言
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
    // 新增：监听语言变化，实现无刷新切换 Giscus 界面语言
    currentLang(newLang, oldLang) {
      if (newLang !== oldLang) {
        if (this.giscusReady) {
          this.updateGiscusLang(newLang);
        } else {
          this.loadGiscus();
        }
      }
    }
  },
  methods: {
    // 新增：获取 Giscus iframe 的辅助方法
    getGiscusIframe() {
      const container = this.$refs.giscusContainer;
      if (!container) return null;
      return container.querySelector("iframe.giscus-frame");
    },

    loadGiscus() {
      const container = this.$refs.giscusContainer;
      if (!container) return;
      container.innerHTML = '';
      
      const oldScript = document.querySelector('script[src="https://giscus.app/client.js"]');
      if (oldScript) oldScript.remove();

      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'zmfk/vuepress-theme-mustom');
      script.setAttribute('data-repo-id', 'R_kgDOSIcmvg');
      script.setAttribute('data-category', 'General');
      script.setAttribute('data-category-id', 'DIC_kwDOSIcmvs4C7Vwc');
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');                      // 保留原有
      script.setAttribute('data-reactions-enabled', '0');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');         // 保留原有
      script.setAttribute('data-theme', this.currentTheme);
      script.setAttribute('data-lang', this.currentLang);           // 改为动态语言
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;
      
      script.onload = () => {
        this.$nextTick(() => {
          const iframe = this.getGiscusIframe();
          if (iframe) {
            this.giscusIframe = iframe;
            this.giscusReady = true;                                // 新增：标记已就绪
          }
        });
      };
      
      container.appendChild(script);
      this.giscusReady = false;                                     // 新增：重置标记

      // 本地开发代理（仅开发环境）—— 保留原有功能，不做任何改动
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

    // 新增：无刷新切换 Giscus 语言
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
.Archive
  display grid
  gap $gap
  @media (max-width $smallestWidth)
    gap 0

.giscus-container
  margin-top: 2rem
  position: relative
  z-index: 9999
</style>