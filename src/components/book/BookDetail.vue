<template>
    <div id="book-detail">
        <div class="left"></div>
        <div class="book-info center">
            <div class="center-left">
                <h1 class="book-title">{{data.name}}</h1>
                <div class="content">
                    <div class="avatar">
                        <a target="_blank" v-if="data.image_url" :href="data.image_url">
                            <img :src="data.image_url" :alt="data.name">
                        </a>
                        <div class="user-operation" v-if="data.operations && data.operations.length === 0">
                            <span class="read" @click="readBook()">读过</span>
                            <span class="want-read" @click="wantReadBook()">想读</span>
                        </div>
                        <div class="operation-div" v-else>
                    <span class="operate"
                          v-for="operate in data.operations"
                          v-if="operate.operation === 'READ_BOOK'">已读过本书</span>
                            <span class="operate"
                                  v-for="operate in data.operations"
                                  v-if="operate.operation === 'WANT_BOOK'">本书已在要读计划内</span>
                        </div>
                        <span class="update" @click="updateBook()" v-if="user && user.id === 1">更新</span>
                    </div>
                    <div class="info">
                        <div v-if="data.authors && data.authors.length > 0">
                            <label>作者:</label>
                            <span v-for="author in data.authors" :key="author.id">
                      <a>{{author}}</a>&nbsp;
                    </span>
                        </div>
                        <div v-if="data.translators && data.translators.length > 0">
                            <label>译者:</label>
                            <span v-for="translator in data.translators" :key="translator.id">
                      <a>{{translator}}</a>&nbsp;
                    </span>
                        </div>
                        <div v-if="data.publisher">
                            <label>出版社:</label>
                            <span>{{data.publisher}}</span>
                        </div>
                        <div v-if="data.origin_work_name">
                            <label>原作名:</label>
                            <span>{{data.origin_work_name}}</span>
                        </div>
                        <div v-if="data.publish_time">
                            <label>出版年:</label>
                            <span>{{data.publish_time}}</span>
                        </div>
                        <div v-if="data.price">
                            <label>定价:</label>
                            <span>{{data.price}}</span>
                        </div>
                        <div v-if="data.page_count">
                            <label>页数:</label>
                            <span>{{data.page_count}}</span>
                        </div>
                        <div v-if="data.binding">
                            <label>装帧:</label>
                            <span>{{data.binding}}</span>
                        </div>
                        <div v-if="data.isbn10">
                            <label>ISBN:</label>
                            <span>{{data.isbn10}}</span>
                        </div>
                        <div v-if="data.isbn13">
                            <label>ISBN13:</label>
                            <span>{{data.isbn13}}</span>
                        </div>
                    </div>
                    <div class="rate">
                        <div class="rate-body">
                            <span class="rate-title">豆瓣评分:</span>
                            <span class="rate-num"><b>{{data.stars}}</b></span>
                            <el-rate
                                class="primary-rate"
                                :value="getStars(data.stars)"
                                disabled
                                text-color="#ff9900">
                            </el-rate>
                        </div>
                    </div>
                </div>
                <div class="book-summary">
                    <h3>内容简介 · · · · · ·</h3>
                    <p v-for="(summary, index) in data.summaries" v-show="!summary_show"
                       v-if="index !== undefied && index < 2">{{summary}}</p>
                    <p v-for="(summary, index) in data.summaries" v-show="summary_show">{{summary}}</p>
                    <span class="summary-show"
                          v-if="data.intro && data.intro.length >= 2"
                          @click="toggleSummaryShow()"
                          v-show="!summary_show">
                  <a>(全部展开)</a>
                </span>
                    <span class="summary-show"
                          @click="toggleSummaryShow()"
                          v-show="summary_show">
                  <a>(收起)</a>
                </span>
                </div>
                <div class="book-catalog">
                    <h3>目录 · · · · · ·</h3>
                    <span v-for="(catalog, index) in data.catalogs"
                          v-show="!catalog_show" v-if="index < 4">{{catalog}}</span>
                    <span v-for="(catalog, index) in data.catalogs"
                          v-show="catalog_show">{{catalog}}</span>
                    <span class="catalog-show"
                          @click="toggleCatalogShow()"
                          v-if="data.catalogs && data.catalogs.length > 4"
                          v-show="!catalog_show">
                  <a>(全部展开)</a>
                </span>
                    <span class="catalog-show" @click="toggleCatalogShow()" v-show="catalog_show">
                  <a>(收起)</a>
                </span>
                </div>
                <div class="book-comment">
                    <h3>{{data.name}}的短评 · · · · · ·</h3>
                    <span id="comment-nav-root">
                  <span @click="toggleCommentNav('hot')"
                        v-bind:style="comment_selected ? 'color:#3377aa' : 'color:black'"
                        class="comment-nav">最热&nbsp;</span>
                  <span class="comment-nav">\</span>
                  <span @click="toggleCommentNav('latest')"
                        v-bind:style="!comment_selected ? 'color:#3377aa' : 'color:black'"
                        class="comment-nav">&nbsp;最新
                  </span>
                </span>
                    <div class="book-comment-body">
                        <div class="book-comment-item" v-for="(comment, index) in comments.body">
                            <a class="commenter-avatar" target="_blank" :href="comment.avatar"
                               v-if="comment.avatar"><img :src="comment.avatar"/></a>
                            <a class="commenter-avatar" href="#" v-else><img src="/static/image/user_anon.jpeg"/></a>
                            <span class="creator-name" v-if="comment.creator_name">{{comment.creator_name}}</span>
                            <span class="creator-name" v-else>【已注销】</span>
                            <span class="creator-rate">
                      <el-rate
                          class="rate"
                          :value="getStars(comment.stars)"
                          disabled
                          text-color="#ff9900">
                      </el-rate>
                    </span>
                            <span class="creator-time">{{comment.create_time}}</span>
                            <span class="userful">{{comment.votes}}赞</span>
                            <div class="comment-content">
                                {{comment.content}}
                            </div>
                        </div>
                        <div class="pagination">
                            <el-pagination
                                @current-change="handleCommentPageChange"
                                layout="prev, pager, next"
                                :total="comments.page.total">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="book-review">
                    <h3>{{data.name}}的书评 · · · · · ·</h3>
                    <span id="review-nav-root">
                <span @click="toggleReviewNav('hot')"
                      v-bind:style="review_selected ? 'color:#3377aa' : 'color:black'"
                      class="review-nav">最热&nbsp;</span>
                <span class="review-nav">\</span>
                <span @click="toggleReviewNav('latest')"
                      v-bind:style="!review_selected ? 'color:#3377aa' : 'color:black'"
                      class="review-nav">&nbsp;最新
                </span>
                <div class="book-review-body">
                    <div class="book-review-item" v-for="(review, index) in reviews.body">
                      <a class="review-avatar" :href="review.user.avatar" v-if="review.user"><img
                          :src="review.user.avatar"/></a>
                      <a class="review-avatar" href="#" v-else><img src="/static/image/user_anon.jpeg"/></a>
                      <span class="creator-name" v-if="review.user">{{review.user.name}}</span>
                      <span class="creator-name" v-else>【已注销】</span>
                      <span class="creator-rate">
                        <el-rate
                            class="rate"
                            :value="getStars(review.stars)"
                            disabled
                            text-color="#ff9900">
                        </el-rate>
                      </span>
                      <span class="creator-time">{{review.published}}</span>
                      <span class="userful">{{review.votes}}赞</span>
                      <div class="review-content">
                        <span class="review-title"><a href="#">{{review.title}}</a></span>
                        <p>
                            {{review.summary}}
                        </p>
                      </div>
                    </div>
                    <div class="pagination">
                        <el-pagination
                            @current-change="handleReviewPageChange"
                            layout="prev, pager, next"
                            :total="reviews.page.total">
                      </el-pagination>
                    </div>
                  </div>
              </span>
                </div>
                <div class="book-annotation">
                    <h3>{{data.name}}的读书笔记 · · · · · ·</h3>
                    <div class="book-annotation-body">
                        <div class="book-annotation-item" v-for="annotation in annotations.body">
                            <div class="book-annotation-left">
                                <a href="#"><img :src="annotation.author.avatar"/></a>
                            </div>
                            <div class="book-annotation-right">
                                <span class="book-annotation-title">第{{annotation.page_no}}页</span>
                                <span class="creator-name">{{annotation.author.name}}</span>
                                <span class="creator-time">{{annotation.time}}</span>
                                <a class="abstract-photo" target="_blank"
                                   v-if="annotation.abstract_photo"
                                   :href="annotation.abstract_photo">
                                    <img :src="annotation.abstract_photo"/>
                                </a>
                                <p v-if="annotation.summary" class="book-annotation-summary">
                                    {{annotation.summary}}
                                </p>
                            </div>
                        </div>
                        <div class="pagination">
                            <el-pagination
                                @current-change="handleAnnotationPageChange"
                                layout="prev, pager, next"
                                :total="annotations.page.total">
                            </el-pagination>
                        </div>
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
    const comment_url = global_.URLS.BOOK_SHORT_COMMENT_URL;
    const review_url = global_.URLS.BOOK_REVIEW_URL;
    const read_url = global_.URLS.BOOK_READ_URL;
    const want_url = global_.URLS.BOOK_WANT_URL;
    const annotation_url = global_.URLS.BOOK_ANNOTATION_URL;
    const token = localStorage.getItem("access_token");
    export default {
        name: "Book",
        data() {
            return {
                user: {},
                review_selected: true,
                review_sort: 'hot',
                comment_selected: true,
                comment_sort: 'hot',
                summary_show: false,
                catalog_show: false,
                data: {},
                comments: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 20
                    }
                },
                reviews: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 10
                    },
                },
                annotations: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 5
                    }
                },
                pager_count: 7,
                summary_show: false,
                content_show: false,
                value: 5
            }
        },
        methods: {
            undefied() {
            },
            readBook() {
                if (token) {
                    this.$http.post(read_url, {
                        body: {
                            book_id: this.$route.params.id
                        }
                    }, {
                        headers: {
                            bid: global_.FUNC.getBid(),
                            "X-HASYOU-TOKEN": token
                        }
                    }).then((data) => {
                        if (data.body.code === 200) {
                            this.data.operations.push(data.body.data);
                        } else if (data.body.code === 5006) {
                            this.$message({
                                message: '请先登录!',
                                type: 'warning'
                            });
                            this.$router.push({path: "/login"});
                        }
                    });
                } else {
                    let referer = this.$route.path;
                    this.$router.push({path: "/login?referer=" + referer});
                }
            },
            wantReadBook() {
                if (token) {
                    this.$http.post(want_url, {
                        body: {
                            book_id: this.$route.params.id
                        }
                    }, {
                        headers: {
                            bid: global_.FUNC.getBid(),
                            "X-HASYOU-TOKEN": token
                        }
                    }).then((data) => {
                        if (data.body.code === 200) {
                            this.data.operations.push(data.body.data);
                        } else if (data.body.code === 5006) {
                            this.$message({
                                message: '请先登录!',
                                type: 'warning'
                            });
                            this.$router.push({path: "/login"});
                        }
                    });
                } else {
                    let referer = this.$route.path;
                    this.$router.push({path: "/login?referer=" + referer});
                }
            },
            handleCommentPageChange(val) {
                this.comments.page.page = val;
                this.getBookComment();
            },
            handleReviewPageChange(val) {
                this.reviews.page.page = val;
                this.getBookReview();
            },
            handleAnnotationPageChange(val) {
                this.annotations.page.page = val;
                this.getBookAnnotation();
            },
            toggleReviewNav(review_sort) {
                if (this.review_sort === review_sort) {
                    return;
                }
                this.review_selected = !this.review_selected;
                this.review_sort = review_sort;
                this.getBookReview();
            },
            toggleCommentNav(comment_sort) {
                if (this.comment_sort === comment_sort) {
                    return;
                }
                this.comment_selected = !this.comment_selected;
                this.comment_sort = comment_sort;
                this.getBookComment();
            },
            toggleCatalogShow() {
                this.catalog_show = !this.catalog_show;
            },
            toggleSummaryShow() {
                this.summary_show = !this.summary_show;
            },
            getStars(stars) {
                return stars / 2;
            },
            checkMedia() {
                return window.matchMedia('(max-width:415px)').matches;
            },
            getOriginRoutes(id) {
                return "https://book.douban.com/subject/" + id;
            },
            getBookComment() {
                let book_id = this.$route.params.id;
                const url = comment_url + "/" + book_id;
                this.$http.get(url, {
                    params: {
                        sort: this.comment_sort,
                        p: this.comments.page.page,
                        count: this.comments.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.comments.body = data.body.data.body;
                    this.comments.page.total = data.body.data.total;
                    this.comments.page.page = data.body.data.page;
                    this.comments.page.count = data.body.data.count;
                });
            },
            getBookAnnotation() {
                let book_id = this.$route.params.id;
                this.$http.get(annotation_url + book_id, {
                    params: {
                        p: this.annotations.page.page,
                        count: this.annotations.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.annotations.body = data.body.data.body;
                    this.annotations.page.total = data.body.data.total;
                    this.annotations.page.page = data.body.data.page;
                    this.annotations.page.count = data.body.data.count;
                });
            },
            getBookReview() {
                let book_id = this.$route.params.id;
                this.$http.get(review_url + book_id, {
                    params: {
                        sort: this.review_sort,
                        p: this.reviews.page.page,
                        count: this.reviews.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.reviews.body = data.body.data.body;
                    this.reviews.page.total = data.body.data.total;
                    this.reviews.page.page = data.body.data.page;
                    this.reviews.page.count = data.body.data.count;
                });
            },
            getBook() {
                let book_id = this.$route.params.id;
                const book_detail_url = book_url + "subject/" + book_id;
                this.$http.get(book_detail_url, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.data = data.body.data;
                });
            },
            goAnchor(query) {
                let anchor = this.$el.querySelector(query)
                document.documentElement.scrollTop = anchor.offsetTop
            },
            gotoAuthor(id) {
                return "https://www.douban.com/people/" + id;
            },
            updateBook() {
                let book_id = this.$route.params.id;
                const update_book_url = book_url + "update/" + book_id;
                this.$http.get(update_book_url, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        this.$message.error("数据更新错误,请稍后再试!");
                        return;
                    }

                    this.data = data.body.data;
                    this.$message({
                        message: "数据更新成功!",
                        type: 'success'
                    });
                });
            },
            getBookComment() {
                let book_id = this.$route.params.id;
                const url = comment_url + "/" + book_id;
                this.$http.get(url, {
                    params: {
                        sort: this.comment_sort,
                        p: this.comments.page.page,
                        count: this.comments.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.comments.body = data.body.data.body;
                    this.comments.page.total = data.body.data.total;
                    this.comments.page.page = data.body.data.page;
                    this.comments.page.count = data.body.data.count;
                });
            },
            getUserInfo() {
                if (token) {
                    this.$http.get(global_.URLS.USER_INFO_URL, {
                        headers: {
                            bid: global_.FUNC.getBid(),
                            "X-HASYOU-TOKEN": token
                        }
                    }).then((data) => {
                        let res = data.body;
                        if (res.code === 200) {
                            this.user = res.data;
                            localStorage.setItem("user_info", JSON.stringify(this.user));
                        }
                    });
                }
            },
            getBookReview() {
                let book_id = this.$route.params.id;
                this.$http.get(review_url + book_id, {
                    params: {
                        sort: this.review_sort,
                        p: this.reviews.page.page,
                        count: this.reviews.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.reviews.body = data.body.data.body;
                    this.reviews.page.total = data.body.data.total;
                    this.reviews.page.page = data.body.data.page;
                    this.reviews.page.count = data.body.data.count;
                });
            },
            isEmpty(array) {
                return JSON.stringify(array) !== '[]';
            },
            summaryShowToggle() {
                this.summary_show = !this.summary_show;
            },
            contentShowToggle() {
                this.content_show = !this.content_show;
            },
            getBookDetail(id) {
                return "subject/" + id;
            },
            gotoReview(id) {
                return "https://book.douban.com/review/" + id;
            },
        },
        created() {
            if (this.checkMedia()) {
                this.pager_count = 5;
            }
            this.getBook();
            this.getBookComment();
            this.getBookReview();
            this.getBookAnnotation();
            // this.getUserInfo();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/bookDetail'
</style>
