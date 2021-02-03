<template>
    <div class="movie-genre-stats">
        <h3 class="title">看过的标签 · · · · · ·</h3>
        <div class="movie-genre-list" v-if="genres">
            <div :class="getClass(item.id)" v-for="(item, index) in genres">
                <span @click="selectGenre(item.id)" class="genre-name"><a>{{item.name}}</a></span>
                <span class="genre-movie-count">{{item.subject_count}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import global_ from "../config/Global";
import bus from "../../js/bus";

const movie_genre_stats_url = global_.URLS.MOVIE_GENRE_STATS_URL

export default {
    name: "MovieGenreStats",
    props: ["user_id"],
    data() {
        return {
            select_genre_id: null,
            genres: []
        };
    },
    methods: {
        selectGenre(genre_id) {
            this.select_genre_id = genre_id;
            bus.$emit("select_genre_id", genre_id);
        },
        findMovieGenres() {
            this.$http.get(movie_genre_stats_url, {
                params: {
                    userId: this.user_id
                },
                headers: {
                    "bid": global_.FUNC.getBid(),
                    "X-HASYOU-TOKEN": this.token
                }
            }).then((data) => {
                if (data.body.code !== 200) {
                    this.$message.error("数据获取失败");
                    return;
                }
                this.genres = data.body.data;
            });
        },
        getClass(genre_id) {
            return genre_id === this.select_genre_id ? "genre-item on" : "genre-item";
        }
    },
    mounted() {
        this.findMovieGenres();
    }
}
</script>

<style lang="scss" scoped>
    @import './css/movieGenreStats';
</style>
