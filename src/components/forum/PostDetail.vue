<template>
    <div id="post-detail">
      <div class="left">
        <div class="post-header">
          <span class="header nav">
            <a href="/fourm/forums">论坛首页</a>&nbsp;>
            <a :href="getNodeRoutes(node.id)">{{node.title}}</a>
          </span>
          <span class="header title">
            {{post.title}}
          </span>
          <span class="header info">
            <span class="creator-name">{{member.username}}</span> · 
            <span class="create-time">{{post.create_time}}</span>
            <!-- <span class="creator-name"></span> -->
          </span>
        </div>
        <div class="post-avatar">
          <a target="_blank" :href="member.avatar_large"><img :src="member.avatar_large" :alt="member.username"></a>
        </div>
      </div>
      <div class="right">
        <h1>Hell David!</h1>
      </div>
    </div>
</template>

<script>
  let marked = require('marked');
  import global_ from "../config/Global"

  const post_url = global_.URLS.POST_URL;
  const comment_url = global_.URLS.COMMENT_URL;
  const follow_url = global_.URLS.FOLLOW_POST_URL;
    export default {
      name: "book",
      data() {
        return {
          post:{},
          member:{},
          node:{},
          content: "",
          comment: {
            page:{
              total: 0,
              page: 1,
              count: 20
            },
            body:[]
          }
        };
      },
      methods: {
        getPost() {
          let post_id = this.$route.params.id;
          let url = post_url + "subject/" + post_id;
          this.$http.get(url, {
            headers: {
              "bid": global_.FUNC.getBid(),
              "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
            }
          }).then((data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            this.post = data.body.data;
            this.member = this.post.member;
            this.node = this.post.node;
            this.content = marked(this.post.content, { sanitize: true });
          });
        },
        getComments() {
          let post_id = this.$route.params.id;
          let url = comment_url + post_id;
          this.$http.get(url, {
            params:{
              p:this.comment.page.page,
              count:this.comment.page.count
            },
            headers: {
              "bid": global_.FUNC.getBid()
            }
          }).then((data) => {
            if (data.status !== 200) {
              console.log(data);
              alert("数据获取失败!");
              return;
            }

            let comments = data.body.data.body;
            let res = comments.map((item, index) => {
              item["content"] = marked(item["content"]);
              return item;
            });
            this.comment.body = res;
            this.comment.page.page = data.body.data.page;
            this.comment.page.count = data.body.data.count;
            this.comment.page.total = data.body.data.total;
          });
        },getNodeRoutes(id) {
          return "/forum/node/" + id;
        },getOriginRoutes(id) {
          return "https://www.v2ex.com/t/" + id;
        },
        handleCurrentChange(val) {
          this.comment.page.page = val;
          this.getComments();
          this.goAnchor("#comment-start");
        },
        checkMedia() {
          return window.matchMedia('(max-width:600px)').matches;
        }
      },
      created() {
        this.getPost();
        this.getComments();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/postDetail'
</style>
