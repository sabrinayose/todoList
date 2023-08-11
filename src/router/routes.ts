import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/todo', component: () => import('pages/TodoPage.vue') },
      { path: '/add-list', component: () => import('pages/AddListPage.vue') },
      {
        path: '/edit-list/:id',
        props: true,
        component: () => import('pages/EditListPage.vue'),
      },
      { path: '/pokemon', component: () => import('pages/PokemonPage.vue') },
      {
        path: '/pokemon/:name',
        props: true,
        component: () => import('pages/PokemonDetailPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
