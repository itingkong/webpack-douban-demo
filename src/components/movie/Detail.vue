<template>
  <div>
    <h1>{{ movie.title }}</h1>
    <img :src="movie.images.large" alt="">
    <p>导演：<span v-for="dir in movie.directors">{{ dir.name }}</span></p>
    <p>演员：<span v-for="cast in movie.casts">{{ cast.name+('、') }}</span></p>
    <p>{{ movie.summary }}</p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        movie: {}
      }
    },
    created () {
      const {id} = this.$route.params
      this.getMovieDetail(id)
    },
    methods: {
      async getMovieDetail (id) {
        const res = await axios.get(`/api/movie/subject/${id}`)
        this.movie = res.data
      }
    }
  }
</script>

<style>
  
</style>
