<template>
    <div id="movie-annual">
        <header class="annual-header">
            <div class="header-logo">
                <a class="index" href="/"><p>W<em>ithyou</em></p></a>
            </div>
            <div class="header-title">
                豆瓣{{year}}年度榜单电影
            </div>
            <div class="header-annual-menu-btn" @click="showNav()">
          <span>
            <img class="menu-img" src="/static/icon/annual_menu.png"/>
            目录
          </span>
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
        <div class="annual-items">
            <div :id="'anchor' + (index + 1)"
                 class="annual-item"
                 :style="getAnnualStyle(item)"
                 v-for="(item, index) in body"
                 :key="index + 1">
                <MovieAnnualItem :item="item"/>
                <button v-show="show_previous" class="previous" @click="gotoPre((index))">
                    <div class="icon-down"></div>
                </button>
                <button v-show="show_next" class="next" @click="gotoNext((index + 2))">
                    <div class="icon-down"></div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global"
    import MovieAnnualItem from "./MovieAnnualItem"

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
                body: [],
                year: "",
                show_next: true,
                show_previous: false,
                i: 0,
                active_next_scroll: true,
                active_pre_scroll: true,
                offset_top: 0,
                show_nav: false
            };
        },
        components: {
            MovieAnnualItem: MovieAnnualItem
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true);
        },
        methods: {
            closeNav() {
                alert("Hello David!");
            },
            getPreviewStyle(annual) {
                if (annual.payloads.background_color) {
                    return "background-color: " + annual.payloads.background_color + ";";
                } else {
                    return "background-color: rgba(114, 63, 50, 0.85);";
                }
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
                let anchor = this.$el.querySelector('#anchor' + this.cursor)
                document.documentElement.scrollTop = anchor.offsetTop;
                // let selector = '#anchor' + this.cursor;
                // let anchor = this.$el.querySelector(selector)
                //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                //   let scroll = scrollTop - this.i;
                //   this.i = scrollTop;
                //   if (scroll < 0) {
                //     if (this.active_pre_scroll) {
                //       this.active_pre_scroll = false;
                //       this.gotoPre(this.cursor - 1);
                //     } else if (anchor.offsetTop === this.offset_top) {
                //       this.active_pre_scroll = true;
                //     }
                //   } else {
                //     if (this.active_next_scroll) {
                //       this.active_next_scroll = false;
                //       this.gotoNext(this.cursor + 1);
                //     } else if (anchor.offsetTop === this.offset_top) {
                //       this.active_next_scroll = true;
                //     }
                //   }
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
                    let anchor = this.$el.querySelector(selector)
                    document.documentElement.scrollTop = anchor.offsetTop;
                    this.cursor = index;
                    this.offset_top = anchor.offsetTop;
                }

                this.calcArrows();
            },
            gotoNext(index) {
                let selector = '#anchor' + index;
                let anchor = this.$el.querySelector(selector)
                this.cursor = index;
                this.offset_top = anchor.offsetTop;
                document.documentElement.scrollTop = anchor.offsetTop;
                this.calcArrows();
            },
            getAnnualStyle(item) {
                let background_img = item.payloads.background_img;
                if (this.checkMedia()) {
                    background_img = item.payloads.mobile_background_img;
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
