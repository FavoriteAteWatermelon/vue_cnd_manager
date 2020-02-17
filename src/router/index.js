import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Layout from '@/views/layout'
// import chartsRouter from './modules/charts'
Vue.use(Router)

export const routes = [

  // 跟跳转
  {
    path: '/',
    redirect: '/dashboard',
    name: 'home',
    hidden: true
  },
  // 首页
  {
    path: '/Dashboard',
    // component: Layout,
    component: Layout,
    title: 'Dashbord',
    icon: 'el-icon-menu',
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboardtest',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/PE',
    // component: Layout,
    component: Layout,
    name: 'Product',
    icon: 'el-icon-coordinate',
    children: [
      {
        path: '',
        component: () => import('@/views/pe/index'),
        name: 'PE',
        meta: { title: 'PE', icon: 'coin' }
      }
    ]
  },
  {
    path: '/RE',
    // component: Layout,
    component: Layout,
    name: 'Repair',
    icon: 'el-icon-cpu',
    children: [
      {
        path: '',
        component: () => import('@/views/re/index'),
        name: 'RE',
        meta: { title: 'RE', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/IE',
    // component: Layout,
    component: Layout,
    name: 'Industry',
    icon: 'el-icon-truck',
    children: [
      {
        path: '',
        component: () => import('@/views/ie/index'),
        name: 'IE',
        meta: { title: 'IE', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/TE',
    component: Layout,
    icon: 'el-icon-set-up',
    redirect: '/TE/aoi',
    name: 'Test',
    children: [
      {
        path: '/TE/aoi',
        component: () => import('@/views/te/aoi'),
        name: 'Aoi',
        meta: {title: 'aoi', nav: 'last'},
        icon: 'el-icon-data-line'
      },
      {
        path: '/TE/watch',
        component: () => import('@/views/te/watch'),
        name: 'Watch',
        meta: {nav: 'last'},
        icon: 'el-icon-view'
      }
    ]
  }
  // chartsRouter
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
