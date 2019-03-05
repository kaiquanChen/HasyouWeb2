<template>
    <div class="annual">
        <AnnualHeader></AnnualHeader>
        <div class="annual-items">
            <div class="annual-item" v-for="item in body" :key="item.id">

            </div>
        </div>
    </div>
</template>
    
<script>
    import global_ from "./config/Global"
    
    const BOOK_ANNUAL_URL = global_.URLS.BOOK_ANNUAL_URL;
    import AnnualHeader from "./AnnualHeader"
    export default {
        name: "book",
        data() {
            return {
                page: {
                    p: 1,
                    count: 10,
                    total: 0
                },
                body:[],
                web: true,
                year: ""
            }
        },
        components:{AnnualHeader},
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
                }).then( data => {
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
                return "/book/subject/" + id;
            },
            checkMedia() {
                return window.matchMedia('(max-width:415px)').matches;
            },
            handleSelect(index) {
                window.location.href = "#" + index;
            }
        },
        created() {
        // this.$router.push({path: "/book/books"});
            this.getAnnualBookList();
        }
    }
</script>

<style lang="scss" scoped>
</style>
    