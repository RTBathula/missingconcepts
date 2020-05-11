import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',       
        component: () => import('~/layouts/DefaultContainer/index').then(m => m.default || m),
        children: [
          {
            path: '',
            name: 'Home',
            component: () => import('~/pages/Home/index').then(m => m.default || m)
          },
          {
            path: 'details/:id',
            name: 'Details',
            component: () => import('~/pages/Details/index').then(m => m.default || m)
          },          
          {
            path: 'new-post',
            name: 'New Post',
            component: () => import('~/pages/NewStory/index').then(m => m.default || m)
          },
          {
            path: 'user-posts',
            name: 'User Posts',
            component: () => import('~/pages/UserStories/index').then(m => m.default || m)
          },
          {
            path: 'about-and-rules',
            name: 'About Rules',
            component: () => import('~/pages/AboutRules/index').then(m => m.default || m)
          }
        ]
      }
    ]
  });
}
