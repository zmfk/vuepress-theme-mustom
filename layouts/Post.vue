<template>
  <div class="Post">
    <Happyday />
    <Article />
    <div class="giscus-container" ref="giscusContainer"></div>
  </div>
</template>

<script>
import Article from "@theme/components/Article";
import Happyday from "@theme/components/Happyday";

export default {
  name: "Post",
  components: { Article, Happyday },
  data() {
    return {
      giscusIframe: null,
      currentTheme: null,
      giscusReady: false,
      giscusLoading: false   // 新增：标记评论区是否正在加载
    };
  },
  computed: {
    effectiveTheme() {
      const skin = this.mustom$Skin;
      const isNight = this.mustom$IsNight;
      return isNight || skin === "memariani" ? "dark" : "light";
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
    "$route.path"() {
      this.loadGiscus();
    },
    effectiveTheme(newTheme) {
      if (this.currentTheme !== newTheme) {
        this.currentTheme = newTheme;
        this.updateGiscusTheme(newTheme);
      }
    },
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
      container.innerHTML = "";   // 清空容器，中止任何正在进行的加载

      const oldScript = document.querySelector('script[src="https://giscus.app/client.js"]');
      if (oldScript) oldScript.remove();

      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      script.setAttribute("data-repo", "zmfk/vuepress-theme-mustom");
      script.setAttribute("data-repo-id", "R_kgDOSIcmvg");
      script.setAttribute("data-category", "General");
      script.setAttribute("data-category-id", "DIC_kwDOSIcmvs4C7Vwc");
      script.setAttribute("data-mapping", "pathname");
      script.setAttribute("data-strict", "0");                  // 保留原有
      script.setAttribute("data-reactions-enabled", "0");
      script.setAttribute("data-emit-metadata", "0");
      script.setAttribute("data-input-position", "bottom");     // 保留原有
      script.setAttribute("data-theme", this.currentTheme);
      script.setAttribute("data-lang", this.currentLang);
      script.setAttribute("crossorigin", "anonymous");
      script.async = true;

      this.giscusReady = false;   // 重置就绪状态
      this.giscusLoading = true;  // 标记加载中

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

      script.onerror = () => {
        this.giscusLoading = false;
      };

      container.appendChild(script);

      // 本地开发代理（仅开发环境）—— 保留原有功能
      if (process.env.NODE_ENV === "development") {
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
          let newUrl = url;
          if (url.includes("api.github.com")) {
            newUrl = url.replace("https://api.github.com", "/github-api");
          } else if (url.includes("giscus.app/api")) {
            newUrl = url.replace("https://giscus.app/api", "/giscus-api/api");
          }
          return originalFetch.call(this, newUrl, options);
        };
      }
    },

    updateGiscusTheme(theme) {
      const iframe = this.getGiscusIframe();
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme } } },
          "https://giscus.app"
        );
      }
    },

    updateGiscusLang(lang) {
      const iframe = this.getGiscusIframe();
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { lang } } },
          "https://giscus.app"
        );
      } else {
        // 意外情况：iframe 丢失，回退到重新加载
        this.giscusReady = false;
        this.loadGiscus();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.Post
  display grid
  gap $gap
  @media (max-width $smallestWidth)
    gap 0

.giscus-container
  margin-top: 2rem
  position: relative
  z-index: 9999
</style>