<template>
    <div :style="getAnnualStyle(item)">
        <header class="annual-header" v-if="album">
            <div class="header-logo">
                <a class="index" href="/"><p>W<em>ithyou</em></p></a>
            </div>
            <div class="header-title">
                电影片单
            </div>
            <div class="header-annual-menu" v-show="show_nav">
                <div :class="getMenuClass(index)" v-for="(item, index) in body" :key="item.id">
                    <a @click="gotoAnchor(index + 1)" v-if="item.kind_str === 'top10' || item.kind_str === 'top5'">
                        <b v-if="cursor === (index + 1)">> </b>{{item.payloads.title}}
                    </a>
                    <a @click="gotoAnchor(index + 1)" v-else-if="item.kind_str === 'dialogue'">
                        <b v-if="cursor === (index + 1)">> </b>台词 - 《{{item.subject.title}}》
                    </a>
                </div>
            </div>
        </header>
        <div :class="getAnnualBodyClass(item.kind_str)">
            <div class="annual-preview" v-if="item.kind_str === 'top10' || item.kind_str === 'top5'">
                <div :style="getPreviewStyle(item)" class="annual-preview-body">
                    <div class="annual-name">
                        {{item.payloads.title}}
                    </div>
                    <div class="movie-info">
                        <div class="movie-info-top">
                            <div class="movie-image">
                                <a target="_blank" :href="getMovieDetail(item.subjects[0].id)">
                                    <img class="preview-badge" src="/static/icon/annual_badge.png" alt="badge">
                                    <span class="preview-no">1</span>
                                    <img class="preview-image" :src="item.subjects[0].image_url"
                                         alt="item.subjects[0].title">
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
                            {{item.payloads.description}}
                        </div>
                    </div>
                </div>
            </div>
            <ul class="annual-item-list" v-if="item.kind_str === 'top10' || item.kind_str === 'top5'">
                <li @click="gotoMovieDetail(movie.id)" class="annual-movie-item" v-for="(movie, index2) in item.subjects"
                    v-if="index2 >= 1" :key="movie.id">
                    <div class="movie-item-image">
                        <img class="preview-image" :src="movie.image_url" :alt="movie.title">
                        <img class="preview-badge" src="/static/icon/annual_badge.png" alt="badge">
                        <span class="preview-no">{{index2 + 1}}</span>
                    </div>
                    <div class="movie-info">
                        {{getMovieTitle(movie.title)}}
                        <span class="movie-rate">{{movie.average}}</span>
                    </div>
                </li>
            </ul>
            <div class="annual-dialogue" v-if="item.kind_str === 'dialogue'">
                <p class="text">
                    {{item.payloads.text}}
                    <a :href="getMovieDetail(item.subject.id)">--《{{item.subject.title}}》</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import movie_bg from "../../../static/image/movie_bg.png";

    const MOVIE_ANNUAL_URL = global_.URLS.MOVIE_ANNUAL_URL;
    export default {
        name: "MovieAnnualItem",
        props: ["item"],
        data() {
            return {
                browserHeight: 0,
                cursor: 1,
                page: {
                    page: 1,
                    count: 100,
                    total: 0
                },
                body: [],
                year: "",
                show_next: true,
                show_previous: false,
                i: 0,
                active_next_scroll: true,
                active_pre_scroll: true,
                offset_top: 0,
                show_nav: false,
                album: false,
                default_movie_bg: movie_bg
            };
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true);
        },
        methods: {
            closeNav() {
                alert("Hello David!");
            },
            getPreviewStyle(annual) {
                let style = "";
                if (annual.payloads.background_color) {
                    style = "background-color: " + annual.payloads.background_color + ";";
                } else {
                    style = "background-color: rgba(114, 63, 50, 0.85);";
                }
                return style;
            },
            getParentStyle() {
                return "height: " + this.browserHeight + "px;";
            },
            getMovieTitle(title) {
                if (title.length > 8) {
                    return title.substr(title, 8, title.length - 1) + "...";
                }
                return title;
            },
            gotoAnchor(index) {
                this.cursor = index;
                let selector = '#anchor' + this.cursor;
                let anchor = this.$el.querySelector(selector);
                document.documentElement.scrollTop = anchor.offsetTop;
                this.offset_top = anchor.offsetTop;
                this.calcArrows();
            },
            getMenuClass(index) {
                let clazz = "menu-item";
                if (this.cursor === (index + 1)) {
                    clazz += " active-menu-item";
                }
                return clazz;
            },
            showNav() {
                this.show_nav = !this.show_nav;
            },
            handleScroll() {
                let anchor = this.$el.querySelector('#anchor' + this.cursor);
                document.documentElement.scrollTop = anchor.offsetTop;
            },
            gotoMovieDetail(id) {
                let router = this.$router.resolve({path: '/movie/subject/' + id});
                window.open(router.href, '_blank');
            },
            getAnnualBodyClass(kind_str) {
                if (kind_str === "top10" || kind_str === "top5") {
                    return "annual-item-body";
                } else if (kind_str === "dialogue") {
                    return "annual-item-dialogue";
                }
            },
            getMovieDetail(id) {
                return "/movie/subject/" + id;
            },
            calcArrows() { // 计算上下箭头
                if (this.body.length > 1) {
                    if (this.cursor === 1) {
                        this.show_previous = false;
                        this.show_next = true;
                    } else if (this.cursor > 1 && this.cursor < this.body.length) {
                        this.show_next = true;
                        this.show_previous = true;
                    } else {
                        this.show_next = false;
                        this.show_previous = true;
                    }
                } else {
                    this.show_previous = false;
                    this.show_next = false;
                }
            },
            getStars(stars) {
                return stars / 2;
            },
            gotoPre(index) {
                if (index !== 0) {
                    let selector = '#anchor' + index;
                    let anchor = this.$el.querySelector(selector);
                    document.documentElement.scrollTop = anchor.offsetTop;
                    this.cursor = index;
                    this.offset_top = anchor.offsetTop;
                }
                this.calcArrows();
            },
            gotoNext(index) {
                let selector = '#anchor' + index;
                let anchor = this.$el.querySelector(selector);
                this.cursor = index;
                this.offset_top = anchor.offsetTop;
                document.documentElement.scrollTop = anchor.offsetTop;
                this.calcArrows();
            },
            getAnnualStyle(item) {
                if (!this.album) {
                    return "";
                }
                let background_img = item.payloads.background_img;
                if (this.checkMedia()) {
                    background_img = item.payloads.mobile_background_img;
                }
                if (background_img) {
                    return "height:" + this.browserHeight + "px ; background: #FFF url('" + background_img + "') no-repeat; background-size: 100% " + this.browserHeight + "px";
                } else {
                    return "height:" + this.browserHeight + "px ; background: #FFF url('/static/image/default_movie_bg.jpeg') no-repeat; background-size: 100% " + this.browserHeight + "px";
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
                }).then(data => {
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
            initData() {
                if (this.item) {
                    return;
                }
                this.item = {
                    "year": 2018,
                    "kind": 1,
                    "kind_cn": "Top 10",
                    "kind_str": "top10",
                    "create_time": 1545529237,
                    "update_time": 1545529237,
                    "subjects": [
                        {
                            "average": 7.9,
                            "title": "伯德小姐",
                            "image_url": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2505925363.jpg",
                            "id": "26588314"
                        },
                        {
                            "average": 7.3,
                            "title": "死侍2：我爱我家",
                            "image_url": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2545479945.jpg",
                            "id": "26588308"
                        },
                        {
                            "average": 8.4,
                            "title": "血观音",
                            "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561016941.jpg",
                            "id": "27113517"
                        },
                        {
                            "average": 8.7,
                            "title": "大佛普拉斯",
                            "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505928032.jpg",
                            "id": "27059130"
                        },
                        {
                            "average": 7.8,
                            "title": "与神同行：罪与罚",
                            "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2500130777.jpg",
                            "id": "11584016"
                        },
                        {
                            "average": 8.0,
                            "title": "燃烧",
                            "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2520095279.jpg",
                            "id": "26842702"
                        },
                        {
                            "average": 6.7,
                            "title": "瞒天过海：美人计",
                            "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2508259902.jpg",
                            "id": "26654269"
                        },
                        {
                            "average": 6.2,
                            "title": "昆池岩",
                            "image_url": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2513360824.jpg",
                            "id": "26945085"
                        },
                        {
                            "average": 8.3,
                            "title": "爱你，西蒙",
                            "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2523592367.jpg",
                            "id": "26654498"
                        },
                        {
                            "average": 7.9,
                            "title": "解除好友2：暗网",
                            "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2528012421.jpg",
                            "id": "26725678"
                        }
                    ],
                    "payloads": {
                        // "background_color": "rgba(121, 92, 78, .8)",
                        // "background_img": "https://img3.doubanio.com/view/activity_page/raw/public/p3715.jpg",
                        "description": "也曾经想成为看起来很酷的人，最后还是想做回自己。",
                        "title": "2018最受关注的非院线电影",
                    },
                    "id": "777"
                };
                this.album = true;
                this.setBodyBackground(this.item);
            },
            setBodyBackground (item) {
                if (item && item.payloads && item.payloads.background_img) {
                    document.body.style.backgroundImage = "url(" + item.payloads.background_img + ")";
                } else {
                    document.body.style.background = "#ffffff url(" + this.default_movie_bg + ") no-repeat ";
                }
                document.body.style.backgroundSize = "cover";
            }
        },
        created() {
            this.initData();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/movieAnnualItem';
</style>
