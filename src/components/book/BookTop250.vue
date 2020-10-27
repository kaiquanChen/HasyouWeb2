<template>
    <div id="book-top250">
        <div class="left"></div>
        <div class="center">
            <div class="center-left">
                <h1><b>图书 Top 250</b></h1>
                <div class="book-top250-body">
                    <div class="book-top250-item" v-for="(book, index) in book_top250">
                        <div class="book-img">
                            <a target="_blank" :href="gotoBookDetail(book.id)" v-if="book.image_url">
                                <img :src="book.image_url"/>
                            </a>
                            <a target="_blank" :href="gotoBookDetail(book.id)" v-else>
                                <img :src="book.image.small"/>
                            </a>
                        </div>
                        <div class="book-info">
                            <span class="book-name">
                              <a :href="gotoBookDetail(book.id)">{{book.name}}</a>
                            </span>
                            <span class="book-origin-name">{{book.origin_work_name}}</span>
                            <div class="info">
                                <span v-if="book.authors && book.authors.length > 0">{{book.authors[0]}}</span>
                                <span
                                    v-if="book.translators && book.translators.length > 0"> / {{book.translators[0]}}</span>
                                <span v-if="book.publisher"> / {{book.publisher}}</span>
                                <span v-if="book.publish_time"> / {{book.publish_time}}</span>
                                <span v-if="book.price"> / {{book.price}}</span>
                            </div>
                            <div class="rate">
                                <el-rate v-model="book.stars/2"
                                         :score-template="book.stars"
                                         show-score disabled>
                                </el-rate>
                            </div>
                            <p class="quote summary">
                                <img src="/static/image/quotel.png" v-if="book.vars.intro"/>
                                {{book.vars.intro}}
                                <img src="/static/image/quoter.png" v-if="book.vars.intro"/>
                            </p>
                        </div>
                    </div>
                    <div class="pagination">
                        <el-pagination
                            @current-change="handleTop250PageChange"
                            layout="prev, pager, next"
                            :pageSize="page.count"
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
    import global_ from "../config/Global"

    const BOOK_URL = global_.URLS.BOOK_URL;
    export default {
        name: "book",
        data() {
            return {
                book_top250: [],
                page: {
                    total: 250,
                    page: 1,
                    count: 25
                },
                pager_count: 7
            };
        },
        methods: {
            handleTop250PageChange(val) {
                this.page.page = val;
                this.getBookList();
            },
            gotoBookDetail(id) {
                return "/book/subject/" + id;
            },
            getBookList() {
                this.$http.get(BOOK_URL + "subjects/top250", {
                    params: {
                        p: this.page.page,
                        count: this.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid()
                    }
                }).then((data) => {
                    this.book_top250 = data.body.data.body;
                    this.page.total = data.body.data.total;
                    this.page.page = data.body.data.page;
                    this.page.count = data.body.data.count;
                });
            },
            getStars(stars) {
                return stars / 2;
            }
        },
        created() {
            this.getBookList();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/bookTop250'
</style>
