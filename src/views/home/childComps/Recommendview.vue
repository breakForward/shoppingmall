<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" class="recommend-item" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommendview',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
.recommend {
  display: flex;
  padding-bottom: 5px;
  text-align: center;
  font-size: 12px;
  background-color: #fff;
  border-bottom: 5px solid #f1f1f1;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 65px;
  margin-bottom: 5px;
}
</style>