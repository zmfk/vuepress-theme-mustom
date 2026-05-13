<template>
  <div class="Audioplayer card">
    <div class="caption">
      <span class="icon">
        <i class="fas fa-music fa-fw"></i>
      </span>
      <span v-html="mustom$Locale.audioplayer.caption"></span>
    </div>
    <div
      class="inner"
      v-html="metingJs"
      :style="$themeConfig.meting.height ? { height: `calc(${$themeConfig.meting.height} + ${coverSize})` } : {}"
    ></div>
    <div class="minimize" @click="mustom$ToggleMinimize"></div>
  </div>
</template>

<script>

export default {
  name: "Audioplayer",
  data() {
    return {
      // coverSize: "90px", // APlayer cover size for .inner height config use
    };
  },
  mounted() {
  },
  computed: {
    metingJs() {
      return (
        `<iframe sandbox="allow-scripts allow-same-origin allow-popups" frameborder="no" border="0" marginwidth="0" marginheight="0" width=280 height=480
src="//music.163.com/outchain/player?type=0&id=7995413484&auto=0&height=480"
style="position: relative; left: -10px; top: -10px;">
</iframe>`
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.inner
  background var(--highlight)


</style>

<style lang="stylus">
.aplayer
  margin 0
  box-shadow none
  background none
  max-width 100vw
  background var(--bg)
  &.aplayer-withlrc
    .aplayer-pic
      height 90px - $borderRadius * 2 // orig 90px, total 90px
      width 90px - $borderRadius * 2 // orig 90px, total 90px
      margin $borderRadius
      border-radius $borderRadius
  &.aplayer-withlist
    .aplayer-lrc
      &:before, &:after
        content none
    .aplayer-icon-menu, .aplayer-volume-wrap
      display none !important
    .aplayer-time.aplayer-time-narrow
      padding-right 4px
    .aplayer-list ol
      &::-webkit-scrollbar
        webkitScrollbar()
      &::-webkit-scrollbar-thumb
        webkitScrollbarThumb()
      li
        &:hover, &.aplayer-list-light
          background var(--highlight)
</style>