<template>
  <div id="tab-bar">
   <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
  };
</script>

<style scoped>
  #tab-bar {
    position: fixed;
    display: flex;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #f6f6f6;
    box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
  }
</style>