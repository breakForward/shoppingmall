<template>
  <div class="warpper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
    <back-top @click.native="backClick" class="back-top" :displays="displays"></back-top>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import BackTop from "components/common/backTop/BackTop"

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
      displays: 'none'
    }
  },
  mounted() {
    // 滚动事件
    this.scroll = new BScroll(this.$refs.warpper, {
      probeType: this.probeType,
      click: true,
      mouseWheel: true,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
      observeImage: true
    })

    this.scroll.on('scroll', (position) => {
      this.$emit("tabControl", position)

      if(position.y < -1000) {
        this.displays = 'block'
      } else {
        this.displays = 'none'
      }
    })

    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp', '上拉加载了')
    })
  },
  methods: {
    backClick() {
      // 回到具体位置
    this.scroll.scrollTo(0, 0, 500)
    },
    // 刷新可以再次触发上拉事件
    finisPullUp() {
      this.scroll.finishPullUp()
    }
  },
  components: {
    BackTop
  }
}
</script>

<style>

</style>