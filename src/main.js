// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// 禁用终端打印日志
Vue.config.productionTip = false

Vue.prototype.$ajax = axios

Vue.filter('timeDifference', function (value) {
  /* 一个全局过滤器 */
  if (!value) return ''
  // 相差时间(毫秒) = 当前时间 - 传入的时间
  const time = new Date().getTime() - new Date(value).getTime()
  if (time < 0) {
    return ''
  } else if (time / 1000 < 30) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt(time / 1000) + '秒前'
  } else if (time / 60000 < 60) {
    return parseInt(time / 60000) + '分钟前'
  } else if (time / 3600000 < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if (time / 86400000 < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if (time / 2592000000 < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
