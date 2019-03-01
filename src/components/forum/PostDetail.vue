<template>
    <div id="post-detail">
      <div class="left">
        <div class="post">
          <div class="post-top">
            <div class="post-header">
              <span class="header nav">
                <a href="/forum/forums">论坛首页</a>&nbsp;>
                <a :href="getNodeRoutes(node.id)">{{node.title}}</a>
              </span>
              <span class="header title">
                {{post.title}}
              </span>
              <span class="header info">
                <span class="creator-name">{{member.username}}</span> · 
                <span class="create-time">{{post.create_time}}</span> · 
                <a target="_blank" :href="'https://www.v2ex.com/t/' + post.id" class="v2ex">原网页</a>
              </span>
            </div>
            <div class="post-avatar">
              <a target="_blank" :href="member.avatar_large"><img :src="member.avatar_large" :alt="member.username"></a>
            </div>
          </div>
          <div class="post-body">
            <div class="markdown" v-html="content"></div>
          </div>
          <div class="post-operation">
            <a href="javascript:void(0);" class="follow">加入收藏</a>
            <a href="javascript:void(0);" class="ignore">忽略主题</a>
          </div>
        </div>
        <div class="comment">
          <div class="comment-header">
            <span class="reply-info">
              {{post.comment_count === 0 ? comments.body.length : post.comment_count}}回复
              <strong>|</strong> 直到{{post.active_time}}
            </span>
            <span class="post-node">
              <a :href="getNodeRoutes(node.id)">{{node.title}}</a>
            </span>
          </div>
          <div class="pagination" v-if="Math.ceil(comments.page.total / comments.page.count) > 1">
              <el-pagination
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                  :page-size="comments.page.count"
                  :total="comments.page.total">
              </el-pagination>
          </div>
          <div class="comment-body">
            <div class="comment-items" v-if="comments.body && comments.body.length > 0">
              <div class="comment-item" v-for="item in comments.body" :key="item.id">
                <div class="comment-avatar">
                  <a href="javascript:void(0);" v-if="item.member">
                    <img class="avatar" :src="item.member.avatar_normal" :alt="item.member.username">
                  </a>
                  <a href="javascript:void(0);" v-else>
                    <img class="avatar" src="/static/image/user_anon.jpeg" :alt="item.author">
                  </a>
                </div>
                <div class="comment-info">
                  <div class="comment-info-top">
                    <span class="creator-name">{{item.author}}</span>&emsp;
                    <span class="create-time">{{item.create_time}}</span>&emsp;
                    <span class="create-device" v-if="item.device !== 'Web'">via {{item.device}}</span>
                    <span class="comment-floor">{{item.floor_number}}</span>
                  </div>
                  <div class="comment-info-content" v-html="item.content"></div>
                </div>
              </div>
            </div>
            <div class="comment-item-empty" v-else>
              <span class="notice">暂无评论...!</span>
              <span v-show="!load" class="btn-load-comment" @click="loadComment()">点击加载评论</span>
            </div>
          </div>
          <div class="pagination" v-if="Math.ceil(comments.page.total / comments.page.count) > 1">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :page-size="comments.page.count"
              :total="comments.page.total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="right">
        <Node></Node>
      </div>
    </div>
</template>

<script>
    let marked = require('marked');
    let hljs = require('highlight.js');
    
    import 'highlight.js/styles/default.css';
    import global_ from "../config/Global"
    import Node from "./Node"

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {    
          return hljs.highlight(lang, code, true).value;
        } else {
          return hljs.highlightAuto(code).value;
        }
      }
    });

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
          load: false,
          comments: {
            page:{
              total: 0,
              page: 1,
              count: 20
            },
            body:[]
          }
        };
      },
      components:{Node},
      methods: {
        loadComment() {
          this.load = true;
          this.getComments();
        },
        handleCurrentChange(val) {
          this.comments.page.page = val;
          this.getComments();
        },
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
              p:this.comments.page.page,
              count:this.comments.page.count
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
            this.comments.body = res;
            this.comments.page.page = data.body.data.page;
            this.comments.page.count = data.body.data.count;
            this.comments.page.total = data.body.data.total;
          });
        },
        getNodeRoutes(id) {
          return "/forum/node/" + id;
        },
        getOriginRoutes(id) {
          return "https://www.v2ex.com/t/" + id;
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
