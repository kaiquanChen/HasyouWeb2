<template>
    <div id="album-photo">
      <h1 class="title">我的相册-The Girl</h1>
      <div class="moment-items" v-masonry origin-left="true" fit-width="true" transition-duration="1s" item-selector=".item">
        <div v-masonry-tile class="moment-item item" v-for="item in photos">
          <el-card>
              <img class="image-item" :src="item.file_url" alt="你好">
              <div class="desc" style="padding: 8px 0 5px 8px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">{{ getDate(item.create_time) }}</time><br>
                </div>
              </div>
          </el-card>
        </div>
      </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";

    const photo_url = global_.URLS.USER_PHOTO_URL;
    const token = sessionStorage.getItem("access_token");
    export default {
      name: "book",
      data() {
        return {
          album:{},
          photos:[],
          page: {
            page: 1,
            count: 18,
            total: 0
          },
          active: true
        };
      },
      mounted () {
        window.addEventListener('scroll', this.handleScroll, true);
      },
      methods: {
        getScrollHeight() {
          let bodyScrollHeight = 0
          let documentScrollHeight = 0
          if (document.body) {
            bodyScrollHeight = document.body.scrollHeight
          }
          if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight
          }
          // 当页面内容超出浏览器可视窗口大小时，Html的高度包含body高度+margin+padding+border所以html高度可能会大于body高度
          return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
        },
        handleScroll() {
          // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动条的高度
          // let winHeight = document.documentElement.clientHeight || document.body.clientHeight; // 一屏的高度
          // // let scrollHeight = this.getScrollHeight(); // 获取文档总高度

          // console.log("screen top: " + screenTop);
          // console.log("win height: " + winHeight);
          // if (screenTop === winHeight / 2 - 50) {
          //   this.page.page = this.page.page + 1;
          //   this.getPhotos();
          // }
          let is_bottom = global_.FUNC.isReachBottom();
          if (this.active && is_bottom) {
            this.active = false;
            this.page.page = this.page.page + 1;
            this.getPhotos();
          }
        },
        getDate(time) {
          return time.split(" ")[0];
        },
        getPhotos() {
          let album_id = this.$route.params.album_id;
          this.$http.get(photo_url + album_id, {
              params: {
                  page: this.page.page,
                  count: this.page.count,
                  total: this.page.total
              },
              headers:{
                  "bid": global_.FUNC.getBid(),
                  "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
              }
          }).then((data) => {
            this.page.page = data.body.data.page;
            this.page.count = data.body.data.count;
            this.page.total = data.body.data.total;
            data.body.data.body.map((item, key) => {
              this.photos.push(item);
            })
            this.active = true;
          });
        }
      },
      created() {
        this.getPhotos();
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/photo'
</style>
