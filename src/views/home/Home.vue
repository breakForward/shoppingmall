<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" v-show="tabBool" :class="{'tab-hide': tabBool}" @btnClick="btnClick"  ref="tabContent1" />
    <scroll class="content" :probe-type="3" :pull-up-load="true" @pullingUp="loadMore" ref="scroll" @tabControl="tabControls">
      <home-swiper :banners="banners" />
      <recommendview :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @btnClick="btnClick" ref="tabContent2"/>
      <goods-list :goods="showGoods" />
    </scroll>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import Recommendview from "./childComps/Recommendview"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/NavBar/NavBar"
  import TabControl from "components/content/tabcontrol/TabControl"
  import GoodsList from "components/common/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"

  import {getHomeMultidata, getHomeGoods} from "network/home"

  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: ['pop', 'new', 'sell'],
        indexGoods: 0,
        tabBool: false,
        saveY: 0
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      Recommendview,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll
    },
    created() {
      // 1.请求数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType[this.indexGoods]].list
      }
    },
    // 路由处于活跃
    activated() {
      this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0, this.saveY, 50)
    },
    // 离开路由
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    methods: {
      // 事件相关方法
      btnClick(index) {
        this.indexGoods = index
        this.$refs.tabContent1.counter = index
        this.$refs.tabContent2.counter = index
      },
      // 数据请求的相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      // 加载更过数据
      getHomeGoods(type) {
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page++

          this.$refs.scroll.finisPullUp()
        })
      },
      loadMore() {
        this.getHomeGoods(this.currentType[this.indexGoods])
      },
      tabControls(position) {
        this.tabBool = (-position.y) >= this.$refs.tabContent2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }
  .home-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
  .tab-hide {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .content {
    height: calc(100% - 49px);
    overflow: hidden;
  }
</style>