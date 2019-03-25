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
                  <a :href="gotoUserHome()">个人主页</a>
              </li>
              <li class="user-menu-item">
                  <a :href="gotoUserRecord('READ_BOOK')">读书</a>
              </li>
              <li class="user-menu-item">
                  <a :href="gotoUserRecord('WATCHED_MOVIE')">观影</a>
              </li>
              <li class="user-menu-item">
                  <a :href="gotoUserAlbums()">相册</a>
              </li>
              <li class="user-menu-item">
                  <a :href="gotoUserNotes()">笔记</a>
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
    const token = localStorage.getItem("access_token");
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
          gotoUserNotes() {
              return "/user/" + this.user.id + "/notes";
          },
          gotoUserHome() {
              return "/user/" + this.user.id;
          },
          gotoUserAlbums() {
              return "/user/" + this.user.id + "/albums";
          },
          gotoUserRecord(type) {
              if (type === "READ_BOOK") {
                  return "/user/" + this.user.id + "/subjects/" + type;
              } else if (type === "WATCHED_MOVIE") {
                  return "/user/" + this.user.id + "/subjects/" + type;
              }
          },
          gotoAlbumUpload() {
              return "/user/" + this.user.id + "/album/upload";
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
              if (token) {
                this.user = global_.FUNC.getUserInfo();
              } else {
                  this.$router.push({path: "/login"});
              }
          },
      },
      created() {
        this.checkUserStatus();
        this.getUserInfo();
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/user.scss'
</style>
