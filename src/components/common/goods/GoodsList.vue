<template>
  <div class="goods" id="miaodian3">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goodsItem="item" class="goods-list-item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .goods-list-item {
    padding: 5px;
    width: 50%;
  }
</style>