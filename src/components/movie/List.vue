<template>
<div>
  <h1>电影列表</h1>
  <div class="list-group">
    <router-link
      :to="{name: 'MovieDetail', params: {id: item.id}}"
      :key="item.id"
      class="list-group-item"
      v-for="item in movieList">
      <div class="media">
        <div class="media-left">
            <img class="media-object" :src="item.images.small" :alt="item.title">
        </div>
        <div class="media-body">
          <h4 class="media-heading">{{ item.title }}</h4>
          <p>电影详情介绍。。。</p>
        </div>
      </div>
    </router-link>
  </div>
  <button class="btn btn-default" @click="loadNext">点击加载更多。。。</button>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
    data(){
      return {
        movieList: [],
        pageSize: 5,
        page:1
      }
    },
    watch: {
      // 如果路由有变化，会再次执行
      '$route'(){
        this.page = 1;
        this.movieList = [];
        this.loadMovieList(this.page,this.pageSize);
      }
    },
    methods: {
      async loadMovieList(page, pageSize){
        const res = await axios.get(`/api/movie/${this.$route.path}`,{
          params: {
            start: (page - 1)*pageSize,
            count: pageSize
          }
        });
        const subjects = res.data.subjects;
        if(subjects.length === 0){
          return window.alert('没有更多数据了')
        }
        this.movieList = [...this.movieList, ...subjects];
      },
      loadNext(){
        this.page+=1;
        this.loadMovieList(this.page, this.pageSize);
      }
    },
    created(){
      this.loadMovieList(this.page,this.pageSize);
    }
  }
</script>

<style>

</style>