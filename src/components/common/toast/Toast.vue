<template>
  <div class="toast" v-show="showHidden">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: ''
    },
    showHidden: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 10px 15px;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    color: #fff;
    background-color: rgb(0, 0, 0, .8);
  }
</style>