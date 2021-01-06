import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: () => import('../views/index.vue')
}, {
  path: '/bak',
  name: 'bak',
  component: () => import('../views/index.bak.vue')
}]
const router = new VueRouter({
  mode: "hash",
  routes
})

export default router