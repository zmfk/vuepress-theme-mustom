<template>
  <div class="FeedPulse card" v-if="config">
    <div class="caption">
      <span class="icon">
        <i class="fas fa-flag fa-fw"></i>
      </span>
      <span v-html="caption"></span>
    </div>

    <!-- 中文容器 -->
    <div
      class="inner"
      ref="containerZh"
      v-show="langKey === 'zh'"
    ></div>

    <!-- 英文容器 -->
    <div
      class="inner"
      ref="containerEn"
      v-show="langKey === 'en'"
    ></div>

    <div class="minimize" @click="mustom$ToggleMinimize"></div>
  </div>
</template>

<script>
export default {
  name: "FeedPulse",
  computed: {
    config() {
      return this.$themeConfig.feedpulse || null;
    },
    caption() {
      const cfg = this.config;
      if (cfg && cfg.caption) {
        return cfg.caption[this.mustom$LangIndex] || cfg.caption[0];
      }
      return "访客来源";
    },
    langKey() {
      return this.mustom$LangIndex === 0 ? "zh" : "en";
    },
  },
  mounted() {
    // 挂载时同时注入两种语言的脚本，各自加载一次
    this.$nextTick(() => {
      this.injectScript("zh", this.$refs.containerZh);
      this.injectScript("en", this.$refs.containerEn);
    });
  },
  methods: {
    injectScript(lang, container) {
      const cfg = this.config;
      if (!cfg || !cfg.siteId || !container) return;

      const opt = {
        w: 240,
        rows: 6,
        cols: 3,
        poll: 60000,
        bstyle: "minimal",
        bc: "ffffff",
        tc: "333333",
        brd: "f5f5f5",
        hb: "f5f5f5",
        hf: "333333",
        ...(cfg.options || {}),
        lang: lang,
      };

      const query = Object.keys(opt)
        .map((key) => `${key}=${encodeURIComponent(opt[key])}`)
        .join("&");

      const script = document.createElement("script");
      script.src = `https://feed-pulse.com/api/embed/flag-counter.js?site_id=${cfg.siteId}&${query}&v=15`;
      script.async = true;
      container.appendChild(script);
    },
  },
};
</script>

<style lang="stylus" scoped>
.inner
  padding 0.5rem
  text-align center
  min-height 120px
  >>> a:before
    display none
  >>> *
    animation none !important
    transition none !important
</style>