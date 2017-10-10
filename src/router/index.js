import Vue from 'vue'
import Router from 'vue-router'
import Taquin from '@/components/Taquin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Taquin
    }
  ]
})
