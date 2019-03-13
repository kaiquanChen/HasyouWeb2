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
          <router-view></router-view>
      </div>
      <div class="user-center-right"></div>
  </div> 
</template>

<script>
    import global_ from "../config/Global";

    const book_record_url = global_.URLS.BOOK_RECORD_URL;
    const movie_record_url = global_.URLS.MOVIE_RECORD_URL;
    const note_url = global_.URLS.NOTE_URL;
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
            albums: null,
            notes: null,
            blogs: null
        };
      },
      methods: {
          gotoAlbumUpload() {
              return "/user/" + this.user.id + "/album/upload";
          },
            gotoBookDetail(id) {
                return "/book/subject/" + id;
            },
            gotoMovieDetail(id) {
                return "/movie/subject/" + id;
            },
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
          },
          getNotes() {
              this.$http.get(note_url + "subjects", {
                    params: {
                        type: "NOTE",
                        count: 5
                    },
                    headers:{
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
                    }
                }).then((data) => {
                    this.notes = data.body.data;
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
          this.getNotes();
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/user.scss'
</style>
