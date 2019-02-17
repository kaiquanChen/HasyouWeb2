<template>
    <div id="books">
        <div class="left"></div>
        <div class="center">
            <div class="center-left">
                <div class="new-book">
                    <h2><b>最新图书</b></h2>
                    <div class="page-btn-dot" v-if="!checkMedia()">
                      <div class="item" :style="getStyle('BOOK_EXPRESS', 1)" @click="handleExpress(1)"></div>
                      <div class="item" :style="getStyle('BOOK_EXPRESS', 2)" @click="handleExpress(2)"></div>
                      <div class="item" :style="getStyle('BOOK_EXPRESS', 3)" @click="handleExpress(3)"></div>
                      <div class="item" :style="getStyle('BOOK_EXPRESS', 4)" @click="handleExpress(4)"></div>
                    </div>
                    <div class="page-btn">
                        <a href="javascript:void(0);" @click="handleExpress('prev')" class="prev">‹</a>
                        <a href="javascript:void(0);" @click="handleExpress('next')" class="next">›</a>
                    </div>
                    <ul class="new-book-body">
                      <li :class="getClass(index)" v-for="(item, index) in book_express" :key="item.id">
                        <div class="cover">
                          <a target="_blank" :href="gotoBookDetail(item.id)"><img :src="item.image_url" /></a>
                        </div>
                        <div class="info">
                          <div class="title"><a :href="gotoBookDetail(item.id)">{{item.name}}</a></div>
                          <div class="author">{{item.authors[0]}}</div>
                        </div>
                      </li>
                    </ul>
                </div>
                <div class="good-market">
                  <h2><b>畅销图书</b></h2>
                  <div class="page-btn-dot" v-if="!checkMedia()">
                    <div class="item" :style="getStyle('GOOD_MARKET', 1)" @click="handleGoodMarket(1)"></div>
                    <div class="item" :style="getStyle('GOOD_MARKET', 2)" @click="handleGoodMarket(2)"></div>
                  </div>
                  <div class="page-btn">
                      <a href="javascript:void(0);" @click="handleGoodMarket('prev')" class="prev">‹</a>
                      <a href="javascript:void(0);" @click="handleGoodMarket('next')" class="next">›</a>
                  </div>
                  <ul class="good-market-body">
                    <li :class="getClass(index)" v-for="(item, index) in book_good_market" :key="item.id">
                      <div class="cover">
                        <a target="_blank" :href="gotoBookDetail(item.id)"><img :src="item.image_url" /></a>
                      </div>
                      <div class="info">
                        <div class="title"><a target="_blank" :href="gotoBookDetail(item.id)">{{item.name}}</a></div>
                        <div class="author">{{item.authors[0]}}</div>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
            <div class="center-right">
              <div class="top250">
                <h3><b>图书TOP250</b></h3>
                <span class="more-top250"><a href="#">更多»</a></span>
                <div class="top250-item" v-for="(item, index) in book_top250" :key="item.id">
                  <span class="item-body" v-if="index < 10">
                    {{index + 1}}.&emsp;<a :href="gotoBookDetail(item.id)">{{item.name}}</a><br>
                    &emsp;&emsp;<span class="author">{{item.authors[0]}}</span>
                  </span>
                </div>
              </div>
              <div class="hot-tag">
                <h3><b>热门标签</b></h3>
                <span class="more-hot-tag"><a href="#">所有热门标签»</a></span>
                <div class="hot-tag-item" v-for="item in hot_tags" :key="item.id">
                  <span class="item-body">
                    {{item.tag_name}}
                  </span><br>
                  <li class="child" v-for="(child, index) in item.children" :key="child.id">
                    <a href="#" v-if="index < 6">{{child.tag_name}}</a>
                  </li>
                </div>
              </div>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
    import global_ from "../config/Global"
    const BOOK_URL = global_.URLS.BOOK_URL;
    const tag_url = global_.URLS.DOUBAN_BOOK_TAG_URL;
    export default {
      name: "book",
      data() {
        return {
          book_express:[],
          book_top250:[],
          book_good_market:[],
          express_page:{
            total:0,
            p:1,
            count:0
          },
          good_market_page:{
            total:0,
            p:1,
            count:10
          },
          hot_tags:[],
          book_data:{}
        };
      },
      methods: {
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
        getClass(index) {
          if ((index + 1) % 5 === 0) {
            return "book-item" + " last";
          } else if (index % 3 === 0) {
            return "book-item" + " first";
          }
          return "book-item";
        },
        getBookList(type, count) {
          this.$http.get(BOOK_URL + type, {
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then((data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.book_data[type] = data.body.data;
            for (let i = 0; i < count; i++) {
              if (type === "BOOK_EXPRESS") {
                this.express_page.total = data.body.data.length;
                this.express_page.count = count;
                this.book_express.push(data.body.data[i]);
              } else if (type === "BOOK_GOOD_MARKET") {
                this.good_market_page.total = data.body.data.length;
                this.good_market_page.count = count;
                this.book_good_market.push(data.body.data[i]);
              }
            }
          });
        },
        handleExpress(type) {
          if (type === 'prev') {
            if (this.express_page.p === 1) {
              this.express_page.p = Math.ceil(this.express_page.total / this.express_page.count);
            } else {
              this.express_page.p = this.express_page.p - 1;
            }
          } else if (type === 'next') {
            if (this.express_page.p === Math.ceil(this.express_page.total / this.express_page.count)) {
              this.express_page.p = 1;
            } else {
              this.express_page.p = this.express_page.p + 1;
            }
          } else if(!isNaN(type)) {
            this.express_page.p = type;
          } else {
            return;
          }

          let book_express = [];
          let start = (this.express_page.p - 1) * this.express_page.count;
          for (let j = 0; j < this.express_page.count && start < this.book_data["BOOK_EXPRESS"].length; start++, j++) {
            book_express.push(this.book_data["BOOK_EXPRESS"][start]);
          }
          this.book_express = book_express;
        },
        handleGoodMarket(type) {
          if (type === 'prev') {
            if (this.good_market_page.p === 1) {
              this.good_market_page.p = Math.ceil(this.good_market_page.total / this.good_market_page.count)
            } else {
              this.good_market_page.p = this.good_market_page.p - 1;
            }
          } else if (type === 'next') {
            if (this.good_market_page.p === Math.ceil(this.good_market_page.total / this.good_market_page.count)) {
              this.good_market_page.p = 1;
            } else {
              this.good_market_page.p = this.good_market_page.p + 1;
            }
          } else if(!isNaN(type)) {
            this.good_market_page.p = type;
          } else {
            return;
          }

          let good_market = [];
          let start = (this.good_market_page.p - 1) * this.good_market_page.count;
          for (let j = 0; j < this.express_page.count && start < this.book_data["BOOK_GOOD_MARKET"].length; start++, j++) {
            good_market.push(this.book_data["BOOK_GOOD_MARKET"][start]);
          }
          this.book_good_market = good_market;
        },
        getBookDetail(id) {
          return "subject/" + id;
        },
        gotoTag(id) {
          return "/book/tag/" + id;
        },
        checkMedia() {
          return window.matchMedia('(max-width:415px)').matches;
        },
        getHotTags() {
          this.$http.get(tag_url + "subjects/DOUBAN_BOOK", {
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then( (data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.hot_tags = data.body.data;
          });
        },
        getBookTop250() {
          this.$http.get(BOOK_URL + "subjects/top250", {
            params: {
              p: 1,
              count: 10
            },
            headers: {
              "bid":global_.FUNC.getBid()
            }
          }).then((data) => {
            this.book_top250 = data.body.data.body;
          });
        },
        gotoBookDetail(id) {
          return "/book/" + id;
        }
      },
      created() {
        let count = 10;
        if (this.checkMedia()) {
          count = 6;
        }
        this.getBookList("BOOK_EXPRESS", count);
        this.getBookList("BOOK_GOOD_MARKET", count);
        this.getHotTags();
        this.getBookTop250();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/books'
</style>