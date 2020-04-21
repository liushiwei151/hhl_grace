// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import layer from 'vue-layer'
import axios from 'axios'
import qs from 'qs'
import wx from 'weixin-js-sdk'
import 'vue-layer/lib/vue-layer.css'

Vue.config.productionTip = false


Vue.prototype.$layer = layer(Vue);
Vue.prototype.$axios = axios;    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs;
Vue.prototype.wx=wx;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
