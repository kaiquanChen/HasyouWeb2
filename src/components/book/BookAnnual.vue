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
                <div :class="getMenuClass(index)" v-for="(item, index) in body" :key="item.id">
                    <a @click="gotoAnchor(index + 1)" v-if="item.kind_str === 'top10' || item.kind_str ==='top5'">
                        <b v-if="cursor === (index + 1)">> </b>{{item.payload.title}}
                    </a>
                    <a @click="gotoAnchor(index + 1)" v-else-if="item.kind_str === 'excerpt'">
                        <b v-if="cursor === (index + 1)">> </b>书摘 - 《{{item.subject.name}}》
                    </a>
                    <a @click="gotoAnchor(index + 1)" v-else-if="item.kind_str === 'the_fallen'">
                        <b v-if="cursor === (index + 1)">> </b>2018逝者
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
          <div :class="getAnnualBodyClass(item.kind_str)">
            <div class="annual-preview" v-if="item.kind_str === 'top10'">
              <div :style="getPreviewStyle(item)" class="annual-preview-body">
                <div class="annual-name">
                  {{item.payload.title}}
                </div>
                <div class="book-info">
                  <div class="book-info-top">
                    <div class="book-image">
                      <a target="_blank" :href="getBookDetail(item.subjects[0].id)">
                        <img class="preview-badge" src="/static/icon/annual_badge.png" alt="badge">
                        <span class="preview-no">{{index + 1}}</span>
                        <img class="preview-image" :src="item.subjects[0].image_url" alt="item.subjects[0].name">
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
            <ul class="annual-item-list" v-if="item.kind_str === 'top10'">
              <li @click="gotoBookDetail(book.id)" class="annual-book-item" v-for="(book, index2) in item.subjects" v-if="index2 >= 1" :key="movie.id">
                <div class="movie-item-image">
                  <img class="preview-image" :src="book.image_url" :alt="book.name">
                  <img class="preview-badge" src="/static/icon/annual_badge.png" alt="badge">
                  <span class="preview-no">{{index2 + 1}}</span>
                </div>
                <div class="book-info">
                  {{getBookTitle(book.title)}}
                  <span class="book-rate">{{book.average}}</span>
                </div>
              </li>
            </ul>
            <div class="annual-excerpt" v-if="item.kind_str === 'excerpt'">
              <p class="text">
                {{item.payload.content}}
                <a :href="getBookDetail(item.subject.id)">--《{{item.subject.name}}》</a>
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
                body:[],
                show_next: true,
                show_previous: false,
                web: true,
                show_nav: false,
                year: ""
            }
        },
        methods: {
            getStars(stars) {
                return stars / 2;
            },
            getAnnualBodyClass(kind_str) {
                if (kind_str === "top10" || kind_str === "top5") {
                    return "annual-item-body";
                } else if(kind_str === "excerpt") {
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
                    return "";
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
                }).then( data => {
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
                return window.matchMedia('(max-width:415px)').matches;
            },
            handleSelect(index) {
                window.location.href = "#" + index;
            }
        },
        created() {
        // this.$router.push({path: "/book/books"});
            this.getAnnualBookList();
        }
    }
</script>

<style lang="scss" scoped>
    @import "./css/bookAnnual";
</style>
    