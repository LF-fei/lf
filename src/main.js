import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Elementui)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
