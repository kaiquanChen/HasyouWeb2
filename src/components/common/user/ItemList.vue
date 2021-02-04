<template>
    <div id="item-list">
        <h1>{{title}}</h1>
        <div class="items">
            <MovieRecordItem :movie="item" v-for="item in items" :key="item.movie_id" />
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
    import MovieRecordItem from "../../movie/MovieRecordItem";
    import Bus from "../../../js/bus";

    let list_item_url = global_.URLS.COMMON_URL;
    const token = localStorage.getItem("access_token")
    export default {
        components: {
            MovieRecordItem: MovieRecordItem
        },
        data() {
            return {
                select_genre_id: null,
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
                if (time) {
                    return time.split(" ")[0];
                }
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
                let params = {
                    type: this.type,
                    page_size: this.page.count,
                    page_no: this.page.page,
                };
                if (this.type === "WATCHED_MOVIE") {
                    url += "movie/record";
                    this.title = "我看过的电影";
                    params['uid'] = this.$route.params.id;
                    params['genre_id'] = this.select_genre_id;
                    Bus.$emit('show-movie-stats', true);
                } else if (this.type === "READ_BOOK") {
                    url += "book/record";
                    this.title = "我读过的书";
                    params['uid'] = this.$route.params.id;
                } else if (this.type === 'COMMON_INTEREST') {
                    url += "movie/record/interest";
                    this.title = "共同爱好";
                    params['user_id_others'] = this.getUser().id;
                }
                this.$http.get(url, {
                    params: params,
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    this.items = data.body.data.body;
                    this.page.page = data.body.data.page;
                    this.page.count = data.body.data.count;
                    this.page.total = data.body.data.total;
                });
            },
            getUser() {
                let uid = this.$route.params.id;
                let user_json_str = localStorage.getItem(uid);
                return JSON.parse(user_json_str)
            },
            getMessage() {
                Bus.$on("select_genre_id", response => {
                    if (this.select_genre_id !== response) {
                        this.select_genre_id = response;
                        this.page.page = 1;
                        this.getItemList();
                    }
                });
            }
        },
        mounted() {
            this.type = this.$route.params.type;
            this.getItemList();
        },
        created() {
            this.getMessage()
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/itemList';
</style>
