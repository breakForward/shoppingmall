import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import Vuelazyload from "vue-lazyload"

Vue.use(Vuelazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
