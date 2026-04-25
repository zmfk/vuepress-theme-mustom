<template>
  <div class="Home">
    <Hitokoto />
    <Recent />
    <div class="giscus-container" ref="giscusContainer"></div>
  </div>
</template>

<script>
import Hitokoto from "@theme/components/Hitokoto";
import Recent from "@theme/components/Recent";

export default {
  name: "Home",
  components: { Hitokoto, Recent },
  data() {
    return {
      giscusIframe: null,
      currentTheme: null,
      giscusReady: false
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
        if (this.giscusReady) {
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
      script.setAttribute("data-reactions-enabled", "0");
      script.setAttribute("data-emit-metadata", "0");
      script.setAttribute("data-input-position", "bottom");
      script.setAttribute("data-theme", this.currentTheme);
      script.setAttribute("data-lang", this.currentLang);
      script.setAttribute("crossorigin", "anonymous");
      script.async = true;

      script.onload = () => {
        this.$nextTick(() => {
          if (this.getGiscusIframe()) {
            this.giscusReady = true;
          }
        });
      };

      container.appendChild(script);
      this.giscusReady = false;
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
        // 如果 iframe 丢失，回退到重新加载
        this.giscusReady = false;
        this.loadGiscus();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.Home
  display grid
  gap $gap
  @media (max-width $smallestWidth)
    gap 0

.giscus-container
  margin-top: 2rem
  position: relative
  z-index: 9999
</style>