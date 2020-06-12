import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import {
    API_CHECKTOKEN
} from '@/api/apis'

//与vue联系起来
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [ {
        //登录
        path: '/',
        name: 'login',
        component: Login
    }, {
        //店铺首页
        path: '/homepage',
        name: 'homepage',
        component: () => import('../pages/Homepage.vue'),
        children: [{
                //首页主体内容
                path: '/homepage/index',
                name: 'index',
                meta: {
                    role: ['super', 'normal']
                },
                component: () => import('../pages/home/Index'),
            }, {
                //订单管理
                path: '/homepage/ordermanage',
                name: 'ordermanage',
                meta: {
                    role: ['super']
                },
                component: () => import('../pages/home/Ordermanage')
            },
            {
                //商品管理---商品列表
                path: '/homepage/shoplist',
                name: 'shoplist',
                meta: {
                    role: ['super', 'normal']
                },
                component: () => import('../pages/home/sale/Shoplist'),
            },
            {
                //商品管理---商品添加
                path: '/homepage/additem',
                name: 'additem',
                meta: {
                    role: ['super', 'normal']
                },
                component: () => import('../pages/home/sale/Additem'),
            },
            {
                //商品管理---商品分类
                path: '/homepage/commodityclassification',
                name: 'commodityclassification',
                meta: {
                    role: ['super', 'normal']
                },
                component: () => import('../pages/home/sale/Commodityclassification'),
            },
            {
                //店铺管理
                path: '/homepage/storemanage',
                name: 'storemanage',
                meta: {
                    role: ['super', 'normal']
                },
                component: () => import('../pages/home/Storemanage'),

            },
            {
                //账号管理---账号列表
                path: '/homepage/accountlist',
                name: 'accountlist',
                meta: {
                    role: ['super']
                },
                component: () => import('../pages/home/account/Accountlist')
            },
            {
                //账号管理---添加账号
                path: '/homepage/addaccount',
                name: 'addaccount',
                meta: {
                    role: ['super']
                },
                component: () => import('../pages/home/account/Addaccount')
            },
            {
                //账号管理---修改密码
                path: '/homepage/changepassword',
                name: 'changepassword',
                meta: {
                    role: ['super']
                },
                component: () => import('../pages/home/account/Changepassword')
            },
            {
                //账号管理---个人中心
                path: '/homepage/personal',
                name: 'personal',
                meta: {
                    role: ['super', 'normal']
                },
                component: () => import('../pages/home/account/Personal')
            },
            {
                //销售统计---商品统计
                path: '/homepage/commoditystatistic',
                name: 'commoditystatistic',
                meta: {
                    role: ['super']
                },
                component: () => import('../pages/home/sell/Commoditystatistic')
            },
            {
                //销售统计---订单统计
                path: '/homepage/orderstatistic',
                name: 'orderstatistic',
                meta: {
                    role: ['super']
                },
                component: () => import('../pages/home/sell/Orderstatistic')
            },
        ]
    }, ],

})

router.beforeEach((to, from, next) => {
    //to：要前往的路由对象
    //from：现在的router对象
    //判断
    //获取存储
    let account = JSON.parse(localStorage.getItem("account"));
  
    if (to.path !== '/') {
        
        //如果不是前往登录，就通过token是否有效
        API_CHECKTOKEN(account.token).then(res => {
            if (res.data.code == 0) {
                //在登录状态，放行
                if (to.meta.role.includes(account.role) == true) {
                    next()
                } else {
                    next(from.path)
                }
            } else {
                next('/')
            }
        })
    } else next()

})

export default router