import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import grList from '@/components/grList'
import grCertificate from '@/components/grCertificate'
import starFlowing from '@/components/starFlowing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/grCertificate',
      name: 'grCertificate',
      component: grCertificate
    },
    {
      path: '/grList',
      name: 'grList',
      component: grList
    },
    {
      path:'/starFlowing',
      name:'starFlowing',
      component:starFlowing
    }
  ]
})
