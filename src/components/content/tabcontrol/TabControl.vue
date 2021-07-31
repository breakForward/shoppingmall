<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" class="tab-control-item" @click="tabClick(index)">
      <span :class="{active: counter == index}">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
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
  methods: {
    tabClick(index) {
      this.counter = index     
      this.$emit('btnClick', index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    padding: 0 5px 5px;
    color: var(--color-high-text);
    border-bottom: 2px solid red;
  }
</style>