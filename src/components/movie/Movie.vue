<template>
    <div id="movie">
      <header class="movie-header">
        <div class="header-left"></div>
        <div class="header-center">
          <ul class="movie-header-nav">
          <li><a href="/movie/annual/2018">2018年度榜单</a></li>
          <li><a href="/movie/annual/2017">2017年度榜单</a></li>
          <li><a href="/movie/annual/2016">2016年度榜单</a></li>
          <li><a href="/movie/annual/2015">2015年度榜单</a></li>
        </ul>
        </div>
        <div class="header-right"></div>
      </header>
      <div class="body">
        <div class="body-left"></div>
        <div class="body-center">
          <router-view></router-view>
        </div>
        <div class="body-right"></div>
      </div>
    </div>
</template>

<script>
  import global_ from "../config/Global"
  const BOOK_URL = global_.URLS.BOOK_URL;
  const tag_url = global_.URLS.DOUBAN_BOOK_TAG_URL;
    export default {
      name: "book",
      data() {
        return {
        };
      },
      methods: {
        checkMedia() {
          return window.matchMedia('(max-width:415px)').matches;
        }
      },
      created() {
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/movie'
</style>
