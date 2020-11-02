<template>
    <div :style="getAlbumStyle(item)">
        <header class="annual-header" v-if="album">
            <div class="header-logo">
                <a class="index" href="/"><p>W<em>ithyou</em></p></a>
            </div>
            <div class="header-title">
                电影片单
            </div>
        </header>
        <div :class="getAlbumBodyClass()">
            <div class="annual-preview">
                <div :style="getPreviewStyle(item)" class="annual-preview-body">
                    <div class="annual-name">
                        {{item.name}}
                    </div>
                    <div class="movie-info">
                        <div class="movie-info-top">
                            <div class="movie-image">
                                <a target="_blank" :href="getMovieDetail(item.items[0].id)">
                                    <img class="preview-badge" src="/static/icon/annual_badge.png" alt="badge">
                                    <span class="preview-no">1</span>
                                    <img class="preview-image" :src="item.items[0].image_url"
                                         alt="item.subjects[0].title">
                                </a>
                            </div>
                            <div class="movie-info-right">
                                <div class="movie-title">
                                    <a target="_blank" :href="getMovieDetail(item.items[0].id)">{{item.items[0].title}}</a>
                                </div>
                                <div class="movie-rate">
                                    豆瓣评分<br>
                                    <span class="movie-stars">
                    {{item.subjects[0].average}}
                  </span>
                                    <el-rate
                                        class="primary-rate"
                                        :value="getStars(item.items[0].average)"
                                        disabled
                                        text-color="#ff9900">
                                    </el-rate>
                                </div>
                            </div>
                        </div>
                        <div class="movie-info-bottom">
                            {{item.description}}
                        </div>
                    </div>
                </div>
            </div>
            <ul class="annual-item-list">
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
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import movie_bg from "../../../static/image/movie_bg.png";

    const MOVIE_ANNUAL_URL = global_.URLS.MOVIE_ANNUAL_URL;

    export default {
        name: "MovieAlbumDetail",
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
        methods: {
            getPreviewStyle(annual) {
                let style = "";
                if (annual.background_color) {
                    style = "background-color: " + annual.background_color + ";";
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
            getMenuClass(index) {
                let clazz = "menu-item";
                if (this.cursor === (index + 1)) {
                    clazz += " active-menu-item";
                }
                return clazz;
            },
            gotoMovieDetail(id) {
                let router = this.$router.resolve({path: '/movie/subject/' + id});
                window.open(router.href, '_blank');
            },
            getAlbumBodyClass() {
                return "annual-item-body";
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
            getAlbumStyle(item) {
                if (!this.album) {
                    return "";
                }
                let background_img = item.background_img;
                if (this.checkMedia()) {
                    background_img = item.mobile_background_img;
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
            getMovieAlbum() {
                // this.year = this.$route.params.year;
                // this.$http.get(MOVIE_ANNUAL_URL + this.year, {
                //     headers: {
                //         bid: global_.FUNC.getBid()
                //     },
                //     params: {
                //         p: this.page.page,
                //         count: this.page.count
                //     }
                // }).then(data => {
                //     if (data.body.code !== 200) {
                //         this.$message.error("数据获取失败!");
                //         return;
                //     }
                //
                //     this.page.page = data.body.data.page;
                //     this.page.count = data.body.data.count;
                //     this.page.total = data.body.data.total;
                //
                //     let annuals = this.body;
                //     data.body.data.body.map((item, key) => {
                //         annuals.push(item);
                //     });
                //     this.body = annuals;
                // });
            },
            initData() {
                if (this.item) {
                    return;
                }
                this.item = {
                    "id": "1",
                    "name": "2018最受关注的非院线电影",
                    "description": "也曾经想成为看起来很酷的人，最后还是想做回自己。",
                    "background_img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2505925363.jpg",
                    "create_time": "1 月前",
                    "update_time": "3 天前",
                    "items": [
                        {
                            "average": 7.9,
                            "title": "伯德小姐",
                            "image_url": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2505925363.jpg",
                            "subject_Id": "26588314"
                        },
                        {
                            "average": 7.3,
                            "title": "死侍2：我爱我家",
                            "image_url": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2545479945.jpg",
                            "subject_Id": "26588308"
                        },
                        {
                            "average": 8.4,
                            "title": "血观音",
                            "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561016941.jpg",
                            "subject_Id": "27113517"
                        },
                        {
                            "average": 8.7,
                            "title": "大佛普拉斯",
                            "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2505928032.jpg",
                            "subject_Id": "27059130"
                        },
                        {
                            "average": 7.8,
                            "title": "与神同行：罪与罚",
                            "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2500130777.jpg",
                            "subject_Id": "11584016"
                        }
                    ]
                };
                this.album = true;
                this.setBodyBackground(this.item);
            },
            setBodyBackground (item) {
                if (item && item.background_img) {
                    document.body.style.backgroundImage = "url(" + item.background_img + ")";
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
    @import './css/movieAlbumDetail';
</style>
