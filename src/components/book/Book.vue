<template>
    <div id="book">
      <header class="book-header">
        <div class="header-left"></div>
        <div class="header-center">
          <ul class="book-header-nav">
          <li><a href="/book/books">图书</a></li>
          <li><a href="/book/read">阅读</a></li>
          <li><a href="/book/annual/2018">2018年度榜单</a></li>
          <li><a href="/book/annual/2017">2017年度榜单</a></li>
          <li><a href="/book/annual/2016">2016年度榜单</a></li>
        </ul>
        </div>
        <div class="header-right"></div>
      </header>
      <div class="body">
        <router-view></router-view>
      </div>
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
                this.book_express[i] = data.body.data[i];
              } else if (type === "BOOK_GOOD_MARKET") {
                this.good_market_page.total = data.body.data.length;
                this.good_market_page.count = count;
                this.book_good_market[i] = data.body.data[i];
              }
            }
          });
        },
        handleExpress(val) {
          this.book_express = [];
          this.express_page.p = val;
          let start = (val - 1) * this.express_page.count;
          for (let j = 0; j < this.express_page.count && start < this.book_data["BOOK_EXPRESS"].length; start++) {
            this.book_express[j++] = this.book_data["BOOK_EXPRESS"][start];
          }
        },
        handleGoodMarket(val) {
          this.book_good_market = [];
          this.good_market_page.p = val;
          let start = (val - 1) * this.good_market_page.count;
          for (let j = 0; j < this.good_market_page.count && start < this.book_data["BOOK_GOOD_MARKET"].length; start++) {
            this.book_good_market[j++] = this.book_data["BOOK_GOOD_MARKET"][start];
          }
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
      },
      created() {
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/book'
</style>
