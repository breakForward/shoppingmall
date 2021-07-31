<template>
  <div class="back-top" :style="{display: displays}">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  props: {
    displays: {
      type: String,
      default: 'none'
    }
  }
}
</script>

<style>
  .back-top {
    position: absolute;
    right: 8px;
    bottom: 45px;
    z-index: 9;
  }
  .back-top img {
    width: 43px;
  }
</style>