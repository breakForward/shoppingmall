<template>
  <div class="button-bar">
    <div class="check-content">
      <check-button class="check-button" :value="isSelextAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">
      {{ '合计:￥' + totalPrice }}
    </div>
    <div class="calculate">
      {{ '去结账(' + checkLength() + ')' }}
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"

export default {
  name: 'CategoryButtonBar',
  data() {
    return {
      arr: []
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },
    checkClick() {
      let bool = this.isSelextAll
      this.$store.state.cartList.forEach(item => {
        item.checked = !bool
      })
    }
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    isSelextAll() {
      if(!this.$store.state.cartList.length) {
        return false
      }
      for(let item of this.$store.state.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style scoped>
  .button-bar {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    width: 100%;
    height: 40px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    margin: 0 10px;
    width: 60px;
    height: 100%;
    align-items: center;
  }
  .check-button {
    width: 20px;
    height: 20px;
  }
  .price {
    flex: 1;
  }
  .price, .calculate {
    height: 100%;
    line-height: 40px;
    text-align: center;
  }
  .calculate {
    width: 90px;
    background-color: red;
  }
</style>