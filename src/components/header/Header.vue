<template>
    <div id="header">
      <div class="left">
        <div class="logo-wrapper">
          <a class="navbar-brand" href="/">
            <p>W<em>ithyou</em></p>
          </a>
        </div>
      </div>
      <div class="content">
        <input class="web-search" v-model="keywords" @keyup.enter="search()" placeholder="图书、电影、音乐、博客" />
        <select class="search-tag" v-model="type" v-show="!checkMedia()">
          <option value="全部">全部</option>
          <option value="book">读书</option>
          <option value="movie">电影</option>
          <option value="music">音乐</option>
          <option value="blog">博客</option>
        </select>
        <img class="search-img" @click="search()" src="../../assets/header/icon/search.png">
      </div>
      <div class="right">
        <nav id="web-show">
          <ul class="menu">
            <li class="menu-item">
              <a href="/">首页</a>
            </li>
            <li class="menu-item">
              <a href="/book">读书</a>
            </li>
            <li class="menu-item">
              <a href="/movie">影视</a>
            </li>
            <li class="menu-item">
              <a href="/music">音乐</a>
            </li>
            <li class="menu-item">
              <a href="/forum">论坛</a>
            </li>
            <li class="menu-item">
              <a href="/blog">博客</a>
            </li>
            <li class="menu-item menu-right register" v-if="!user"><a href="/register">注册</a></li>
            <li class="menu-item menu-right login" v-if="!user"><a href="/login">登录</a></li>
            <li class="menu-item menu-right user-info" v-if="user">
              <a @click="showUserMenu()">
                  <img class="avatar" :src="user.avatar">
              </a>
              <span @click="showUserMenu()" class="arrow"></span>
              <div class="user-menu" v-if="user_menu_show">
                <ul class="user-menu-items">
                  <li class="user-menu-item">
                    <a :href="gotoUserCenter(user.id)">个人主页</a>
                  </li>
                  <li class="user-menu-item">
                    <a href="">账号管理</a>
                  </li>
                  <li class="user-menu-item">
                    <a @click="logout()">退出</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <nav id="phone-show">
          <button type="button" @click="showNav()" class="menu-btn">
                <img class="btn-img" src="../../assets/header/icon/header-menu-phone.png">
            </button>
        </nav>
      </div>
      <div class="phone-nav search" v-show="collapse_show">
        <input class="search-input" v-model="keywords" @keyup.enter="search()" placeholder="图书、电影、音乐、博客" />
        <img class="search-img" @click="search()" src="../../assets/header/icon/search.png">
        <select class="search-tag" v-model="type" v-show="checkMedia()">
          <option value="全部">全部</option>
          <option value="book">读书</option>
          <option value="movie">电影</option>
          <option value="music">音乐</option>
          <option value="blog">博客</option>
        </select>
      </div>
      <div class="phone-nav phone-nav-item" v-show="collapse_show">
        <ul class="menu">
          <li>
            <a href="/book" class="home">
              <img class="icon-header-phone" src="../../assets/header/icon/header-book-icon.png">&emsp;读书
            </a>
          </li>
          <li>
            <a href="/movie" class="home">
              <img class="icon-header-phone" src="../../assets/header/icon/header-movie-icon.png">&emsp;影视
            </a>
          </li>
          <li>
            <a href="/music" class="home">
              <img class="icon-header-phone" src="../../assets/header/icon/header-music-icon.png">&emsp;音乐
            </a>
          </li>
          <li>
            <a href="/forum" class="home">
            <img class="icon-header-phone" src="../../assets/header/icon/header-forum-icon.png">&emsp;论坛
            </a>
          </li>
          <li>
            <a href="/blog" class="home">
            <img class="icon-header-phone" src="../../assets/header/icon/header-blog-icon.png">&emsp;博客
            </a>
          </li>
          <li v-if="!user">
            <a href="/login" class="home">
              <img class="icon-header-phone" src="../../assets/header/icon/header-login-icon.png" />&emsp;登录
            </a>
          </li>
          <li v-if="!user">
            <a href="/register" class="home">
              <img class="icon-header-phone" src="../../assets/header/icon/header-login-icon.png" />&emsp;注册
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import Bus from "../../js/bus"

    export default {
        name: "",
        data() {
          return {
            type: "全部",
            collapse_show: false,
            keywords: "",
            user: null,
            user_menu_show: false,
            page: {
              total: 0,
              p: 1,
              count: 5
            },
          }
        },
        methods: {
          gotoUserCenter(id) {
            return "/user/" + id;
          },
          showUserMenu() {
            this.user_menu_show = !this.user_menu_show;
          },
          showNav() {
            this.collapse_show = !this.collapse_show;
          },
          search() {
            this.globalSearch();
            this.$router.push("/search");
          },
          getUserInfo() {
            let token = global_.FUNC.getToken();
            if (token) {
              this.$http.get(global_.URLS.USER_INFO_URL, {
                headers:{
                  bid: global_.FUNC.getBid(),
                  "X-HASYOU-TOKEN": token
                }
              }).then((data) => {
                let res = data.body;
                if (res.code === 200) {
                  this.user = res.data;
                  sessionStorage.setItem("user_info", JSON.stringify(this.user));
                }
              });
            }
          },
          globalSearch() {
            if (!this.keywords) {
              this.$message.error("关键字不能空!");
              return;
            }

            this.$http.get(global_.URLS.GLOBAL_SEARCH_URL, {
              params:{
                "keywords": this.keywords,
                "p": this.page.p,
                "count": this.page.count,
                "type": this.type
              },
              headers:{
                "bid":global_.FUNC.getBid()
              }
            }).then((data) => {
              if (data.body.code !== 200) {
                this.$message.error("数据获取失败!");
                console.log(data);
                return;
              }

              let res = data.body.data;
              res["keywords"] = this.keywoemit
              Bus.$emit('search-on', res);emit

              sessionStorage.setItem("search_record", this.keywords);

              if (this.checkMedia()) {
                this.mobile_nav_show = false;
              }
            })
          },
          checkMedia() {
            return window.matchMedia('(max-width:600px)').matches;
          },
          initKeywords() {
            let data = sessionStorage.getItem("search_record");
            if (data) {
              this.keywords = data;
              this.globalSearch();
            }
          },
          getMessage() {
            Bus.$on("request-page", response => {
              this.page.p = response.p;
              this.page.count = response.count;
              this.page.total = response.total;
              this.keywords = response.keywords;

              this.globalSearch();
            });

            Bus.$on("login-status", response => {
              this.getUserInfo();
            });
          },
          logout() {
            this.$http.get(global_.URLS.LOGOUT_URL, {
              headers:{
                "bid": global_.FUNC.getBid(),
                "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
              }
            }).then((data) => {
              sessionStorage.removeItem("access_token");
              sessionStorage.removeItem("user_info");
              this.user = null;
              this.$router.push({path: this.$route.path});
            });
          }
        },
        created() {
          this.initKeywords();
          this.getMessage();
          this.getUserInfo();
        }
      }
</script>

<style lang="scss"  scoped>
  @import './css/header.scss'
</style>