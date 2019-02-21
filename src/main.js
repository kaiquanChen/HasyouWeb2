// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import {routes} from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})