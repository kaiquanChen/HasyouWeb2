<template>
    <div id="book-annual">
        <header class="annual-header">
            <div class="header-logo">
                <a class="index" href="/"><p>W<em>ithyou</em></p></a>
            </div>
            <div class="header-title">
                豆瓣{{year}}年度榜单读书
            </div>
            <div class="header-annual-menu-btn" @click="showNav()">
                <span>
                    <img class="menu-img" src="/static/icon/annual_menu.png"/>目录
                </span>
            </div>
            <div class="header-annual-menu" v-show="show_nav">
                <div :class="getMenuClass(index)" v-for="(item, index) in body" :key="'nav' + item.id">
                    <a @click="gotoAnchor(index + 1)" v-if="item.kind_str === 'top10' || item.kind_str ==='top5'">
                        <b v-if="cursor === (index + 1)">> </b>{{item.payload.title}}
                    </a>
                    <a @click="gotoAnchor(index + 1)" v-else-if="item.kind_str === 'excerpt'">
                        <b v-if="cursor === (index + 1)">> </b>书摘 - 《{{item.subject.name}}》
                    </a>
                </div>
            </div>
        </header>
        <div class="annual-items">
            <div :id="'anchor' + (index + 1)"
                 class="annual-item"
                 :style="getAnnualStyle(item)"
                 v-for="(item, index) in body"
                 v-if="item.kind_str === 'top10' || item.kind_str === 'top5' || item.kind_str === 'excerpt'"
                 :key="index + 1">
                <div :class="getAnnualBodyClass(item.kind_str)">
                    <div class="annual-preview" v-if="item.kind_str === 'top10' || item.kind_str === 'top5'">
                        <div :style="getPreviewStyle(item)" class="annual-preview-body">
                            <div class="annual-name">
                                {{item.payload.title}}
                            </div>
                            <div class="book-info">
                                <div class="book-info-top">
                                    <div class="book-image">
                                        <a target="_blank" :href="getBookDetail(item.subjects[0].id)">
                                            <img class="preview-badge" src="/static/icon/annual_badge.png" alt="badge">
                                            <span class="preview-no">1</span>
                                            <img class="preview-image" :src="item.subjects[0].image_url"
                                                 alt="item.subjects[0].name">
                                        </a>
                                    </div>
                                    <div class="book-info-right">
                                        <div class="book-title">
                                            <a target="_blank" :href="getBookDetail(item.subjects[0].id)">{{item.subjects[0].name}}</a>
                                        </div>
                                        <div class="book-rate">
                                            豆瓣评分<br>
                                            <span class="book-stars">
                            {{item.subjects[0].stars}}
                          </span>
                                            <el-rate
                                                class="primary-rate"
                                                :value="getStars(item.subjects[0].stars)"
                                                disabled
                                                text-color="#ff9900">
                                            </el-rate>
                                        </div>
                                    </div>
                                </div>
                                <div class="book-info-bottom">
                                    {{item.payload.description}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="annual-item-list" v-if="item.kind_str === 'top10' || item.kind_str === 'top5'">
                        <li @click="gotoBookDetail(book.id)" class="annual-book-item"
                            v-for="(book, index2) in item.subjects" v-if="index2 >= 1" :key="book.id + item.id">
                            <div class="book-item-image">
                                <img class="preview-image" :src="book.image_url" :alt="book.name">
                                <img class="preview-badge" src="/static/icon/annual_badge.png" alt="badge">
                                <span class="preview-no">{{index2 + 1}}</span>
                            </div>
                            <div class="book-info">
                                {{getBookName(book.name)}}
                                <span class="book-rate">{{book.stars}}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="annual-excerpt" v-if="item.kind_str === 'excerpt'">
                        <p class="text" v-html="getExcerptContent(item)">
                        </p>
                    </div>
                </div>
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

    const BOOK_ANNUAL_URL = global_.URLS.BOOK_ANNUAL_URL;
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
                show_next: true,
                show_previous: false,
                web: true,
                show_nav: false,
                offset_top: 0,
                year: ""
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true);
        },
        methods: {
            handleScroll() {
                let anchor = this.$el.querySelector('#anchor' + this.cursor)
                document.documentElement.scrollTop = anchor.offsetTop;
            },
            getExcerptContent(item) {
                let content = item.payload.content;
                let name = item.subject.name;
                let id = item.subject.id;
                return content.replace("[", "<span style='border-bottom: 1px solid #3b3128;padding-bottom: 5px;'>")
                        .replace("]", "</span>") + "<a target='_blank' style='color: #3b3128;display:block;text-align: right;' href=" +
                    this.getBookDetail(item.subject.id) + ">—— 《" + name + "》</a> ";
            },
            gotoBookDetail(id) {
                let router = this.$router.resolve({path: '/book/subject/' + id});
                window.open(router.href, '_blank');
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
            gotoAnchor(index) {
                this.cursor = index;
                let selector = '#anchor' + this.cursor;
                let anchor = this.$el.querySelector(selector);
                document.documentElement.scrollTop = anchor.offsetTop;
                this.offset_top = anchor.offsetTop;
                this.calcArrows();
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
            getBookName(name) {
                if (name.length > 8) {
                    return name.substr(name, 8, name.length - 1) + "...";
                }
                return name;
            },
            getStars(stars) {
                return stars / 2;
            },
            getAnnualBodyClass(kind_str) {
                if (kind_str === "top10" || kind_str === "top5") {
                    return "annual-item-body";
                } else if (kind_str === "excerpt") {
                    return "annual-item-excerpt";
                }
            },
            getPreviewStyle(annual) {
                if (annual.payload.background_color) {
                    return "background-color: " + annual.payload.background_color + ";";
                } else {
                    return "background-color: rgba(114, 63, 50, 0.85);";
                }
            },
            getAnnualStyle(item) {
                let background_img = item.payload.background_img;
                if (this.checkMedia()) {
                    background_img = item.payload.mobile_background_img;
                }

                if (background_img) {
                    return "height:" + this.browserHeight + "px ; background: #FFF url('" + background_img + "') no-repeat; background-size: 100% " + this.browserHeight + "px";
                } else {
                    if (item.subject) {
                        background_img = item.subject.image_url;
                    } else if (item.subjects && item.subjects.length > 1) {
                        background_img = item.subjects[0].image_url;
                    } else {
                        background_img = "";
                    }
                    return "height:" + this.browserHeight + "px ; background: #FFF url('" + background_img + "') no-repeat; background-size: 100% " + this.browserHeight + "px";
                }
            },
            showNav() {
                this.show_nav = !this.show_nav;
            },
            getMenuClass(index) {
                let clazz = "menu-item";
                if (this.cursor === (index + 1)) {
                    clazz += " active-menu-item";
                }
                return clazz;
            },
            getAnnualBookList() {
                this.year = this.$route.params.year;
                this.$http.get(BOOK_ANNUAL_URL + this.year, {
                    headers: {
                        bid: global_.FUNC.getBid()
                    },
                    params: {
                        p: this.page.p,
                        count: this.page.count
                    }
                }).then(data => {
                    if (data.body.code !== 200) {
                        this.$message.error("数据获取失败!");
                        return;
                    }

                    this.page.p = data.body.data.page;
                    this.page.count = data.body.data.count;
                    this.page.total = data.body.data.total;
                    this.body = data.body.data.body;
                });
            },
            getBookDetail(id) {
                return "/book/subject/" + id;
            },
            checkMedia() {
                return window.matchMedia('(max-width:600px)').matches;
            },
            handleSelect(index) {
                window.location.href = "#" + index;
            }
        },
        created() {
            this.getAnnualBookList();
            this.browserHeight = global_.FUNC.getBrowserHeight();
        }
    }
</script>

<style lang="scss" scoped>
    @import "./css/bookAnnual";
</style>
