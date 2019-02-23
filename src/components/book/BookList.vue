<template>
    <div id="book-list">
        <div class="left"></div>
        <div class="center">
            <div class="center-left">
                <h1>图书标签: {{tag.tag_name}}</h1>
                <div class="book-list-body">
                    <div class="book-list-item" v-for="book in data">
                        <div class="book-image">
                            <a target="_blank" :href="getBookDetail(book.id)" class="image">
                                <img :src="book.image_url" :alt="book.name">
                            </a>
                        </div>
                        <div class="book-info">
                            <span class="book-name">
                                <a target="_blank" :href="getBookDetail(book.id)">{{book.name}}</a>
                            </span>
                            <span class="book-origin-name" v-if="book.origin_work_name">{{book.origin_work_name}}</span>
                            <div class="info">
                                <span v-if="book.authors && book.authors.length > 0">{{book.authors[0]}}</span>
                                <span v-if="book.translators && book.translators.length > 0"> / {{book.translators[0]}}</span>
                                <span v-if="book.publisher"> / {{book.publisher}}</span>
                                <span v-if="book.publish_time"> / {{book.publish_time}}</span>
                                <span v-if="book.price"> / {{book.price}}</span>
                            </div>
                            <div class="rate">
                                <el-rate v-model="book.stars/2" 
                                    :score-template="book.stars" 
                                    show-score disabled>
                                    &nbsp;{{book.stars}}
                                </el-rate>
                            </div>
                            <p class="summary">
                                <span v-if="book.intro.length > 0">{{book.intro[0]}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="pagination">
                        <el-pagination
                            @current-change="handleBookList"
                            layout="prev, pager, next"
                            :total="total">
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
  import global_ from "../config/Global"
  const book_url = global_.URLS.BOOK_URL;
    export default {
        name: "book",
        data() {
            return {
                data: [],
                total: 0,
                page: 1,
                count: 20,
                pager_count: 7,
                tag: {}
            };
        },
        methods: {
            handleBookList(val) {
                this.page = val;
                this.getBookList();
            },
            getBookList() {
                let tag_id = this.$route.params.tag_id;
                let book_list_url = book_url + "subjects/" + tag_id + "?p=" + this.page + "&count=" + this.count;
                this.$http.get(book_list_url, {
                    params:{
                        p:this.page,
                        count:this.count
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

                    let res = data.body.data;
                    this.data = res.body;
                    this.total = res.total;
                    this.page = res.page;
                    this.count = res.count;
                    this.tag = res.extra.tag;
                });
            },
            getBookDetail(id) {
                return "/book/subject/" + id;
            },
            checkMedia() {
                return window.matchMedia('(max-width:415px)').matches;
            },
            gotoBooks() {
                this.$router.push({path: "/book/books"});
            },
        },
        created() {
            this.getBookList();
        // this.$router.push({path: "/book/books"});
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/bookList'
</style>
