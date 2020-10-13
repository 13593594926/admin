import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
router.beforeEach((to, form, next) => {
  if (to.name == 'login') {
    let token = sessionStorage.getItem('user_token')
    if (token != null) {
      next('/home')
    }
    next()
  }
  next()

})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')