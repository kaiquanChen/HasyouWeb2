<template>
    <div class="movie-record-item">
        <div class="movie-record-item-left">
            <img @click="gotoMovieDetail(movie)" :alt="movie.name" class="movie-image" :src="movie.image_url" />
        </div>
        <div class="movie-record-item-right">
            <div class="container-info">
                <span class="info-name">{{movie.title}}</span>
            </div>
            <span class="info info-description">{{movie.summary}}</span>
            <div class="rate-time">
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
            <span class="info info-comment" v-if="spread">{{movie.content}}</span>
            <span class="info info-comment" v-else>{{simplifyContent(movie.content)}}</span>
            <a class="spread-button" @click="toggleSpread()" v-if="spread">(收起)</a>
            <a class="spread-button" @click="toggleSpread()" v-else>(展开)</a>
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
                this.$router.push({path: '/movie/subject/' + movie.id});
            },
            getStars(stars) {
                return stars / 2;
            },
            simplifyContent(value) {
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
