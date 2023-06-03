import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 加载核心vant组件库
import 'vant/lib/index.css' // 加载vant全局样式
import '@/styles/index.less' // 加载全局样式
import 'amfe-flexible' // 设置rem基准值插件，动态设置rem基准值

Vue.use(Vant) // 注册vant组件库，调用vant中的install方法

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
