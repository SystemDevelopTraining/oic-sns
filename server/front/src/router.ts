import Vue from 'vue';
import Router from 'vue-router';
import Top from './views/TopPage.vue';
import Timeline from './views/TimelinePage.vue';
import UserInitProfile from './views/UserInitProfilePage.vue';
import User from './views/UserPage.vue';
import FollowList from './views/FollowListPage.vue';
import EditProfile from './views/EditProfilePage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top,
    },

    {
      path: '/timeline',
      name: 'timeline',
      component: Timeline,
    },

    {
      path: '/user_init_profile',
      name: 'userInitProfile',
      component: UserInitProfile,
    },

    {
      path: '/user/:id',
      name: 'user',
      component: User,
    },

    {
      path: '/user/:id/follow_list',
      name: 'followList',
      component: FollowList,
    },

    {
      path: '/user/:id/edit_profile',
      name: 'editProfile',
      component: EditProfile,
    },
  ],
});
