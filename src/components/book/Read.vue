<template>
    <div id="read">
        <div class="left"></div>
        <div class="center">
            <div class="qingnian">
                <h2 class="title">青年文摘</h2>
                
            </div>
            <div class="douban-moment">
                <h2 class="title">豆瓣时刻</h2>
                <div class="moment-items" v-masonry origin-left="true" fit-width="true" transition-duration="1s" item-selector=".item">
                    <div v-masonry-tile class="moment-item item" v-for="item in moments" :key="item.id" @click="gotoDetail(item.id)">
                        <h3 class="moment-title">{{item.title}}</h3>
                        <p class="moment-content">{{item.summary}}</p>
                        <ul class="moment-images" v-if="item.image && item.image.length > 1 ">
                            <li class="image-item" v-for="(image, index) in item.image" 
                                v-if="index < 3" :key="image.id">
                                <img :src="image" :alt="image">
                            </li>
                        </ul>
                        <div class="moment-info">
                            <span class="creator-avatar" v-if="item.user">
                                <img :src="item.user.avatar" :alt="item.user.name">
                            </span>
                            <span class="creator-name" v-if="item.user">{{item.user.name}}</span>
                            <span class="creator-avatar" v-if="!item.user">
                                <img src="/static/image/user_anon.jpeg">
                            </span>
                            <span class="creator-name" v-if="!item.user">匿名</span>
                            <span class="create-time">{{getDate(item.publish_time)}}</span>
                            <span class="vote">{{item.liked_count}}赞</span>
                        </div>
                    </div>
                </div> 
                <!-- <div class="moment-items">
                    <div class="moment-item" v-for="item in moments" :key="item.id" @click="gotoDetail(item.id)">
                        <h3 class="moment-title">{{item.title}}</h3>
                        <p class="moment-content">{{item.summary}}</p>
                        <ul class="moment-images" v-if="item.image && item.image.length > 1 ">
                            <li class="image-item" v-for="(image, index) in item.image" 
                                v-if="index < 3" :key="image.id">
                                <img :src="image" :alt="image">
                            </li>
                        </ul>
                        <div class="moment-info">
                            <span class="creator-avatar" v-if="item.user">
                                <img :src="item.user.avatar" :alt="item.user.name">
                            </span>
                            <span class="creator-name" v-if="item.user">{{item.user.name}}</span>
                            <span class="creator-avatar" v-if="!item.user">
                                <img src="/static/image/user_anon.jpeg">
                            </span>
                            <span class="creator-name" v-if="!item.user">匿名</span>
                            <span class="create-time">{{getDate(item.publish_time)}}</span>
                            <span class="vote">{{item.liked_count}}赞</span>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
  import global_ from "../config/Global"

  const moment_url = global_.URLS.MOMENT_SUBJECTS_URL;
    export default {
      name: "book",
      data() {
        return {
          moments:[],
          page:{
            page: 1,
            count: 10,
            total: 0
          },
          more_message: "点击加载更多",
          load_flag: true,
          loadding: false
        };
      },
      methods: {
        getDate(time) {
            return time.substr(0, 10);
        },
        getMomentList() {
          this.loading = true;
          this.$http.get(moment_url, {
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
              console.log(data);
              return;
            }

            let items = data.body.data.body;
            this.appendItems(items);
            this.page.page = data.body.data.page;
            this.page.count = data.body.data.count;
            this.page.total = data.body.data.total;
            this.loading = false;
          });
        },
        appendItems(items) {
          this.load_flag = true;
          this.message = "点击加载更多!";
          items.map( item => {
            this.moments.push(item);
          });
        },
        gotoDetail(id) {
          window.open("https://www.douban.com/note/" + id, "_blank");
        },
        // todo
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
        gotoBooks() {
          this.$router.push({path: "/book/books"});
        },
      },
      created() {
        this.getMomentList();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/read'
</style>
