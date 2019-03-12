<template>
  <div id="user-center">
      <div class="user-center-left"></div>
      <div class="user-center-center">
          <h1 class="user-info">
              <a target="_blank" :href="user.avatar"><img :src="user.avatar" :alt="user.nickname"></a>
              &nbsp;{{user.nickname}}
          </h1>
          <ul class="user-menu-items">
              <li class="user-menu-item">
                  <a href="">个人主页</a>
              </li>
              <li class="user-menu-item">
                  <a href="">读书</a>
              </li>
              <li class="user-menu-item">
                  <a href="">观影</a>
              </li>
              <li class="user-menu-item">
                  <a href="">相册</a>
              </li>
              <li class="user-menu-item">
                  <a href="">相册</a>
              </li>
              <li class="user-menu-item">
                  <a href="">笔记</a>
              </li>
              <li class="user-menu-item">
                  <a href="">博客</a>
              </li>
          </ul>
          <div class="record-items">
                <h2 class="record album-record">我的相册 · · · · · ·
                    <span>(<a class="record-count">全部{{getRecordCount(albums)}}</a>)</span>
                </h2>
                <div class="photos-btn">
                    <span class="photos-btn-pic">
                        <a target="_blank" class="lnk-create" href="#"><i>+</i>发照片</a>
                    </span>
                    <span class="photos-btn-pic">
                        <a target="_blank" class="lnk-create-album" href="#"><i>+</i>新建相册</a>
                    </span>
                </div>
                <ul class="record-items" v-if="albums && albums.length > 0">
                    <li class="record-item" v-for="album in albums.body" :key="album.id">
                        <a href="">{{album.name}}</a>
                    </li>
                </ul>
                <ul class="record-item" v-else>去创建自己的第一个相册吧!</ul>
          </div>
          <div class="record-items">
              <h2 class="record book-record">我读 · · · · · ·
                  <span>(<a href="#" class="record-count">{{getRecordCount(read_books)}}本已读</a>)</span>
                </h2>
              <div class="book-want-read item">
                  <div class="item-left book-want-read-left">想读</div>
                  <ul class="book-want-read-right record-items" v-if="want_books && want_books.body.length > 0">
                      <li class="want-read-item" v-for="want_book in want_books.body" :key="want_book.id">
                          <a href=""><img :src="want_book.image_url" :alt="want_book.name"></a>
                      </li>
                  </ul>
              </div>
              <div class="book-read item">
                  <div class="item-left book-read-left">读过</div>
                  <ul class="book-read-right record-items" v-if="read_books && read_books.body.length > 0">
                      <li class="read-item" v-for="read_book in read_books.body" :key="read_book.id">
                          <a href=""><img :src="read_book.image_url" :alt="read_book.name"></a>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="record-items">
              <h2 class="record movie-record">我看 · · · · · ·</h2>
          </div>
          <div class="record-items">
              <h2 class="record note-record">我的笔记 · · · · · ·</h2>
          </div>
          <div class="record-items">
              <h2 class="record blog-record">我的博客 · · · · · ·</h2>
          </div>
      </div>
      <div class="user-center-right"></div>
  </div> 
</template>

<script>
    import global_ from "../config/Global";

    const book_record_url = global_.URLS.BOOK_RECORD_URL;
    const movie_record_url = global_.URLS.MOVIE_RECORD_URL;
    const token = sessionStorage.getItem("access_token");
    export default {
      name: "book",
      data() {
        return {
            user: null,
            read_books: null,
            want_books: null,
            watched_movies: null,
            want_movies: null,
            albums: null
        };
      },
      methods: {
          getRecordCount(list) {
              if (list) {
                  return list.total;
              } else {
                  return 0;
              }
          },
          checkUserStatus() {
              if (!token) {
                  this.$router.push({path: "/login"});
              }
          },
          getUserInfo() {
              let user_info = sessionStorage.getItem("user_info");
              if (user_info) {
                this.user = JSON.parse(user_info);
              } else {
                  this.$router.push({path: "/login"});
              }
          },
          getBookRecords(type) {
              this.$http.get(book_record_url, {
                    params: {
                        type: type,
                        count: 5
                    },
                    headers:{
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
                    }
                }).then((data) => {
                    if (type === "READ_BOOK") {
                        this.read_books = data.body.data;
                    } else if (type === "WANT_READ") {
                        this.want_books = data.body.data;
                    }
                });
          },
          getMovieRecords(type) {
              this.$http.get(movie_record_url, {
                    params: {
                        type: type,
                        count: 5
                    },
                    headers:{
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
                    }
                }).then((data) => {
                    if (type === "WATCHED_MOVIE") {
                        this.watched_movies = data.body.data;
                    } else if (type === "WANT_WATCH") {
                        this.want_movies = data.body.data;
                    }
                });
          }
      },
      created() {
          this.checkUserStatus();
          this.getUserInfo();
          this.getBookRecords("READ_BOOK");
          this.getBookRecords("WANT_READ");
          this.getMovieRecords("WATCHED_MOVIE");
          this.getMovieRecords("WANT_WATCH");
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/user.scss'
</style>
