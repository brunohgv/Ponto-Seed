import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Registers from '@/components/Registers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/registers',
      name: 'Registers',
      component: Registers
    }
  ]
})
