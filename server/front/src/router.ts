import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
