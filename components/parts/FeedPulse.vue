<template>
  <div class="FeedPulse card">
    <div class="caption">
      <span class="icon">
        <i class="fas fa-flag fa-fw"></i>
      </span>
      <span v-html="caption"></span>
    </div>
    <div class="inner" ref="container"></div>
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
  },
  mounted() {
    const cfg = this.config;
    if (!cfg || !cfg.siteId) return;

    // 从 config.js 的 options 拼接参数
    const opt = cfg.options || {};
    const query = Object.keys(opt)
      .map((key) => `${key}=${encodeURIComponent(opt[key])}`)
      .join("&");

    // 加载 flag-counter 组件
    const script = document.createElement("script");
    script.src = `https://feed-pulse.com/api/embed/flag-counter.js?site_id=${cfg.siteId}&${query}&v=15`;
    script.async = true;
    this.$refs.container.appendChild(script);
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
  // 兜底：禁止组件内部动画，彻底消除闪烁
  >>> *
    animation none !important
    transition none !important
</style>