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
  components: {
    Hitokoto,
    Recent,
  },
  data() {
    return {
      giscusIframe: null,
      currentTheme: null // 将在 mounted 中初始化
    };
  },
  computed: {
    // 核心：根据当前皮肤和夜间模式计算 Giscus 主题
    effectiveTheme() {
      const skin = this.mustom$Skin;
      const isNight = this.mustom$IsNight;
      // 夜间模式或暗彩皮肤使用 dark，否则 light
      if (isNight || skin === 'memariani') {
        return 'dark';
      }
      return 'light';
    }
  },
  mounted() {
    // 初始化当前主题
    this.currentTheme = this.effectiveTheme;
    this.loadGiscus();
  },
  watch: {
    '$route.path'() {
      this.loadGiscus();
    },
    // 监听 effectiveTheme 的变化，一旦变化就更新 Giscus
    effectiveTheme(newTheme) {
      if (this.currentTheme !== newTheme) {
        this.currentTheme = newTheme;
        this.updateGiscusTheme(newTheme);
      }
    }
  },
  methods: {
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
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '0');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');
      script.setAttribute('data-theme', this.currentTheme);
      script.setAttribute('data-lang', 'zh-CN');
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;
      
      script.onload = () => {
        this.$nextTick(() => {
          const iframe = container.querySelector('iframe.giscus-frame');
          if (iframe) this.giscusIframe = iframe;
        });
      };
      
      container.appendChild(script);
    },
    updateGiscusTheme(theme) {
      if (this.giscusIframe && this.giscusIframe.contentWindow) {
        this.giscusIframe.contentWindow.postMessage({
          giscus: { setConfig: { theme } }
        }, 'https://giscus.app');
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