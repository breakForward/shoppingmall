<template>
  <div class="detail">
    <detail-nav-bar :titles="['商品', '参数', '评论', '推荐']" ref="NavBar" />
    <detail-swiper :topImages="topImages" />
    <detail-base-info :goods="goodsItfo" />
    <detail-shop-info :shop="shopInfo" />
    <detail-image-info :detail-info="detailInfo" ref="ImageInfo" />
    <detail-params-info :param-info="itemParams" ref="ParamsInfo" />
    <detail-comment-info :comment-info="commentInfo" ref="CommentInfo" />
    <goods-list :goods="recommend" ref="GoodsList" />
    <detail-bottom-bar @addToCart="addToCart" />
    <toast :message="message" :showHidden="showHidden" />
  </div>
</template>

<script>
import DetailNavBar from "./chlidComps/DetailNavBar"
import DetailSwiper from "./chlidComps/DetailSwiper"
import DetailBaseInfo from "./chlidComps/DetailBaseInfo"
import DetailShopInfo from "./chlidComps/DetailShopInfo"
import DetailImageInfo from "./chlidComps/DetailImageInfo"
import DetailParamsInfo from "./chlidComps/DetailParamsInfo"
import DetailCommentInfo from "./chlidComps/DetailCommentInfo"
import DetailBottomBar from "./chlidComps/DetailBottomBar"
import GoodsList from "components/common/goods/GoodsList"
import Toast from "components/common/toast/Toast"

import {getDetail, Goods, getRecommend} from "network/detail"

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goodsItfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommend: [],
      scrollTop: [],
      showHidden: false,
      message: ''
    }
  },
  components: {
   DetailNavBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   DetailImageInfo,
   DetailParamsInfo,
   DetailCommentInfo,
   GoodsList,
   DetailBottomBar,
   Toast
  },
  created() {
    // 1. 获取id
    this.iid = this.$route.params.id
    // 2. 获取详情页数据
    getDetail(this.iid).then(res => {
      // 获取轮播图数据
      this.topImages = res.result.itemInfo.topImages
      // 获取商品数据
      this.goodsItfo = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      // 获取商家信息
      this.shopInfo = res.result.shopInfo
      // 获取商品图片
      this.detailInfo = res.result.detailInfo
      // 获取商品参数
      this.itemParams = res.result.itemParams
      // 获取评论信息
      if(res.result.rate.cRate !== 0) {
        this.commentInfo = res.result.rate.list[0]
      }

    })
    // 3. 获取推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
  },
  mounted() {
    
    setTimeout(() => {
      this.scrollTop.push(this.$refs.ImageInfo.$el.offsetTop)
      this.scrollTop.push(this.$refs.ParamsInfo.$el.offsetTop)
      this.scrollTop.push(this.$refs.CommentInfo.$el.offsetTop)
      this.scrollTop.push(this.$refs.GoodsList.$el.offsetTop)
    }, 1000)

    let body = document.querySelector("body")
    let scrollY  = 0
    body.onscroll = () => {
      scrollY = document.documentElement.scrollTop || document.body.scrollTop
      if(scrollY > this.scrollTop[3]) {
        this.$refs.NavBar.counter = 3
      } else if(scrollY > this.scrollTop[2] - 50) {
        this.$refs.NavBar.counter = 2
      } else if(scrollY > this.scrollTop[1] - 50) {
        this.$refs.NavBar.counter = 1
      } else if(scrollY >= this.scrollTop[0]) {
        this.$refs.NavBar.counter = 0
      }
    }
  },
  methods: {
    // 获取购物车需要展示的信息
    addToCart() {
      const product = {}

      product.image = this.topImages[0]
      product.title = this.goodsItfo.title
      product.desc = this.goodsItfo.desc
      product.price = this.goodsItfo.realPrice
      product.newPrice = this.goodsItfo.newPrice
      product.iid = this.iid

      this.$store.dispatch("addCart", product).then(res => {
        this.showHidden = true
        this.message = res
        setTimeout(() => {
          this.showHidden = false
          this.message = ''
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
  .detail {
    padding-top: 44px;
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
</style>
