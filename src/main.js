import Vue from 'vue'
import App from './App.vue'
import router from './router/Index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/font/iconfont.css'
import './assets/fonts/iconfont.js'

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
