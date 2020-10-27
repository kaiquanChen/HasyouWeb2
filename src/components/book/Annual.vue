<template>
    <div id="book-annual">
        <div :style="getBackground(item)" v-for="item in body" :key="item.id"></div>
    </div>
</template>

<script>
    import global_ from "../config/Global"

    const BOOK_URL = global_.URLS.BOOK_URL;
    const tag_url = global_.URLS.DOUBAN_BOOK_TAG_URL;
    const BOOK_ANNUAL_URL = global_.URLS.BOOK_ANNUAL_URL;
    export default {
        name: "book",
        data() {
            return {
                page: {
                    p: 1,
                    count: 10,
                    total: 0
                },
                body: [],
                web: true,
                year: ""
            };
        },
        methods: {
            getAnnualBookList() {
                this.year = this.$route.params.year;
                this.$http.get(BOOK_ANNUAL_URL + this.year, {
                    headers: {
                        bid: global_.FUNC.getBid()
                    },
                    params: {
                        p: this.page.p,
                        count: this.page.count
                    }
                }).then(data => {
                    if (data.body.code !== 200) {
                        this.$message.error("数据获取失败!");
                        return;
                    }

                    this.page.p = data.body.data.page;
                    this.page.count = data.body.data.count;
                    this.page.total = data.body.data.total;
                    this.body = data.body.data.body;
                });
            },
            getBookDetail(id) {
                return "subject/" + id;
            },
            getBackground(item) {
                if (item.payload.mobile_background_img) {
                    return "backgroud: url(" + item.payload.mobile_background_img + ")";
                } else {
                    return "";
                }
            },
            checkMedia() {
                return window.matchMedia('(max-width:415px)').matches;
            },
            gotoBooks() {
                this.$router.push({path: "/book/books"});
            },
        },
        created() {
            this.getAnnualBookList();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/annual'
</style>
