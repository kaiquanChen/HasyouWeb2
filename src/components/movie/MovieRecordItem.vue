<template>
    <div class="movie-record-item">
        <div class="movie-record-item-left">
            <img @click="gotoMovieDetail(movie)" :alt="movie.name" class="movie-image" :src="movie.image_url" />
        </div>
        <div class="movie-record-item-right">
            <div class="container-info">
                <span class="info-name">{{movie.name}}</span>
            </div>
            <span class="info info-description">{{movie.summary}}</span>
            <div class="rate-time">
                <el-rate
                    class="primary-rate"
                    :value="getStars(movie.average)"
                    disabled
                    text-color="#ff9900">
                </el-rate>
                <span class="info-time">{{movie.create_time}}</span>
            </div>
            <span class="info info-comment">{{movie.comment}}</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: "MovieRecordItem",
        // props: ["movie"],
        data() {
            return {
                movie: {
                    id: "1300056",
                    name: "肖申克的救赎",
                    image_url: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2564579500.jpg",
                    average: 7.7,
                    create_time: "2021-01-22 09:30:20",
                    summary: "1986-08-30(蒙特利尔电影节) / 普里西拉·珀伊特 / 弗兰西斯·贝 / 布拉德·道里夫 / 杰克·南斯 / Fred Pickler / 安哲罗·巴达拉曼提 / Michelle Sasser / 摩西吉普森 / Peter Carew / 美国 / 大卫·林奇 / 120 分钟 / 蓝丝绒 / 犯罪 / 悬疑 / 惊悚 / 大卫·林奇 David Lynch / 英语",
                    comment: "一个想当赛车手的蜗牛；一对儿卖taco的墨西哥兄弟以及一个生意不太好的社区（做指甲的少数族裔，年老的商店主，修车铺）。蜗牛发生变异获得超速度，墨西哥小弟异想天开带它去参加赛车，几经起伏后赢了。非常老套，非常鸡汤。唯一令人印象深刻的是最后出字幕的方式。非常有创意。"
                }
            }
        },
        methods: {
            gotoMovieDetail(movie) {
                this.$router.push({path: '/movie/subject/' + movie.id});
            },
            getStars(stars) {
                return stars / 2;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/movieRecordItem.scss';
</style>
