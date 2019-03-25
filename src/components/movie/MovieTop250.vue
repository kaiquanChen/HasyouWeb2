<template>
    <div id="movie-top250">
      <div class="left">
        <h1>电影Top250</h1>
        <div class="movie-top250-body">
          <div class="movie-top250-item" v-for="(movie, index) in movies">
            <div class="movie-image">
              <a target="_blank" :href="getMovieDetail(movie.id)">
                <img :src="movie.image_url" :alt="movie.title">
              </a>
            </div>
            <div class="info">
              <span class="info-item movie-title">
                <em>{{(page.page - 1) * page.count + index + 1}}</em>.
                <a target="_blank" :href="getMovieDetail(movie.id)">{{movie.title}}</a>
                <a target="_blank" :href="getMovieDetail(movie.id)" 
                  v-if="movie.aka && movie.aka.length > 0 && index < 3"
                  v-for="(aka, index) in movie.aka"> 
                  / {{aka}}
                </a>
              </span>
              <el-rate
                class="info-item"
                :value="getStars(movie.average)"
                :score-template="movie.average + ''"
                show-score
                disabled
                text-color="#ff9900">
              </el-rate>
              <span class="info-item">
                <span class="movie-year" v-if="movie.year">{{movie.year}}</span>
                <span class="movie-duration" v-if="movie.durations && movie.durations.length > 0">
                   / {{movie.durations[0]}}
                </span>
                <span class="movie-country" v-if="movie.countries && movie.countries.length > 0">
                   / {{movie.countries[0]}}
                </span>
              </span>
              <span class="info-item movie-summary" v-if="movie.movie_tag.vars.intro">
                <p class="quote summary">
                  <img src="/static/image/quotel.png"/>
                  {{movie.movie_tag.vars.intro}}
                  <img src="/static/image/quoter.png"/>
                </p>
              </span>
            </div>
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :pageSize="page.count"
              :total="page.total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
</template>

<script>
  import global_ from "../config/Global"

  const movie_url = global_.URLS.DOUBAN_MOVIE;
    export default {
      name: "book",
      data() {
        return {
          show_summary: {},
          movies:[],
          page:{
            page:1,
            count:25,
            total:250
          }
        };
      },
      methods: {
        showSummary(id) {
          let show_summary = this.show_summary;
          show_summary[id] = !show_summary[id];
          this.show_summary = show_summary;
          console.log(this.show_summary);
        },
        getStars(stars) {
          return stars / 2;
        },
        handleCurrentChange(val) {
          this.page.page = val;
          this.getMovieTop250();
        },
        checkMedia() {
          return window.matchMedia('(max-width:600px)').matches;
        },
        getMovieDetail(id) {
          return "/movie/subject/" + id;
        },
        getMovieTop250() {
          this.$http.get(movie_url + "top250", {
            params: {
              p: this.page.page,
              count: this.page.count
            },
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.movies = data.body.data.body;
            this.page.page = data.body.data.page;
            this.page.count = data.body.data.count;
            this.page.total = data.body.data.total;
          });
        }
      },
      created() {
        this.getMovieTop250();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/movieTop250'
</style>
