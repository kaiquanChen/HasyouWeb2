<template>
    <div id="movie-annual">
      <header class="annual-header">
        豆瓣{{year}}年度榜单电影
      </header>
      <div class="annual-items">
        <div class="annual-item" :style="getAnnualStyle(item)" v-for="(item, index) in body" :key="item.id">
          <div class="annual-preview">
            <div class="annual-preview-body">
              <div class="annual-name">
                {{item.payload.title}}
              </div>
              <div class="movie-info">
                <div class="movie-info-top">
                  <div class="movie-image">
                    <a target="_blank" :href="getMovieDetail(item.subjects[0].id)">
                      <img :src="item.subjects[0].image_url" alt="item.subjects[0].title">
                    </a>
                  </div>
                  <div class="movie-info-right">
                    <div class="movie-title">
                      <a target="_blank" :href="getMovieDetail(item.subjects[0].id)">{{item.subjects[0].title}}</a>
                    </div>
                    <div class="movie-rate">
                      豆瓣评分<br>
                      <span class="movie-stars">
                        {{item.subjects[0].average}}
                      </span>
                      <el-rate
                        class="primary-rate"
                        :value="getStars(item.subjects[0].average)"
                        disabled
                        text-color="#ff9900">
                      </el-rate>
                    </div>
                  </div>
                </div>
                <div class="movie-info-bottom">
                    {{item.payload.description}}
                </div>
              </div>
            </div>
          </div>
          <ul class="annual-item-list">
            <li class="annual-movie-item" v-for="(movie, index) in item.subjects" v-if="index > 1" :key="movie.id">
              <div class="movie-item-image">
                <img :src="movie.image_url" :alt="movie.title">
              </div>
              <div class="movie-info">
                {{movie.title}}
                <span class="movie-rate">{{movie.average}}</span>
                <!-- <a target="_blank" :href="getMovieDetail(movie.id)"></a> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import global_ from "../config/Global"

  const MOVIE_ANNUAL_URL = global_.URLS.MOVIE_ANNUAL_URL;
    export default {
      name: "book",
      data() {
        return {
          page: {
            page: 1,
            count: 10,
            total: 0
          },
          body:[],
          web: true,
          year: "",
          up: false,
          more_message: "点击加载更多",
        };
      },
      methods: {
        getMovieDetail(id) {
          return "/movie/subject/" + id;
        },
        getStars(stars) {
          return stars / 2;
        },
        getAnnualStyle(item) {
          let browserHeight = global_.FUNC.getBrowserHeight();
          let background_img = item.payload.background_img;
          if (this.checkMedia()) {
            background_img = item.payload.mobile_background_img;
          }
          if (background_img) {
            return "height:" + browserHeight + "px ; background: #FFF url('" + background_img + "') no-repeat; background-size: 100% " + browserHeight + "px";
          } else {
            return "";
          }
        },
        checkMedia() {
          return window.matchMedia('(max-width:600px)').matches;
        },
        getAnnualMovieList() {
          this.year = this.$route.params.year;
          this.$http.get(MOVIE_ANNUAL_URL + this.year, {
            headers: {
              bid: global_.FUNC.getBid()
            },
            params: {
              p: this.page.page,
              count: this.page.count
            }
          }).then( data => {
            if (data.body.code !== 200) {
              this.$message.error("数据获取失败!");
              return;
            }

            this.page.page = data.body.data.page;
            this.page.count = data.body.data.count;
            this.page.total = data.body.data.total;
            this.body = data.body.data.body;
          });
        },
      },
      created() {
        // this.$router.push({path: "/book/books"});
        this.getAnnualMovieList();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/movieAnnual'
</style>
