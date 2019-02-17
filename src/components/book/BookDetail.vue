<template>
    <div id="book-detail">
      <div class="left"></div>
      <div class="book-info center">
          <h1 class="book-title">{{data.name}}</h1>
          <div class="content">
            <div class="avatar">
              <a target="_blank" :href="data.image.small"><img :src="data.image.small" :alt="data.name"></a>
            </div>
            <div class="info">

            </div>
            <div class="rate">

            </div>
          </div>
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
  const token = sessionStorage.getItem("access_token");
  export default {
    name: "Book",
    methods: {
      toggleReviewNav(review_sort) {
        if (this.sort === review_sort) {
          return;
        }
        this.review_selected = !this.review_selected;
        this.review_sort = review_sort;
        this.getBookReview();
      },
      toggleCommentNav(comment_sort) {
        if (this.sort === comment_sort) {
          return;
        }
        this.comment_selected = !this.comment_selected;
        this.comment_sort = comment_sort;
        this.getBookComment();
      },
      getImage(data) {
        if (data.image_url) {
          return data.image_url;
        } else if (data.image) {
          return data.image.medium;
        } else {
          return "";
        }
      },
      checkMedia() {
        return window.matchMedia('(max-width:415px)').matches;
      },
      handleCurrentChange(val) {
        this.comments.page.page = val;
        this.getBookComment();

        this.goAnchor("#book-comment");
      },
      handleCurrentChange2(val) {
        this.reviews.page.page = val;
        this.getBookReview();

        this.goAnchor("#book-review");
      },
      getOriginRoutes(id) {
        return "https://book.douban.com/subject/" + id;
      },
      getBook() {
        let book_id = this.$route.params.id;
        const book_detail_url = book_url + "subject/" + book_id;
        this.$http.get(book_detail_url, {
          headers: {
            "bid": global_.FUNC.getBid(),
            "X-HASYOU-TOKEN":token
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
            "X-HASYOU-TOKEN":token
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
          params:{
            sort: this.comment_sort,
            p: this.comments.page.page,
            count: this.comments.page.count
          },
          headers: {
            "bid": global_.FUNC.getBid(),
            "X-HASYOU-TOKEN":token
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
      getBookReview() {
        let book_id = this.$route.params.id;
        this.$http.get(review_url + book_id, {
          params:{
            sort: this.review_sort,
            p: this.reviews.page.page,
            count: this.reviews.page.count
          },
          headers: {
            "bid": global_.FUNC.getBid(),
            "X-HASYOU-TOKEN":token
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
      readBook() {
        if (token) {
          this.$http.post(read_url, {
            body: {
              book_id: this.$route.params.id
            }
          }, {
            headers: {
              bid: global_.FUNC.getBid(),
              "X-HASYOU-TOKEN":token
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
          this.$router.push({path: "/login"});
        }
      },
      wantReadBook() {
        let token = sessionStorage.getItem("access_token");
        if (token) {
          this.$http.post(want_url, {
            body: {
              book_id: this.$route.params.id
            }
          }, {
            headers: {
              bid: global_.FUNC.getBid(),
              "X-HASYOU-TOKEN":token
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
          this.$router.push({path: "/login"});
        }
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
    data() {
      return {
        review_selected: true,
        review_sort: 'hot',
        comment_selected: true,
        comment_sort: 'hot',
        data: {},
        comments: {
          body:[],
          page:{
            total: 0,
            page: 1,
            count: 20
          }
        },
        reviews: {
          body:[],
          page:{
            total: 0,
            page: 1,
            count: 10
          }
        },
        pager_count: 7,
        summary_show: false,
        content_show: false
      }
    },
    created() {
      if (this.checkMedia()) {
        this.pager_count = 5;
      }
      this.getBook();
    //   this.getBookReview();
    //   this.getBookComment();
    }
  }
</script>

<style lang="scss" scoped>
    @import './css/bookDetail'
</style>
