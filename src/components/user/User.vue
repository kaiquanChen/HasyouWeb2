<template>
    <div id="user-center">
        <div class="user-center-left"></div>
        <div class="user-center-center" v-if="user">
            <h1 class="user-info">
                <a target="_blank" :href="user.avatar"><img :src="user.avatar" :alt="user.nickname"></a>
                &nbsp;{{user.nickname}}
            </h1>
            <ul class="user-menu-items">
                <li class="user-menu-item">
                    <a :href="gotoUserHome()">个人主页</a>
                </li>
                <li class="user-menu-item">
                    <a :href="gotoUserRecord('READ_BOOK')">读书</a>
                </li>
                <li class="user-menu-item">
                    <a :href="gotoUserRecord('WATCHED_MOVIE')">观影</a>
                </li>
                <li class="user-menu-item" v-if="self">
                    <a :href="gotoUserAlbums()">相册</a>
                </li>
                <li class="user-menu-item" v-if="self">
                    <a :href="gotoUserNotes()">笔记</a>
                </li>
            </ul>
            <router-view :user="user"></router-view>
        </div>
        <div class="user-center-right">
            <div class="user-center-right-content" v-if="show_movie_genre_stats">
                <MovieGenreStats :user_id="user.id" />
            </div>
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import MovieGenreStats from "./MovieGenreStats";
    import Bus from "../../js/bus";

    const book_record_url = global_.URLS.BOOK_RECORD_URL;
    const movie_record_url = global_.URLS.MOVIE_RECORD_URL;
    const note_url = global_.URLS.NOTE_URL;
    const user_info_url = global_.URLS.user_info_url;
    const token = localStorage.getItem("access_token");
    export default {
        name: "book",
        components: {
            MovieGenreStats: MovieGenreStats
        },
        data() {
            return {
                show_movie_genre_stats: false,
                show_note_labels: false,
                user: null,
                read_books: null,
                want_books: null,
                watched_movies: null,
                want_movies: null,
                albums: null,
                notes: null,
                blogs: null,
                self: null
            };
        },
        methods: {
            gotoUserNotes() {
                return "/user/" + this.user.uid + "/notes";
            },
            gotoUserHome() {
                return "/user/" + this.user.uid;
            },
            gotoUserAlbums() {
                return "/user/" + this.user.uid + "/albums";
            },
            gotoUserRecord(type) {
                return "/user/" + this.user.uid + "/subjects/" + type;
            },
            gotoAlbumUpload() {
                return "/user/" + this.user.uid + "/album/upload";
            },
            getRecordCount(list) {
                if (list) {
                    return list.total;
                } else {
                    return 0;
                }
            },
            getMessage() {
                Bus.$on("show-movie-stats", response => {
                    this.show_movie_genre_stats = response;
                });
            },
            async getUserInfo() {
                let uid = this.$route.params.id;
                let user = await global_.FUNC.getUserInfoByUid(uid);
                this.user = user;
                localStorage.setItem(uid, JSON.stringify(user))
                this.self = user && user.uid === this.user.uid;
            }
        },
        async mounted() {
            await this.getUserInfo();
        },
        created() {
            this.getMessage();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/user.scss';
</style>
