import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'
// 导入全局样式表
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'

import treeTable from 'vue-table-with-tree-grid'
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.component('tree-table',treeTable)
Vue.use(VueQuillEditor, /* { default global options } */)
//定义全局时间过滤器
Vue.filter('dateFormat',function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth()+1+'').padStart(2,'0')//padStart (位数，补齐)   不足两位，前面补0
  const d = (dt.getDate()+'').padStart(2,'0')

  const hh = (dt.getHours()+'').padStart(2,'0')
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  const ss = (dt.getSeconds()+'').padStart(2,'0')
  return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
})
// axios.defaults.baseURL  = 'http://127.0.0.1:7300/mock/600532780602403a6cb0f4d3/v1';
axios.defaults.baseURL  = 'http://127.0.1.1:8083';
//设置请求拦截器,挂载Authorization的token令牌
axios.interceptors.request.use((config)=>{
  // config.headers.Authorization  =window.sessionStorage.getItem('token')
  config.headers.TOKEN  ='123456'
  // config.headers.Content-Type =
  //最后必须return config
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

