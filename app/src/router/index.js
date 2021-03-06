import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/NotFound'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Reset from '@/components/Reset'
import Password from '@/components/Password'
import Navbar from '@/components/Navbar'
import Homepage from '@/components/Homepage'
import Profile from '@/components/Profile'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'*',
      component: NotFound
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/reset',
      component: Reset,
    },
    {
      path: '/password/:token',
      component: Password,
    },
    {
      path: '/',
      name: Navbar,
      component: Navbar,
      meta: { requiresAuth: true },
      children:[
        {
          path: '/',
          component: Homepage
        },

        {
          path: '/profile/:nickname',
          component: Profile
        }
      ]
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;


