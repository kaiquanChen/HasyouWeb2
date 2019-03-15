<template>
  <div id="item-list">
    <h1>{{title}}</h1>
    <div class="items">
      <div class="item" v-for="item in items" :key="item.id">
        <el-card class="item-card" :body-style="{ padding: '0px' }">
          <img class="item-image" v-gallery :src="item.image_url">
          <img class="item-badge" src="/static/icon/badge_48.png" alt="badge">
          <span class="item-stars" v-if="type === 'WATCHED_MOVIE'">{{item.average}}</span>
          <span class="item-stars" v-else-if="type === 'READ_BOOK'">{{item.stars}}</span>
          <div class="bottom clearfix">
              <time class="time">{{ getDate(item.create_time) }}</time><br>
              <a v-if="type === 'WATCHED_MOVIE'" target="_blank" :href="gotoItemDetail(item.id)" class="item-info-name">{{item.title}}</a>
              <a v-else-if="type === 'READ_BOOK'" target="_blank" :href="gotoItemDetail(item.id)" class="item-info-name">{{item.name}}</a>
            </div>
        </el-card>
      </div>
      <div class="pagination">
        <el-pagination
            @current-change="handleCurrentChange"
            :page-size="page.count"
            :small="checkMedia()"
            layout="prev, pager, next"
            :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from "../../config/Global";

let list_item_url = global_.URLS.COMMON_URL;
export default {
  data () {
    return {
      title: "",
      items: [],
      page: {
        page: 1,
        count: 15,
        total: 0
      },
      type: ""
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page.page = val;
      this.getItemList();
    },
    checkMedia() {
        return window.matchMedia('(max-width:600px)').matches;
    },
    getDate(time) {
      return time.split(" ")[0];
    },
    gotoItemDetail(id) {
      if (this.type === "WATCHED_MOVIE") {
        return "/movie/subject/" + id; 
      } else if (this.type === "READ_BOOK") {
        return "/book/subject/" + id;
      }
    },
    getItemList() {
      let url = list_item_url;
      if (this.type === "WATCHED_MOVIE") {
        url += "movie/record";
        this.title = "我看过的电影";
      } else if (this.type === "READ_BOOK") {
        url += "book/record";
        this.title = "我读过的书";
      }

      this.$http.get(url, {
        params: {
            type: this.type,
            count: this.page.count,
            p: this.page.page
        },
        headers:{
            "bid": global_.FUNC.getBid(),
            "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
        }
        }).then((data) => {
          this.items = data.body.data.body;
          this.page.page = data.body.data.page;
          this.page.count = data.body.data.count;
          this.page.total = data.body.data.total;
      });
    }
  },
  created() {
    this.type = this.$route.params.type;
    this.getItemList();
  }
}
</script>

<style lang="scss" scoped>
    @import './css/itemList'
</style>
