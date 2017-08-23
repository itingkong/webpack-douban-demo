import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import MovieList from './components/movie/List.vue';
import MovieDetail from './components/movie/Detail.vue';

Vue.use(VueRouter);

// 配置路由表
const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/intheaters' },
    { path: '/in_theaters', component: MovieList },
    { path: '/coming_soon', component: MovieList },
    { path: '/top250', component: MovieList },
    { name: 'MovieDetail', path: '/detail/:id', component: MovieDetail }
  ]
});

export default router;