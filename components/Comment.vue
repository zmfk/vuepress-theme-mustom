<template>
  <div class="Comment card">
    <div class="caption">
      <span class="icon">
        <i class="fas fa-comments fa-fw"></i>
      </span>
      <span v-html="mustom$Locale.comment.caption"></span>
    </div>
    <div class="inner">
      <CommentPlugin :title="$title" :options="options" />
    </div>
    <div class="minimize" @click="mustom$ToggleMinimize"></div>
  </div>
</template>

<script>
import { Comment } from "@vuepress/plugin-blog/lib/client/components";
import decode from "../utils/decode";

export default {
  name: "Comment",
  components: { CommentPlugin: Comment },
  computed: {
    options() {
      const commentConfig = this.$themeConfig.comment || {};
      if (commentConfig.platform) {
        return { ...commentConfig, locale: this.mustom$Lang };
      }
      if (commentConfig.isEncoded) {
        const secret = decode(commentConfig.secret);
        return {
          service: 'vssue',
          owner: commentConfig.owner,
          repo: commentConfig.repo,
          clientId: secret.appid,
          clientSecret: secret.appkey,
          prefix: commentConfig.prefix,
          labels: commentConfig.labels,
          locale: this.mustom$Lang
        };
      }
      return { locale: this.mustom$Lang };
    }
  }
};
</script>

<style lang="stylus" scoped>
.inner
  padding $gap * 0.5
  @media (max-width $smallestWidth)
    padding 0

>>> .vssue
  color var(--txt)
  a
    color var(--underline)
  .vssue-comment-avatar
    border-radius 50%
    overflow hidden
    a
      &:before
        display none
  .vssue-pagination-select
    background-color white
</style>