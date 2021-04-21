<template>
    <div class="movie-record-item">
        <div class="movie-record-item-left">
            <img @click="gotoMovieDetail(movie)" :alt="movie.name" class="movie-image" :src="movie.image_url" />
        </div>
        <div class="movie-record-item-right">
            <div class="container-info">
                <span @click="gotoMovieDetail(movie)" class="info-name">{{movie.title}}</span>
            </div>
            <span class="info info-description">{{movie.summary}}</span>
            <div class="rate-time" v-if="movie.stars && movie.stars > 0">
                <el-rate
                    class="primary-rate"
                    :value="movie.stars"
                    :score-template="movie.stars * 2 + ''"
                    show-score
                    disabled
                    text-color="#ff9900">
                </el-rate>
                <span class="info-time">{{movie.create_time}}</span>
            </div>
            <div class="rate-time" v-else>
                <span class="unrate-notice">（该用户未给出评论）</span>
                <span class="info-time">{{movie.create_time}}</span>
            </div>
            <div class="container-comment" v-if="movie.content && movie.content.trim()">
                <span class="info info-comment" v-if="spread">{{movie.content}}</span>
                <span class="info info-comment" v-else>{{simplifyContent(movie.content)}}</span>
                <a class="spread-button" @click="toggleSpread()" v-if="spread">(收起)</a>
                <a class="spread-button" @click="toggleSpread()" v-else>(展开)</a>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "MovieRecordItem",
        props: ["movie"],
        data() {
            return {
                spread: false
            }
        },
        methods: {
            gotoMovieDetail(movie) {
                let url = this.$router.resolve({path: '/movie/subject/' + movie.movie_id});
                window.open(url.href, "_blank");
            },
            getStars(stars) {
                return stars / 2;
            },
            simplifyContent(value) {
                if (!value) {
                    return "";
                }
                return value.substring(0, 30) + ".....";
            },
            toggleSpread() {
                this.spread = !this.spread;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/movieRecordItem.scss';
</style>
