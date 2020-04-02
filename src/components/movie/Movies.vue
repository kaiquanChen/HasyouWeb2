<template>
    <div id="movies">
      <div class="left">
        <div class="in-theaters">
          <h2><b>最新热门电影</b></h2>
          <div class="movie-tag">
              <label 
                v-bind:style="active==='热门' ? 'color:#111' : 'color:#9B9B9B'" 
                class="movie-tag-label" @click="getByTagName('热门')">热门</label>
              <label v-bind:style="active==='最新' ? 'color:#111' : 'color:#9B9B9B'" 
                class="movie-tag-label" @click="getByTagName('最新')">最新</label>
              <label v-bind:style="active==='豆瓣高分' ? 'color:#111' : 'color:#9B9B9B'" 
                class="movie-tag-label" @click="getByTagName('豆瓣高分')">豆瓣高分</label>
              <label v-bind:style="active==='冷门佳片' ? 'color:#111' : 'color:#9B9B9B'" 
                class="movie-tag-label" @click="getByTagName('冷门佳片')">冷门佳片</label>
              <label v-bind:style="active==='华语' ? 'color:#111' : 'color:#9B9B9B'" 
                class="movie-tag-label" @click="getByTagName('华语')">华语</label>
              <label v-bind:style="active==='欧美' ? 'color:#111' : 'color:#9B9B9B'" 
                class="movie-tag-label" @click="getByTagName('欧美')">欧美</label>
              <label v-bind:style="active==='韩国' ? 'color:#111' : 'color:#9B9B9B'" 
                class="movie-tag-label" @click="getByTagName('韩国')">韩国</label>
              <label v-bind:style="active==='日本' ? 'color:#111' : 'color:#9B9B9B'" 
                class="movie-tag-label" @click="getByTagName('日本')">日本</label>
          </div>
          <div class="page-btn-dot" v-if="!checkMedia()">
            <div class="item" :style="getStyle('IN_THEATERS', index)" @click="handleInTheaters(index)" v-for="index in Math.ceil(in_theaters_page.total / in_theaters_page.count)"></div>
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
                <div class="movie-title"><a :href="gotoMovieDetail(item.id)">{{item.title}}</a></div>
                <div class="movie-rate" v-if="item.average"><span>豆瓣评分:<b>{{item.average}}</b></span></div>
                <div class="movie-rate" v-else><span>暂无评分</span></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="coming-soon">
          <h2><b>即将上映</b></h2><div class="page-btn-dot" v-if="!checkMedia()">
            <div class="item" :style="getStyle('COMING_SOON', index)" @click="handleComingSoon(index)" v-for="index in Math.ceil(coming_soon_page.total / coming_soon_page.count)"></div>
          </div>
          <div class="page-btn">
            <a href="javascript:void(0);" @click="handleComingSoon('prev')" class="prev">‹</a>
            <a href="javascript:void(0);" @click="handleComingSoon('next')" class="next">›</a>
          </div>
          <ul class="coming-soon-body">
            <li :class="getClass(index)" v-for="(item, index) in movie_coming_soon" :key="item.id">
              <div class="cover">
                <a target="_blank" :href="gotoMovieDetail(item.id)">
                  <img :src="item.image_url" />
                </a>
              </div>
              <div class="info">
                <div class="movie-title"><a :href="gotoMovieDetail(item.id)">{{item.title}}</a></div>
                <div class="movie-rate" v-if="item.average"><span>豆瓣评分:<b>{{item.average}}</b></span></div>
                <div class="movie-rate" v-else><span>暂无评分</span></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="new-movies">
          <h2><b>最新电影</b></h2>
          <div class="page-btn-dot" v-if="!checkMedia()">
            <div class="item" :style="getStyle('NEW_MOVIES', index)" @click="handleNewMovie(index)" v-for="index in Math.ceil(new_page.total / new_page.count)"></div>
          </div>
          <div class="page-btn">
            <a href="javascript:void(0);" @click="handleNewMovie('prev')" class="prev">‹</a>
            <a href="javascript:void(0);" @click="handleNewMovie('next')" class="next">›</a>
          </div>
          <ul class="new-movies-body">
            <li :class="getClass(index)" v-for="(item, index) in movie_new" :key="item.id">
              <div class="cover">
                <a target="_blank" :href="gotoMovieDetail(item.id)">
                  <img :src="item.image_url" />
                </a>
              </div>
              <div class="info">
                <div class="movie-title"><a :href="gotoMovieDetail(item.id)">{{item.title}}</a></div>
                <div class="movie-rate" v-if="item.average"><span>豆瓣评分:<b>{{item.average}}</b></span></div>
                <div class="movie-rate" v-else><span>暂无评分</span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="box-cn">
          <h3><b>国内票房榜</b><span class="label"><b>{{getCurrDate()}}</b>更新 / 元</span></h3>
          <div class="box-cn-body">
            <div class="box-cn-item" v-for="(item, index) in movie_cn_box">
              <span class="title">{{index + 1}}.&nbsp;&nbsp;{{item.movie_name}}</span>
              <span class="movie-box">{{item.sum_box_info}}</span>
            </div>
          </div>
        </div>
        <!-- <div class="box-us">
          <h3><b>北美票房榜</b><span class="label">美元</span></h3>
          <div class="box-us-body">
            <div class="box-us-item" v-for="(item, index) in movie_us_box">
              <span class="title">{{index + 1}}.&nbsp;
                <a target="_blank" :href="getMovieDetail(item.id)">{{item.title}}</a>
              </span>
              <span class="movie-box">{{item.movie_tag.vars.box / 10000}}万</span>
            </div>
          </div>
        </div>
        <div class="weekly">
          <h3><b>一周口碑榜</b></h3>
          <div class="weekly-item" v-for="(item, index) in movie_weekly">
            {{index + 1}}.
            <span class="title">&nbsp;&nbsp;
              <a target="_blank" :href="getMovieDetail(item.id)">{{item.title}}</a>
            </span>
            <span class="stars">{{item.average}}</span>
          </div>
        </div> -->
        <div class="top250">
          <h3><b>电影TOP250</b><span class="top250-more"><a href="/movie/top250">更多</a></span></h3>
          <div class="top250-item" v-for="(item, index) in movie_top250">
              {{index + 1}}.
              <span class="title">&nbsp;&nbsp;
                <a target="_blank" :href="getMovieDetail(item.id)">{{item.title}}</a>
              </span>
              <span class="stars">{{item.average}}</span>
            </div>
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
        active: "热门",
        count: 10,
        movie_in_theaters:[],
        movie_coming_soon:[],
        movie_new:[],
        movie_weekly:[],
        movie_top250:[],
        movie_us_box:[],
        movie_cn_box:[],
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
        // tool function
        getCurrDate() {
            let date = new Date();
            let seperator1 = "-";
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            return month + seperator1 + strDate;
        },
        getStars(stars) {
          return stars + "";
        },
        gotoMovieDetail(id) {
          return "/movie/subject/" + id;
        },
        getClass(index) {
          if (this.checkMedia()) {
            // phone
            if (index % 3 === 0) {
              return "movie-item" + " first";
            } else if (index % 3 === 2) {
              return "movie-item" + " last";
            }
            return "movie-item";
          } else {
            // web browser
            if (index % 5 === 0) {
              return "movie-item" + " first";
            } else if (index % 5 === 4) {
              return "movie-item" + " last";
            }
            return "movie-item";
          }
        },
        getStyle(domain, num) {
          let page = {};
          if (domain === 'IN_THEATERS') {
            page = this.in_theaters_page;
          } else if (domain === 'COMING_SOON') {
            page = this.coming_soon_page;
          } else if (domain === 'NEW_MOVIES') {
            page = this.new_page;
          }

          if (page.page === num) {
            return "background: #9b9a8e;";
          }
          return "background: #cccccc;";
        },
        handleInTheaters(type) {
          if (type === 'prev') {
            if (this.in_theaters_page.page === 1) {
              this.in_theaters_page.page = Math.ceil(this.in_theaters_page.total / this.in_theaters_page.count);
            } else {
              this.in_theaters_page.page = this.in_theaters_page.page - 1;
            }
          } else if (type === 'next') {
            if (this.in_theaters_page.page === Math.ceil(this.in_theaters_page.total / this.in_theaters_page.count)) {
              this.in_theaters_page.page = 1;
            } else {
              this.in_theaters_page.page = this.in_theaters_page.page + 1;
            }
          } else if(!isNaN(type)) {
            this.in_theaters_page.page = type;
          } else {
            return;
          }

          let movie_in_theaters = [];
          let start = (this.in_theaters_page.page - 1) * this.in_theaters_page.count;
          for (let j = 0; j < this.in_theaters_page.count && start < this.movie_data["IN_THEATERS"].length; start++, j++) {
            movie_in_theaters.push(this.movie_data["IN_THEATERS"][start]);
          }
          this.movie_in_theaters = movie_in_theaters;
        },
        handleComingSoon(type) {
          if (type === 'prev') {
            if (this.coming_soon_page.page === 1) {
              this.coming_soon_page.page = Math.ceil(this.coming_soon_page.total / this.coming_soon_page.count);
            } else {
              this.coming_soon_page.page = this.coming_soon_page.page - 1;
            }
          } else if (type === 'next') {
            if (this.coming_soon_page.page === Math.ceil(this.coming_soon_page.total / this.coming_soon_page.count)) {
              this.coming_soon_page.page = 1;
            } else {
              this.coming_soon_page.page = this.coming_soon_page.page + 1;
            }
          } else if(!isNaN(type)) {
            this.coming_soon_page.page = type;
          } else {
            return;
          }

          let movie_coming_soon = [];
          let start = (this.coming_soon_page.page - 1) * this.coming_soon_page.count;
          for (let j = 0; j < this.coming_soon_page.count && start < this.movie_data["COMING_SOON"].length; start++, j++) {
            movie_coming_soon.push(this.movie_data["COMING_SOON"][start]);
          }
          this.movie_coming_soon = movie_coming_soon;
        },
        handleNewMovie(type) {
          if (type === 'prev') {
            if (this.new_page.page === 1) {
              this.new_page.page = Math.ceil(this.new_page.total / this.new_page.count);
            } else {
              this.new_page.page = this.new_page.page - 1;
            }
          } else if (type === 'next') {
            if (this.new_page.page === Math.ceil(this.new_page.total / this.new_page.count)) {
              this.new_page.page = 1;
            } else {
              this.new_page.page = this.new_page.page + 1;
            }
          } else if(!isNaN(type)) {
            this.new_page.page = type;
          } else {
            return;
          }

          let movie_new = [];
          let start = (this.new_page.page - 1) * this.new_page.count;
          for (let j = 0; j < this.new_page.count && start < this.movie_data["NEW_MOVIES"].length; start++, j++) {
            movie_new.push(this.movie_data["NEW_MOVIES"][start]);
          }
          this.movie_new = movie_new;
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

            let movies = data.body.data;
            this.movie_data[type] = movies;
            for (let i = 0; i < count; i++) {
              if (i === movies.length) {
                return;
              }
              if (type === "IN_THEATERS") {
                this.movie_in_theaters.push(movies[i]);
                this.in_theaters_page.page = 1;
                this.in_theaters_page.count = count;
                this.in_theaters_page.total = movies.length;
              } else if (type === "COMING_SOON") {
                this.movie_coming_soon[i] = movies[i];
                this.coming_soon_page.page = 1;
                this.coming_soon_page.count = count;
                this.coming_soon_page.total = movies.length;
              } else if (type === "NEW_MOVIES") {
                this.movie_new[i] = movies[i];
                this.new_page.page = 1;
                this.new_page.count = count;
                this.new_page.total = movies.length;
              } else if (type === "WEEKLY" && i < movies.length) {
                this.movie_weekly[i] = movies[i];
              } else if (type === "US_BOX" && i < movies.length) {
                this.movie_us_box[i] = movies[i];
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
        getMovieBox() {
          this.$http.get(MOVIE_URL + "box", {
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.movie_cn_box = data.body.data;
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
          return "/movie/subject/" + id;
        },
        gotoTag(id) {
          return "/book/tag/" + id;
        },
        checkMedia() {
          return window.matchMedia('(max-width:600px)').matches;
        },
        getByTagName(tagName) {
          this.active = tagName;
          this.$http.get(MOVIE_URL + "tag/" + tagName, {
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }
            if (this.movie_data["IN_THEATERS"]) {
              this.movie_data["IN_THEATERS"].splice(0);
            }
            this.movie_in_theaters.splice(0);
            let count = this.count;
            let movies = data.body.data;
            this.movie_data["IN_THEATERS"] = movies;
            for (let i = 0; i < count; i++) {
              if (i === movies.length) {
                return;
              }
              this.movie_in_theaters.push(movies[i]);
              this.in_theaters_page.page = 1;
              this.in_theaters_page.count = count;
              this.in_theaters_page.total = movies.length;
            }
          });
        }
      },
      created() {
        if (this.checkMedia()) {
          this.count = 6;
        }
        // this.getMovieList("IN_THEATERS", 1, count);
        this.getByTagName("热门", this.count);
        this.getMovieList("COMING_SOON", 1, this.count);
        this.getMovieList("NEW_MOVIES", 1, this.count);
        // this.getMovieList("WEEKLY", 1, 12);
        // this.getMovieList("US_BOX", 1, 12);
        this.getMovieBox();
        this.getMovieTop250();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/movies'
</style>
