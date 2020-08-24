import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import jquery from 'jquery'


Vue.use(VueAxios, axios)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// Vue.use(jquery);

// Vue.use(Element, { size: 'small', zIndex: 3000 });
axios.defaults.baseURL = "http://music.kele8.cn"
Vue.prototype.$axios = axios


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
