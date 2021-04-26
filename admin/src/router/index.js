import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import CategoryEdit from "@/views/CategoryEdit";
import CategoryList from "@/views/CategoryList";
import ItemEdit from "@/views/ItemEdit";
import ItemList from "@/views/ItemList";
import HeroEdit from "@/views/HeroEdit";
import HeroList from "@/views/HeroList";
import ArticleEdit from "@/views/ArticleEdit";
import ArticleList from "@/views/ArticleList";
import AdEdit from "@/views/AdEdit";
import AdList from "@/views/AdList";
import AdminUserEdit from "@/views/AdminUserEdit";
import AdminUserList from "@/views/AdminUserList";
import Login from "@/views/Login";




Vue.use(VueRouter)

const includPush = VueRouter.prototype.push                    //路由报错  添加修复
VueRouter.prototype.push = function push(location) {
  return includPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/login',name:'Login',component: Login
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/categories/create',component:CategoryEdit},
      {path:'/categories/edit/:id',component:CategoryEdit,props:true},
      {path:'/categories/list',component:CategoryList},

      {path:'/items/create',component:ItemEdit},
      {path:'/items/edit/:id',component:ItemEdit,props:true},
      {path:'/items/list',component:ItemList},

      {path:'/heroes/create',component:HeroEdit},
      {path:'/heroes/edit/:id',component:HeroEdit,props:true},
      {path:'/heroes/list',component:HeroList},

      {path:'/articles/create',component:ArticleEdit},
      {path:'/articles/edit/:id',component:ArticleEdit,props:true},
      {path:'/articles/list',component:ArticleList},

      {path:'/ads/create',component:AdEdit},
      {path:'/ads/edit/:id',component:AdEdit,props:true},
      {path:'/ads/list',component:AdList},

      {path:'/admin_users/create',component:AdminUserEdit},
      {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true},
      {path:'/admin_users/list',component:AdminUserList},

    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
