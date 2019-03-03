<template>
    <div id="search-result">
        <div class="left"></div>
        <div class="center">
            <div class="center-left">
                <h1>搜索<span class="high-light">{{keywords}}</span>共<span class="high-light">{{page.total}}</span>个结果</h1>
                <div class="results">
                    <div class="result-item" v-for="item in items" :key="item.id">
                        <div class="result-item-info">
                            <div class="item-info1">
                                <span class="title" v-if="item.type === 'book'">
                                    [图书]&nbsp;
                                    <a target="_blank" :href="getDetail(item)">{{item.name}}</a>
                                </span>
                                <span class="title" v-if="item.type === 'movie'">
                                    [电影]&nbsp;
                                    <a target="_blank" :href="getDetail(item)">{{item.name}}</a>
                                </span>
                                <el-rate
                                    class="book-list-rate"
                                    v-model="item.stars / 2"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    :score-template="item.stars">
                                </el-rate>
                            </div>
                            <div class="item-info2">
                                <span class="it" v-if="item.origin_title">{{item.origin_title}}</span>
                                <span class="item-info" v-if="item.type === 'book' && item.vars.authors && index < 1" v-for="(author, index) in item.vars.authors"> / {{author}}</span>
                                <span class="item-info" v-if="item.type === 'book' && item.vars.translators && index < 1" v-for="(translator, index) in item.vars.translators"> / {{translator}}</span>
                                <span class="item-info" v-if="item.type === 'movie' && item.vars.year"> / {{item.vars.year}}</span>
                                <span class="item-info" v-if="item.type === 'movie' && item.vars.countries"> / {{item.vars.countries[0]}}</span>
                            </div>
                            <span class="intro text-info">{{item.intro}}</span>
                        </div>
                        <div class="result-item-image">
                            <a target="_blank" :href="item.image_url"><img :src="item.image_url" :alt="item.name" /></a>
                        </div>
                    </div>
                    <div class="pagination">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            layout="prev, pager, next"
                            :total="page.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="center-right"></div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
  import Bus from '../../js/bus'
    export default {
      name: "book",
      data() {
        return {
          keywords: "",
          items: [],
          page: {
            total: 0,
            p: 1,
            count: 0
          },
          pager_count: 7
        };
      },
      methods: {
        checkMedia() {
          return window.matchMedia('(max-width:600px)').matches;
        },
        getMessage() {
          Bus.$on("search-on", response => {
            this.items = response.body;
            this.page.p = response.page;
            this.page.count = response.count;
            this.page.total = response.total;
            this.keywords = response.keywords;
          });
        },
        getDetail(item) {
          if (item.type === "book") {
            return "/book/subject/" + item.id;
          } else if (item.type === "movie") {
            return "/movie/subject/" + item.id;
          }
        },
        handleCurrentChange(val) {
            this.page.p = val;
            Bus.$emit("request-page", {
                p: val,
                count: this.page.count,
                total: this.page.total,
                keywords: this.keywords
            });
        }
      },
      created() {
        this.getMessage();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/searchResult'
</style>
