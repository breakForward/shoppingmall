<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title"> 
        <a :href="'#miaodian' + index" v-for="(item, index) in titles" :key="index" :class="{'reds': index == counter}" @click="titleClick(index)">
          {{ item }}
        </a>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar/NavBar"

export default {
  name: 'DetailNavBar',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      counter: 0
    }
  },
  components: {
     NavBar
  },
  methods: {
    titleClick(index) {
      this.counter = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .detail-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
  }
  .title {
    display: flex;
    font-size: 14px;
    text-align: center;
  }
  .title a {
    flex: 1;
  }
  .back {
    padding-top: 5px;
  }
  .reds {
    color: var(--color-tint);
  }
</style>