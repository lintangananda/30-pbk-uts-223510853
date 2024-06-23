// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import TodosView from '../views/TodosView.vue';
import PostView from '../views/PostView.vue';
import AlbumView from '../views/AlbumView.vue';
import AlbumDetail from '../views/AlbumDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/todos', name: 'Todos', component: TodosView },
    { path: '/post', name: 'Post', component: PostView },
    { path: '/album', name: 'Album', component: AlbumView },
    { path: '/albums/:albumId', name: 'AlbumDetail', component: AlbumDetail, props: true },
  ],
});

export default router;