<template>
    <div id="movie-annual">
      <header class="annual-header">
        <div class="header-logo">
          <a class="index" href="/"><p>W<em>ithyou</em></p></a>
        </div>
        <div class="header-title">
          豆瓣{{year}}年度榜单电影
        </div>
        <div class="header-annual-menu-btn">
          目录
        </div>
        <div class="header-annual-menu">
          <div class="menu-item" v-for="(item, index) in body" :key="item.id">
            <a :href="'#anchor' + (index + 1)">{{item.payload.title}}</a>
          </div>
        </div>
      </header>
      <div class="annual-items">
        <div :id="'anchor' + (index + 1)" 
          class="annual-item" 
          :style="getAnnualStyle(item)" 
          v-for="(item, index) in body"
          :key="index + 1">
          <div :class="getAnnualBodyClass(item.kind_str)">
            <div class="annual-preview" v-if="item.kind_str === 'top10'">
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
            <ul class="annual-item-list" v-if="item.kind_str === 'top10'">
              <li @click="gotoMovieDetail(movie.id)" class="annual-movie-item" v-for="(movie, index) in item.subjects" v-if="index >= 1" :key="movie.id">
                <div class="movie-item-image">
                  <img :src="movie.image_url" :alt="movie.title">
                </div>
                <div class="movie-info">
                  {{movie.title}}
                  <span class="movie-rate">{{movie.average}}</span>
                </div>
              </li>
            </ul>
            <div class="annual-dialogue" v-if="item.kind_str === 'dialogue'">
              <p class="text">
                {{item.payload.text}}
                <a :href="getMovieDetail(item.subject.id)">--《{{item.subject.title}}》</a>
              </p>
            </div>
          </div>
          <button v-show="show_next" class="next" @click="gotoNext((index + 2))">
            <div class="icon-down"></div>
          </button>
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
          browserHeight: 0,
          cursor: 1,
          page: {
            page: 1,
            count: 100,
            total: 0
          },
          body:[],
          web: true,
          year: "",
          up: false,
          more_message: "点击加载更多",
          show_next: true,
          i: 0,
          active_next_scroll: true,
          active_pre_scroll: true,
          offset_top: 0
        };
      },
      mounted () {
          window.addEventListener('scroll', this.handleScroll, true);
      },
      methods: {
        handleScroll() {
          let selector = '#anchor' + this.cursor;
          let anchor = this.$el.querySelector(selector)
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let scroll = scrollTop - this.i;
            this.i = scrollTop;
              if (scroll < 0) {
                if (this.active_pre_scroll) {
                  this.active_pre_scroll = false;
                  this.gotoPre(this.cursor - 1);
                } else if (anchor.offsetTop === this.offset_top) {
                  this.active_pre_scroll = true;
                }
              } else {
                if (this.active_next_scroll) {
                  this.active_next_scroll = false;
                  this.gotoNext(this.cursor + 1);
                } else if (anchor.offsetTop === this.offset_top) {
                  this.active_next_scroll = true;
                }
              }
          
        },
        gotoMovieDetail(id) {
          let router = this.$router.resolve({ path: '/movie/subject/' + id});
          window.open(router.href, '_blank');
        },
        getAnnualBodyClass(kind_str) {
          if (kind_str === "top10") {
            return "annual-item-body";
          } else if(kind_str === "dialogue") {
            return "annual-item-dialogue";
          }
        },
        getMovieDetail(id) {
          return "/movie/subject/" + id;
        },
        getStars(stars) {
          return stars / 2;
        },
        gotoPre(index) {
          if (index === 0) {
            return;
          }

          let selector = '#anchor' + index;
          let anchor = this.$el.querySelector(selector)
          document.documentElement.scrollTop = anchor.offsetTop
          this.cursor = index;
          this.offset_top = anchor.offsetTop;
        },
        gotoNext(index) {
          if (index === this.body.length - 1) {
            this.$message.error("没有更多内容了!");
            return;
          }

          let selector = '#anchor' + index;
          let anchor = this.$el.querySelector(selector)
          this.cursor = index;
          this.offset_top = anchor.offsetTop;
          document.documentElement.scrollTop = anchor.offsetTop
        },
        getAnnualStyle(item) {
          let background_img = item.payload.background_img;
          if (this.checkMedia()) {
            background_img = item.payload.mobile_background_img;
          }
          if (background_img) {
            return "height:" + this.browserHeight + "px ; background: #FFF url('" + background_img + "') no-repeat; background-size: 100% " + this.browserHeight + "px";
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

            let annuals = this.body;
            data.body.data.body.map((item, key) => {
              annuals.push(item);
            });
            this.body = annuals;
          });
        },
      },
      created() {
        this.getAnnualMovieList();
        this.browserHeight = global_.FUNC.getBrowserHeight();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/movieAnnual'
</style>
