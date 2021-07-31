import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCenter(state, oldProduct) {
      oldProduct.count += 1
    },
    addCounet(state, payload) {
      payload.count = 1
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart({state, commit}, payload) {
      return new Promise((resolve) => {
          // 判断是否是同一商品
        let oldProduct = state.cartList.find(item => item.iid === payload.iid)
        if(oldProduct) {
          // 同一商品数量加一
          commit("addCenter", oldProduct)
          resolve('商品数量+1')
        } else {
          // 购物车商品加一
          commit("addCounet", payload)
          resolve('加入购物车成功')
        }
      })
    }
  },
  getters: {
    categoryLength(state) {
      return state.cartList.length
    },
    categoryList(state) {
      return state.cartList
    }
  }
})

export default store