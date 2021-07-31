<template>
  <div class="category-list">
    <category-list-item v-for="(item, index) in list" :item-info="item" :key="index" />
  </div>
</template>

<script>
import CategoryListItem from "./CategoryListItem"
import { mapGetters } from 'vuex'

export default {
  name: 'CategoryList',
  computed:{
    ...mapGetters({
      list: 'categoryList'
    })
  },
  components: {
    CategoryListItem
  }
}
</script>

<style scoped>
  .category-list {
    width: 100%;
    height: calc(100vh - 44px - 49px);
    word-wrap:break-word;
    overflow-y: auto;
  }
</style>