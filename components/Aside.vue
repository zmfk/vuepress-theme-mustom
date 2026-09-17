<template>
  <div class="Aside">
    <Panel />
    <Audioplayer />
    <FeedPulse />
    <transition name="fade">
      <Toc v-if="$page.id === 'post' && !mustom$IsMobile" />
    </transition>
  </div>
</template>

<script>
import Panel from "./parts/Panel";
import Audioplayer from "./parts/Audioplayer";
import Toc from "./parts/Toc";
import FeedPulse from "./parts/FeedPulse";

export default {
  name: "Aside",
  components: {
    Panel,
    Audioplayer,
    Toc,
    FeedPulse,
  },
  methods: {
    height() {
      return this.$el.scrollHeight;
    },
    scrollTo(y) {
      this.$el.scrollTo(0, y);
    },
  },
};
</script>

<style lang="stylus" scoped>
.Aside
  zIndex(60)
  position fixed
  top $headerHeight
  height s('calc(100vh - %s)', $headerHeight)
  width $sideWidth
  overflow hidden

@media (max-width $smallWidth)
  .Aside
    position relative
    top auto
    height auto
    width 100%
</style>