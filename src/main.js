import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/main.css';

new Vue({
  el: '#app',
  router,
  render: c => c(App) // 将组件编译为render喊函数，比template效率高
});