<template>
  <div id="go-node">
    <div class="left">
      <h2 class="nav">
        <a href="/forum/forums">论坛首页</a>&nbsp;>
        <b>{{node.title}}</b>
      </h2>
      <div class="post-items">
        <div class="post-item" v-for="item in posts.body" :key="item.id">
            <div class="avatar">
                <a target="_blank" :href="item.member.avatar_normal">
                    <img :src="item.member.avatar_normal" :alt="item.member.username">
                </a>
            </div>
            <div class="post-content">
                <span class="post-content-top">
                    <a class="post-title" target="_blank" :href="getPostRoutes(item.id)">{{item.title}}</a>
                </span>
                <span class="post-info" v-if="checkMedia()">
                    <a :href="getNodeRoutes(item.node.id)" class="post-node">{{item.node.title}}</a>&nbsp;•&nbsp;
                    <a href="javascript:void(0);" class="post-creator"><strong>{{item.member.username}}</strong></a>&nbsp;•&nbsp;
                    <span class="post-time">{{item.create_time}}</span>
                </span>
                <span class="post-info" v-else>
                    <a :href="getNodeRoutes(item.node.id)" class="post-node">{{item.node.title}}</a>&emsp;•&emsp;
                    <a href="javascript:void(0);" class="post-creator"><strong>{{item.member.username}}</strong></a>&emsp;•&emsp;
                    <span class="post-time">{{item.create_time}}</span>
                </span>
            </div>
            <div class="comment-count">
                <span class="post-comment-count">{{item.comment_count}}</span>
            </div>
        </div>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="posts.page.count"
                :small="checkMedia()"
                layout="prev, pager, next"
                :total="posts.page.total">
            </el-pagination>
        </div>
    </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
  import global_ from "../config/Global"

  const post_url = global_.URLS.POST_URL;
  const node_url = global_.URLS.NODE_URL;
  export default {
    data() {
      return {
        activeName: '',
        posts:{
          body:[],
          page:{
            total: 0,
            page: 1,
            count: 20
          }
        },
        node: {},
        right_nodes: []
      };
    },
    methods: {
      toggle(id) {
        this.getPostList(id);
      },
      getPagerCount() {
        return this.checkMedia() === true ? 5 : 10;
      },
      handleCurrentChange(val) {
        this.posts.page.page = val;
        this.getPostList()
      },
      checkMedia() {
        return window.matchMedia('(max-width:600px)').matches;
      },
      getPostList(node_id) {
        if (!node_id) {
          node_id = this.$route.params.id;
        }
        let url = post_url + "subjects/" + node_id;
        this.$http.get(url, {
          params:{
            p:this.posts.page.page,
            count:this.posts.page.count
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

          this.posts.body = data.body.data.body;
          this.posts.page.total = data.body.data.total;
          this.posts.page.page = data.body.data.page;
          this.posts.page.count = data.body.data.count;
          this.node = data.body.data.extra.node;
        });
      },
      getPostRoutes(id) {
        return "/forum/subject/" + id;
      },
      getMoreNodeList() {
        let more_node_url = node_url + "list";
        this.$http.get(more_node_url, {
          headers: {
            "bid": global_.FUNC.getBid()
          }
        }).then((data) => {
          if (data.status !== 200) {
            console.log(data);
            alert("数据获取失败!");
            return;
          }

          this.right_nodes = data.body.data.body;
        });
      },
      getNodeRoutes(id) {
        return "/forum/node/" + id;
      }
    },
    created() {
      this.getPostList();
      this.getMoreNodeList();
    }
  };
</script>

<style lang="scss" scoped>
  @import './css/goNode'
</style>
