import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from  '../components/user/user.vue'
import UsersAdd from  '../components/user/userAdd.vue'
import orderAdd from  '../components/order/orderAdd.vue'
// import Rights from  '../components/power/rights.vue'
import Roles from '../components/roles/roles.vue'
import RolesAdd from '../components/roles/rolesAdd.vue'
import SalaryAdd from '../components/cost/salaryAdd.vue'
// import Cate from  '../components/goods/cart.vue'
// import Params from  '../components/goods/params.vue'
import Salary from  '../components/salary/salary.vue'
import statistics from  '../components/statistics.vue'
// import Add from  '../components/goods/add.vue'
import Orders from  '../components/order/order.vue'
import Cost from  '../components/cost/cost.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[{
      path:'/welcome',
      component:Welcome,
    },{
      path:'/users',
      component:Users,
    },{
      path:'/usersAdd',
      component:UsersAdd,
    },{
      path:'/roles',
      component:Roles,
    },{
      path: '/rolesAdd',
      component: RolesAdd
    }
      ,{
        path: '/salaryAdd',
        component: SalaryAdd
      }
      // {
  //     path: '/rights',
  //     component: Rights
  //   },{
  //     path: '/roles',
  //     component: Roles
  //   },{
  //     path: '/categories',
  //     component: Cate
  //   }
        ,{
      path:'/salary',
      component: Salary
    },

      {
        path:'/orders',
        component: Orders
      },
      {
        path:'/cost',
        component: Cost
      },
      {
        path:'/orderAdd',
        component: orderAdd
      },
      {
        path:'/statistics',
        component: statistics
      }
    ]


  },

]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫，防止用户通过路由直接访问权限页面
// router.beforeEach((to,from,next)=>{
//     //to 将要访问的页面
//     //from 代表从哪个路径跳转而来
//     //next 是一函数（放行函数）
//     //    next() 放行  ；next('/login')  强制跳转
//     if(to.path==='/login') return next();
//     //获取token
//     const tokenStr =  window.sessionStorage.getItem('token')
//     if(!tokenStr) return next('/login')
//     next()
// })

export default router
