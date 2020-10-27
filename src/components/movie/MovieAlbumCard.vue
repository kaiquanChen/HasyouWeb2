<template>
    <el-row class="movie-album-card">
        <el-col :span="8">
            <el-row>
                <el-col :span="12">
                    <a class="album-item" href="#">
                        <img class="album-cover" :src="item.cover" :alt="item.name"/>
                    </a>
                </el-col>
                <el-col :span="12">
                    <a href="#"><span class="card-title">{{item.name}}</span></a><br/>
                    <span class="card-progress" v-if="user">看过：{{item.watched_cont}} / {{item.album_item_cont}}</span>
                    <span class="card-info" v-else>共{{item.album_item_cont}}部</span><br/>
                    <img src="/static/image/quotel.png"/>
                    <a-tooltip placement="right">
                        <template slot="title">
                            {{item.description}}
                        </template>
                        <span class="card-description">{{item.description}}</span>
                    </a-tooltip>
                    <img src="/static/image/quoter.png"/>
                </el-col>
            </el-row>
            <el-row>
                <div class="item-info" v-if="active_movie">
                    <strong>{{active_movie.title}}</strong>
                    <span>{{active_movie.summary}}</span>
                </div>
            </el-row>
        </el-col>
        <el-col :span="16">
            <el-carousel :interval="3000" @change="changeCard" type="card" heigit="150px;" style="padding: 10px;">
                <el-carousel-item v-for="single_item in item.items" :key="single_item.movie_id">
                    <img style="width: 100%;" class="album-item-single-img" :src="single_item.image_url"/>
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
                active_movie: {}
            }
        },
        methods: {
            initUserInfo() {
                this.user = _global.FUNC.getUserInfo();
            },
            changeCard(index) {
                if (this.movies && this.movies.length > 0) {
                    this.active_movie = this.movies[index];
                }
            },
            initData() {
                this.initUserInfo();
                this.movies = this.item.items;
                if (this.movies && this.movies.length > 0) {
                    this.active_movie = this.movies[0];
                }
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
