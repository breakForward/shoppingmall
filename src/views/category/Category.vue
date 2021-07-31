<template>
  <div class="category">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{ length }})
      </div>
    </nav-bar>
    <!-- 商品列表 -->
    <category-list />
    <!-- 底部汇总 -->
    <category-button-bar />
  </div>
</template>

<script>
import NavBar from "components/common/NavBar/NavBar"
import CategoryList from "./childComps/CategoryList"
import CategoryButtonBar from "./childComps/CategoryButtonBar"

import { mapGetters } from "vuex"

export default {
  name: 'Category',
  components: {
    NavBar,
    CategoryList,
    CategoryButtonBar
  },
  computed: {
    // ...mapGetters(['categoryLength'])
    ...mapGetters({
      length: 'categoryLength'
    })
  }
}
</script>

<style scoped>
  .category {
    padding-top: 49px;
  }
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--color-tint);
    color: #fff;
    overflow: hidden;
  }
</style>