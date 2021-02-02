<template>
    <div id="movies">
        <div class="left">
            <div class="in-theaters">
                <h2><b>即将上映</b></h2>
                <div class="page-btn-dot" v-if="movie_coming_soon && movie_coming_soon.length > 0 && !checkMedia()">
                    <div class="item" :style="getStyle('COMING_SOON', index)" @click="handleComingSoon(index)"
                         v-for="index in Math.ceil(coming_soon_page.total / coming_soon_page.count)"></div>
                </div>
                <div class="page-btn" v-if="movie_coming_soon && movie_coming_soon.length > 0">
                    <a href="javascript:void(0);" @click="handleComingSoon('prev')" class="prev">‹</a>
                    <a href="javascript:void(0);" @click="handleComingSoon('next')" class="next">›</a>
                </div>
                <ul class="in-theaters-body" v-if="movie_coming_soon && movie_coming_soon.length > 0">
                    <li :class="getClass(index)" v-for="(item, index) in movie_coming_soon" :key="item.movie_id"
                        v-if="item">
                        <div class="cover">
                            <a target="_blank" :href="gotoMovieDetail(item.movie_id)">
                                <img :src="item.image_url"/>
                            </a>
                        </div>
                        <div class="info">
                            <div class="movie-title"><a :href="gotoMovieDetail(item.movie_id)">{{item.title}}</a></div>
                            <div class="movie-rate"><span><b>{{item.release_date}}</b></span></div>
                            <div class="movie-rate"><span>想看:<b>{{item.wanted_count}}</b></span></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="in-theaters">
                <h2><b>最新热门电影</b></h2>
                <div class="movie-tag">
                    <label
                        v-bind:style="active==='热门' ? 'color:#111' : 'color:#9B9B9B'"
                        class="movie-tag-label" @click="getByTagName('热门', 'MOVIE')">热门</label>
                    <label v-bind:style="active==='最新' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('最新', 'MOVIE')">最新</label>
                    <label v-bind:style="active==='豆瓣高分' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('豆瓣高分', 'MOVIE')">豆瓣高分</label>
                    <label v-bind:style="active==='冷门佳片' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('冷门佳片', 'MOVIE')">冷门佳片</label>
                    <label v-bind:style="active==='华语' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('华语', 'MOVIE')">华语</label>
                    <label v-bind:style="active==='欧美' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('欧美', 'MOVIE')">欧美</label>
                    <label v-bind:style="active==='韩国' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('韩国', 'MOVIE')">韩国</label>
                    <label v-bind:style="active==='日本' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('日本', 'MOVIE')">日本</label>
                </div>
                <div class="page-btn-dot" v-if="!checkMedia()">
                    <div class="item" :style="getStyle('IN_THEATERS', index)" @click="handleInTheaters(index)"
                         v-for="index in Math.ceil(in_theaters_page.total / in_theaters_page.count)"></div>
                </div>
                <div class="page-btn">
                    <a href="javascript:void(0);" @click="handleInTheaters('prev')" class="prev">‹</a>
                    <a href="javascript:void(0);" @click="handleInTheaters('next')" class="next">›</a>
                </div>
                <ul class="in-theaters-body">
                    <li :class="getClass(index)" v-for="(item, index) in movie_in_theaters" :key="item.id">
                        <div class="cover">
                            <a target="_blank" :href="gotoMovieDetail(item.id)">
                                <img :src="item.image_url" :alt="item.title"/>
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
            <div class="in-theaters">
                <h2><b>最新热门电视剧</b></h2>
                <div class="movie-tag">
                    <label
                        v-bind:style="active==='热门' ? 'color:#111' : 'color:#9B9B9B'"
                        class="movie-tag-label" @click="getByTagName('热门', 'TV')">热门</label>
                    <label v-bind:style="active==='国产剧' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('国产剧', 'TV')">国产剧</label>
                    <label v-bind:style="active==='综艺' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('综艺', 'TV')">综艺</label>
                    <label v-bind:style="active==='美剧' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('美剧', 'TV')">美剧</label>
                    <label v-bind:style="active==='日剧' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('日剧', 'TV')">日剧</label>
                    <label v-bind:style="active==='韩剧' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('韩剧', 'TV')">韩剧</label>
                    <label v-bind:style="active==='日本动画' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('日本动画', 'TV')">日本动画</label>
                    <label v-bind:style="active==='纪录片' ? 'color:#111' : 'color:#9B9B9B'"
                           class="movie-tag-label" @click="getByTagName('纪录片', 'TV')">纪录片</label>
                </div>
                <div class="page-btn-dot" v-if="!checkMedia()">
                    <div class="item" :style="getStyle('LATEST_TV', index)" @click="handleTv(index)"
                         v-for="index in Math.ceil(tv_page.total / tv_page.count)"></div>
                </div>
                <div class="page-btn">
                    <a href="javascript:void(0);" @click="handleTv('prev')" class="prev">‹</a>
                    <a href="javascript:void(0);" @click="handleTv('next')" class="next">›</a>
                </div>
                <ul class="in-theaters-body">
                    <li :class="getClass(index)" v-for="(item, index) in tv" :key="item.id">
                        <div class="cover">
                            <a target="_blank" :href="gotoMovieDetail(item.id)">
                                <img :src="item.image_url" :alt="item.title"/>
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
                    <div class="item" :style="getStyle('NEW_MOVIES', index)" @click="handleNewMovie(index)"
                         v-for="index in Math.ceil(new_page.total / new_page.count)"></div>
                </div>
                <div class="page-btn">
                    <a href="javascript:void(0);" @click="handleNewMovie('prev')" class="prev">‹</a>
                    <a href="javascript:void(0);" @click="handleNewMovie('next')" class="next">›</a>
                </div>
                <ul class="new-movies-body">
                    <li :class="getClass(index)" v-for="(item, index) in movie_new" :key="item.id">
                        <div class="cover">
                            <a target="_blank" :href="gotoMovieDetail(item.id)">
                                <img :src="item.image_url" :alt="item.title"/>
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
              <span class="title">
                <a class="title" target="_blank" :href="gotoMovieDetail(item.movie_id)" v-if="item.movie_id">{{index + 1}}.&nbsp;&nbsp;{{item.movie_name}}</a>
                <a class="title" v-else>{{index + 1}}.&nbsp;&nbsp;{{item.movie_name}}</a>
              </span>
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
<!--            <div class="top250">-->
<!--                <h3><b>电影TOP250</b><span class="top250-more"><a href="/movie/top250">更多</a></span></h3>-->
<!--                <div class="top250-item" v-for="(item, index) in movie_top250">-->
<!--                    {{index + 1}}.-->
<!--                    <span class="title">&nbsp;&nbsp;-->
<!--                <a target="_blank" :href="getMovieDetail(item.id)">{{item.title}}</a>-->
<!--              </span>-->
<!--                    <span class="stars">{{item.average}}</span>-->
<!--                </div>-->
<!--            </div>-->
            <div class="top250">
                <h3><b>电影TOP250</b>
                    <span class="random-more"><a @click="randomMore()">换一批</a></span>
                    <span class="top250-more"><a target="_blank" href="/movie/top250">全部</a></span>
                </h3>
                <div class="top250-item" v-for="(item, index) in movie_top250">
                    <div class="movie-img">
                        <a href=""><img :src="item.image_url" :alt="item.title" /></a>
                    </div>
                    <span class="title" :title="item.title">
                       <a target="_blank" :href="getMovieDetail(item.id)">{{item.title}}</a>
                    </span>
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
                movie_in_theaters: [],
                movie_coming_soon: [],
                movie_coming: [],
                movie_new: [],
                movie_weekly: [],
                movie_top250: [],
                movie_top250_uuid: null,
                movie_us_box: [],
                movie_cn_box: [],
                tv: [],
                tv_page: {
                    total: 0,
                    page: 1,
                    count: 10
                },
                coming_soon_page: {
                    total: 0,
                    page: 1,
                    count: 10
                },
                in_theaters_page: {
                    total: 0,
                    page: 1,
                    count: 10
                },
                new_page: {
                    total: 0,
                    page: 1,
                    count: 10
                },
                movie_data: {}
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
                } else if (domain === 'LATEST_TV') {
                    page = this.tv_page;
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
                } else if (!isNaN(type)) {
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
                } else if (!isNaN(type)) {
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
            handleTv(type) {
                if (type === 'prev') {
                    if (this.tv_page.page === 1) {
                        this.tv_page.page = Math.ceil(this.tv_page.total / this.tv_page.count);
                    } else {
                        this.tv_page.page = this.tv_page.page - 1;
                    }
                } else if (type === 'next') {
                    if (this.tv_page.page === Math.ceil(this.tv_page.total / this.tv_page.count)) {
                        this.tv_page.page = 1;
                    } else {
                        this.tv_page.page = this.tv_page.page + 1;
                    }
                } else if (!isNaN(type)) {
                    this.tv_page.page = type;
                } else {
                    return;
                }

                let tv = [];
                let start = (this.tv_page.page - 1) * this.tv_page.count;
                for (let j = 0; j < this.tv_page.count && start < this.movie_data["LATEST_TV"].length; start++, j++) {
                    tv.push(this.movie_data["LATEST_TV"][start]);
                }
                this.tv = tv;
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
                } else if (!isNaN(type)) {
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
                }).then((data) => {
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
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.movie_top250 = data.body.data.body;
                });
            },
            getMovieRandomTop250() {
                if (!this.movie_top250_uuid) {
                    let uuid = sessionStorage.getItem("movie_random_top250_uuid");
                    if (!uuid) {
                        uuid = this.getUuid();
                        sessionStorage.setItem("movie_random_top250_uuid", uuid);
                    }
                    this.movie_top250_uuid = uuid;
                }
                this.$http.get(MOVIE_URL + "random/top250", {
                    params: {
                        count: 9,
                        uuid: this.movie_top250_uuid
                    },
                    headers: {
                        "bid": global_.FUNC.getBid()
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.movie_top250 = data.body.data;
                });
            },
            randomMore() {
                this.getMovieRandomTop250();
            },
            getMovieBox() {
                this.$http.get(MOVIE_URL + "box", {
                    headers: {
                        "bid": global_.FUNC.getBid()
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.movie_cn_box = data.body.data;
                });
            },
            getUuid() {
                let s = [];
                let hexDigits = "0123456789abcdef";
                for (let i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";
                return s.join("");
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
            getByTagName(tagName, type) {
                this.active = tagName;
                this.$http.get(MOVIE_URL + "tag/" + tagName, {
                    params: {
                        "type": type
                    },
                    headers: {
                        "bid": global_.FUNC.getBid()
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }
                    if (type === 'MOVIE') {
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
                    } else {
                        if (this.movie_data["LATEST_TV"]) {
                            this.movie_data["LATEST_TV"].splice(0);
                        }
                        this.tv.splice(0);
                        let count = this.count;
                        let movies = data.body.data;
                        this.movie_data["LATEST_TV"] = movies;
                        for (let i = 0; i < count; i++) {
                            if (i === movies.length) {
                                return;
                            }
                            this.tv.push(movies[i]);
                            this.tv_page.page = 1;
                            this.tv_page.count = count;
                            this.tv_page.total = movies.length;
                        }
                    }
                });
            },
            getMovieComing(count) {
                this.$http.get(MOVIE_URL + "coming", {
                    headers: {
                        "bid": global_.FUNC.getBid()
                    }
                }).then((data) => {
                    let movies = data.body.data;
                    if (movies.length === 0) {
                        return;
                    }
                    this.movie_data["COMING_SOON"] = movies;
                    for (let i = 0; i < count; i++) {
                        this.movie_coming_soon[i] = movies[i];
                        this.coming_soon_page.page = 1;
                        this.coming_soon_page.count = count;
                        this.coming_soon_page.total = movies.length;
                    }
                })
            }
        },
        mounted() {
            if (this.checkMedia()) {
                this.count = 6;
            }
            // this.getMovieList("IN_THEATERS", 1, count);
            this.getByTagName("热门", "MOVIE");
            this.getByTagName("热门", "TV");
            // this.getMovieList("COMING_SOON", 1, this.count);
            this.getMovieList("NEW_MOVIES", 1, this.count);
            // this.getMovieList("WEEKLY", 1, 12);
            // this.getMovieList("US_BOX", 1, 12);
            this.getMovieBox();
            // this.getMovieTop250();
            this.getMovieRandomTop250();
            this.getMovieComing(this.count);
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/movies';
</style>
