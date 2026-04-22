<template>
  <div class="Toc card">
    <div class="caption">
      <span class="icon">
        <i class="fas fa-bookmark fa-fw"></i>
      </span>
      <span v-html="mustom$Locale.toc.caption"></span>
    </div>
    <div class="inner" @click="handleTocClick">
      <TOC :include-level="[1, 3]" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Toc",
  methods: {
    handleTocClick(e) {
      // 找到被点击的 <a> 标签
      const link = e.target.closest('a');
      if (!link) return;

      // 获取 href 属性中的 hash 部分（例如 "#顺序存储结构的地址计算方法"）
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const hash = href.slice(1); // 去掉开头的 #
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        e.preventDefault(); // 阻止默认的锚点跳转（避免与自定义滚动冲突）
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // 同步更新地址栏 hash，但不触发路由导航
        history.pushState(null, null, '#' + hash);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.Toc
  user-select none
  @media (max-width $smallestWidth)
    display none

.inner
  padding 0.5rem 1rem
  max-height s('calc(100vh - %s - 2.3rem)', $headerHeight + $gap * 2)
  overflow-x hidden
  overflow-y auto
  @media (max-width $smallerWidth)
    max-height none
    overflow-y hidden

>>> ul
  list-style none

>>> a
  display block
  padding 0 1rem
  margin 0 -1rem
  line-height 2
  color var(--txt)
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  transition background 0.6s, color 0.3s
  &:before
    display none
  &:hover
    color var(--underline)
  &.router-link-exact-active
    color var(--article-language-txt)
    background var(--underline)
</style>