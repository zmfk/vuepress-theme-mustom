<template>
  <div class="Post">
    <Article />
    <div class="giscus-container" ref="giscusContainer"></div>
  </div>
</template>

<script>
import Article from "@theme/components/Article";

export default {
  name: "Post",
  components: { Article },
  data() {
    return {
      giscusIframe: null,
      currentTheme: null,
      giscusReady: false,
      giscusLoading: false   // 标记评论区是否正在加载
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
    this.$nextTick(() => {
      this.loadGiscus();
    });
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
          this.loadGiscus();
        } else if (this.giscusReady) {
          this.updateGiscusLang(newLang);
        } else {
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
      container.innerHTML = "";

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

      this.giscusReady = false;
      this.giscusLoading = true;

      script.onload = () => {
        try {
          this.$nextTick(() => {
            const iframe = this.getGiscusIframe();
            if (iframe) {
              this.giscusIframe = iframe;
              this.giscusReady = true;
            }
          });
        } catch (e) {
          console.warn("Giscus onload error:", e);
        } finally {
          this.giscusLoading = false;
        }
      };

      script.onerror = () => {
        console.warn("Giscus script failed to load");
        this.giscusLoading = false;
      };

      try {
        container.appendChild(script);
      } catch (e) {
        console.error("Failed to append Giscus script:", e);
        this.giscusLoading = false;
      }

      // 本地开发代理（仅开发环境）
      if (process.env.NODE_ENV === "development") {
        try {
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
        } catch (e) {
          console.warn("Failed to patch fetch for dev:", e);
        }
      }
    },

    updateGiscusTheme(theme) {
      try {
        const iframe = this.getGiscusIframe();
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme } } },
            "https://giscus.app"
          );
        }
      } catch (e) {
        console.warn("Giscus theme update failed:", e);
      }
    },

    updateGiscusLang(lang) {
      try {
        const iframe = this.getGiscusIframe();
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            { giscus: { setConfig: { lang } } },
            "https://giscus.app"
          );
        } else {
          this.giscusReady = false;
          this.loadGiscus();
        }
      } catch (e) {
        console.warn("Giscus lang update failed:", e);
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