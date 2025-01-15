import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission
Vue.use(plugins)
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
