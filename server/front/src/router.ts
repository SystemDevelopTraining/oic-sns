import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';
import Login from './views/Login.vue';
import Timeline from './views/Timeline.vue';
import UserInitProfile from './views/User_init_profile.vue';
import UserPage from './views/UserPage.vue';

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
      path: '/login',
      name: 'login',
      component: Login,
    },

    {
      path: '/timeline',
      name: 'timeline',
      component: Timeline,
    },

    {
      path: '/user_init_profile',
      name: 'User_init_profile',
      component: UserInitProfile,
    },

    {
      path: '/user/:id',
      component: UserPage,
    },
  ],
});
