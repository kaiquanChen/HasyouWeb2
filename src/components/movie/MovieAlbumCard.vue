<template>
    <el-row class="movie-album-card">
        <div class="title-frame">
            <img src="/static/icon/movie_album_top.png" />
            <div class="album-summary" @click="gotoMovieAlbum(item.id)">
                <a href="#">{{item.name}}</a>&emsp;&emsp;
            </div>
            <div class="album-summary-sum">
                <span class="album-summary-sum" v-if="user">已看&nbsp;{{item.watched_count}} / {{item.album_item_count}}</span>
                <span class="album-summary-sum" v-else>共{{item.album_item_count}}部</span>
            </div>
        </div>
        <el-col :span="8" class="card-left" @click="gotoMovieDetail(active_movie.movie_id)">
            <el-col :span="12">
                <a class="album-item" target="_blank">
                    <img class="album-cover"
                         @click="gotoMovieDetail(active_movie.movie_id)"
                         :src="active_movie.image_url"
                         :alt="active_movie.title"/>
                </a>
            </el-col>
            <el-col :span="12" class="card-right">
                <a class="card-title-a" href="#"><strong class="card-title">{{active_movie.title}}</strong></a><br/>
                <img src="/static/icon/quote_left.png"/>
                <a-tooltip placement="right">
                    <template slot="title">
                        {{active_movie.summary}}
                    </template>
                    <span class="card-description">{{active_movie.summary}}</span>
                </a-tooltip>
                <img src="/static/icon/quote_right.png"/>
            </el-col>
        </el-col>
        <el-col :span="16">
            <el-carousel :interval="3000" @change="changeCard" type="card" height="150px" style="padding: 10px;">
                <el-carousel-item style="max-width: 100px;display: inline-block" v-for="(single_item, index) in item.items" :key="single_item.movie_id">
                    <img class="preview-badge" src="/static/icon/annual_badge.png" alt="badge">
                    <span class="preview-no">{{single_item.average}}</span>
                    <a-tooltip placement="right">
                        <template slot="title">
                            {{single_item.summary}}
                        </template>
                        <img @click="gotoMovieDetail(single_item.movie_id)" ref="carousel_img" class="album-item-single-img" :src="single_item.image_url"/>
                    </a-tooltip>
                </el-carousel-item>
            </el-carousel>
        </el-col>
    </el-row>
</template>

<script>
    import _global from "../config/Global";

    export default {
        name: "MovieAlbumCard",
        props: ["item"],
        data() {
            return {
                user: null,
                movies: [],
                active_movie: {},
                carouseId: 0
            }
        },
        methods: {
            initUserInfo() {
                this.user = _global.FUNC.getUserInfo();
            },
            changeCard(index, index2) {
                if (this.movies && this.movies.length > 0) {
                    this.active_movie = this.movies[index];
                }
                this.carouseId = index;
            },
            initData() {
                this.initUserInfo();
                this.movies = this.item.items;
                if (this.movies && this.movies.length > 0) {
                    this.active_movie = this.movies[0];
                }
            },
            gotoMovieDetail(movie_id) {
                let path = "/movie/subject/" + movie_id;
                let url = this.$router.resolve({path: path});
                window.open(url.href, '_blank');
            },
            gotoMovieAlbum(album_id) {
                let path = "/movie/album/" + album_id;
                let url = this.$router.resolve({path: path});
                window.open(url.href, '_blank');
            }
        },
        created() {
            this.initData();
        }
    }
</script>

<style scoped>
    @import './css/movieAlbumCard.scss';
</style>
