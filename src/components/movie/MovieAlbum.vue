<template>
    <div id="movie-album">
        <MovieAlbumCard :item="item" v-for="item in albums" :key="item.id"/>
        <div class="pagination" style="text-align: center;margin-top: 10px;margin-bottom: 30px">
            <el-pagination
                class="album-pagination"
                @current-change="handleCurrentChange"
                :page-size="page.count"
                layout="prev, pager, next"
                :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import MovieAlbumCard from "./MovieAlbumCard";
    import global_ from "../config/Global";

    export default {
        name: "MovieAlbum",
        data() {
            return {
                albums: [],
                page: {
                    page: 1,
                    count: 10,
                    total: 0
                },
                token: ""
            }
        },
        components: {
            "MovieAlbumCard": MovieAlbumCard
        },
        methods: {
            listAlbum() {
                this.$http.get(global_.URLS.MOVIE_ALBUM_LIST_URL, {
                    params: {
                        page_no: this.page.page,
                        page_size: this.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": this.token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.albums = data.body.data.body;
                    this.page.total = data.body.data.total;
                    this.page.page = data.body.data.page;
                    this.page.count = data.body.data.count;
                });
            },
            initUserToken() {
                this.token = global_.FUNC.getToken();
            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.listAlbum();
            }
        },
        created() {
            this.initUserToken();
            this.listAlbum();
        }
    }
</script>

<style scoped>

</style>
