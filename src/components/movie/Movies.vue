<template>
    <div id="movies">
      <div class="left">
        <div class="in-theaters">
          <h2><b>正在热映</b></h2>
          <div class="page-btn-dot" v-if="!checkMedia()">
            <div class="item" :style="getStyle('IN_THEATERS', 1)" @click="handleInTheaters(1)"></div>
            <div class="item" :style="getStyle('IN_THEATERS', 2)" @click="handleInTheaters(2)"></div>
            <div class="item" :style="getStyle('IN_THEATERS', 3)" @click="handleInTheaters(3)"></div>
            <div class="item" :style="getStyle('IN_THEATERS', 4)" @click="handleInTheaters(4)"></div>
          </div>
          <div class="page-btn">
            <a href="javascript:void(0);" @click="handleInTheaters('prev')" class="prev">‹</a>
            <a href="javascript:void(0);" @click="handleInTheaters('next')" class="next">›</a>
          </div>
          <ul class="in-theaters-body">
            <li :class="getClass(index)" v-for="(item, index) in movie_in_theaters" :key="item.id">
              <div class="cover">
                <a target="_blank" :href="gotoMovieDetail(item.id)">
                  <img :src="item.image_url" />
                </a>
              </div>
              <div class="info">
                <div class="title"><a :href="gotoMovieDetail(item.id)">{{item.name}}</a></div>
                <!-- <div class="author">{{item.authors[0]}}</div> -->
              </div>
            </li>
          </ul>
        </div>
        <div class="coming-soon">
          <h2><b>即将上映</b></h2>
        </div>
        <div class="new-movies">
          <h2><b>最新电影</b></h2>
        </div>
      </div>
      <div class="right">
        <div class="box-us">
          <h3><b>北美票房榜</b></h3>
        </div>
        <div class="weely">
          <h3><b>一周口碑榜</b></h3>
        </div>
        <div class="top250">
          <h3><b>电影TOP250</b></h3>
        </div>
      </div>
    </div>
</template>

<script>
  import global_ from "../config/Global"

  const MOVIE_URL = global_.URLS.DOUBAN_MOVIE;
    export default {
      name: "book",
      data() {
        return {
        movie_in_theaters:[],
        movie_coming_soon:[],
        movie_new:[],
        movie_weekly:[],
        movie_top250:[],
        movie_us_box:[],
        coming_soon_page:{
          total:0,
          page:1,
          count:10
        },
        in_theaters_page:{
          total:0,
          page:1,
          count:10
        },
        new_page:{
          total:0,
          page:1,
          count:10
        },
        movie_data:{}
        };
      },
      methods: {
        gotoMovieDetail(id) {
          return "/movie/subject/" + id;
        },
        getClass(index) {
          if (index % 5 === 0) {
            return "movie-item" + " first";
          } else if (index % 3 === 0) {
            return "movie-item" + " last";
          }
          return "movie-item";
        },
        getStyle(domain, num) {
          let page = {};
          if (domain === 'BOOK_EXPRESS') {
            page = this.express_page;
          } else if (domain === 'GOOD_MARKET') {
            page = this.good_market_page;
          }

          if (page.p === num) {
            return "background: #9b9a8e;";
          }
          return "background: #cccccc;";
        },
        handleInTheaters(type) {
          if (type === 'prev') {
            if (this.in_theaters_page.p === 1) {
              this.in_theaters_page.p = Math.ceil(this.in_theaters_page.total / this.in_theaters_page.count);
            } else {
              this.in_theaters_page.p = this.in_theaters_page.p - 1;
            }
          } else if (type === 'next') {
            if (this.in_theaters_page.p === Math.ceil(this.in_theaters_page.total / this.in_theaters_page.count)) {
              this.in_theaters_page.p = 1;
            } else {
              this.in_theaters_page.p = this.in_theaters_page.p + 1;
            }
          } else if(!isNaN(type)) {
            this.in_theaters_page.p = type;
          } else {
            return;
          }

          let movie_in_theaters = [];
          let start = (this.in_theaters_page.p - 1) * this.in_theaters_page.count;
          for (let j = 0; j < this.in_theaters_page.count && start < this.movie_data["IN_THEATERS"].length; start++, j++) {
            movie_in_theaters.push(this.movie_data["IN_THEATERS"][start]);
          }
          this.movie_in_theaters = movie_in_theaters;
        },
        getMovieList(type, p, count) {
          this.$http.get(MOVIE_URL + type, {
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.movie_data[type] = data.body.data;
            for (let i = 0; i < count; i++) {
              if (type === "IN_THEATERS") {
                this.movie_in_theaters.push(data.body.data[i]);
                console.log(this.movie_in_theaters);
                this.in_theaters_page.page = 1;
                this.in_theaters_page.count = count;
                this.in_theaters_page.total = data.body.data.length;
              } else if (type === "COMING_SOON") {
                this.movie_coming_soon[i] = data.body.data[i];
                this.coming_soon_page.page = 1;
                this.coming_soon_page.count = count;
                this.coming_soon_page.total = data.body.data.length;
              } else if (type === "NEW_MOVIES") {
                this.movie_new[i] = data.body.data[i];
                this.new_page.page = 1;
                this.new_page.count = count;
                this.new_page.total = data.body.data.length;
              } else if (type === "WEEKLY" && i < data.body.data.length) {
                this.movie_weekly[i] = data.body.data[i];
              } else if (type === "US_BOX" && i < data.body.data.length) {
                this.movie_us_box[i] = data.body.data[i];
              }
            }
          });
        },
        getMovieTop250() {
          this.$http.get(MOVIE_URL + "top250", {
            params: {
              p: 1,
              count: 10
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

            this.movie_top250 = data.body.data.body;
          });
        },
        handleInTheatersChange(val) {
          this.movie_in_theaters = [];
          this.in_theaters_page.page = val;
          let start = (val - 1) * this.in_theaters_page.count;
          for (let j = 0; j < this.in_theaters_page.count && start < this.movie_data["IN_THEATERS"].length; start++) {
            this.movie_in_theaters[j++] = this.movie_data["IN_THEATERS"][start];
          }
        },
        handleNewMoviesCurrentChange(val) {
          this.movie_new = [];
          this.new_page.page = val;
          let start = (val - 1) * this.new_page.count;
          for (let j = 0; j < this.new_page.count && start < this.movie_data["NEW_MOVIES"].length; start++) {
            this.movie_new[j++] = this.movie_data["NEW_MOVIES"][start];
          }
        },
        handleComingSoonCurrentChange(val) {
          this.movie_coming_soon = [];
          this.coming_soon_page.page = val;
          let start = (val - 1) * this.coming_soon_page.count;
          for (let j = 0; j < this.coming_soon_page.count && start < this.movie_data["COMING_SOON"].length; start++) {
            this.movie_coming_soon[j++] = this.movie_data["COMING_SOON"][start];
          }
        },
        getMovieDetail(id) {
          return "subject/" + id;
        },
        gotoTag(id) {
          return "/book/tag/" + id;
        },
        checkMedia() {
          return window.matchMedia('(max-width:600px)').matches;
        }
      },
      created() {
        let count = 10;
        if (this.checkMedia()) {
          count = 6;
        }
        this.getMovieList("IN_THEATERS", 1, count);
        this.getMovieList("COMING_SOON", 1, count);
        this.getMovieList("NEW_MOVIES", 1, count);
        this.getMovieList("WEEKLY", 1, 12);
        this.getMovieList("US_BOX", 1, 12);
        this.getMovieTop250();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/movies'
</style>
