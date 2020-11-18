<template>
    <div id="block">
        <div id="celebrity-info">
            <h1 class="celebrity-name">
                <span>{{celebrity.name}}</span>
                <span v-if="celebrity.name_en">（{{celebrity.name_en}}）</span>
            </h1>
            <div class="celebrity-info-body">
                <div class="celebrity-info-body-avatar">
                    <img :src="celebrity.avatar" :alt="celebrity.name" />
                </div>
                <div class="celebrity-info-item">
                    <span v-if="celebrity.gender">性别: </span><span class="celebrity-info-item-text" v-if="celebrity.gender">{{celebrity.gender}}</span><br>
                    <span v-if="celebrity.constellation">星座: </span><span class="celebrity-info-item-text" v-if="celebrity.constellation">{{celebrity.constellation}}</span><br>
                    <span v-if="celebrity.birthday">出生日期: </span><span class="celebrity-info-item-text" v-if="celebrity.birthday">{{celebrity.birthday}}</span><br>
                    <span v-if="celebrity.born_place">出生地: </span><span class="celebrity-info-item-text" v-if="celebrity.born_place">{{celebrity.born_place}}</span><br>
                    <span v-if="celebrity.professions">职业: </span><span class="celebrity-info-item-text" v-if="celebrity.professions">{{celebrity.professions}}</span><br>
                    <span v-if="celebrity.aka">更多外文名: </span><span class="celebrity-info-item-text" v-if="celebrity.aka">{{celebrity.aka}}</span><br>
                    <span v-if="celebrity.website">官方网站: </span><span class="celebrity-info-item-text" v-if="celebrity.website">{{celebrity.website}}</span>
                </div>
            </div>
            <div class="celebrity-info-summary">
                <h2 class="summary-title">个人简介</h2>
                <span>{{celebrity.summary}}</span>
            </div>
        </div>
        <h2 id="celebrity-title">{{celebrity.name}}的演艺作品</h2>
        <el-timeline>
            <el-timeline-item color="#007722" :timestamp="work.year" placement="top" v-for="(work, index) in celebrity.works" :key="work.movie_id">
                <el-card>
                    <h4>
                        <span>{{index + 1}}. </span>
                        <span class="movie-title" @click="gotoMovieDetail(work.movie_id)">{{work.movie_name}}</span>
                        <span class="movie-title" @click="gotoMovieDetail(work.movie_id)" v-if="work.movie_original_name">（{{work.movie_original_name}}）</span>
                    </h4>
                    <div class="movie-item-card">
                        <div class="movie-item-card-left">
                            <img @click="gotoMovieDetail(work.movie_id)" class="work-item-img" :src="work.movie_image" :alt="work.movie_name"/>
                        </div>
                        <div class="movie-item-card-right">
                            <el-rate
                                class="info-item"
                                :value="getStars(work.average)"
                                :score-template="work.average + ''"
                                show-score
                                disabled
                                text-color="#ff9900">
                            </el-rate>
                            角色: <span class="celebrity-info-item-text">{{work.role}}</span><br><br>
                            简介: <span class="celebrity-info-item-text">{{work.content}}</span><br>
                            <a-tooltip placement="right">
                                <template slot="title">
                                    {{work.summary}}
                                </template>
                                <span style="display: -webkit-box;
                                        overflow: hidden;
                                        white-space: normal !important;
                                        text-overflow: ellipsis;
                                        word-wrap: break-word;
                                        -webkit-line-clamp: 3;
                                        -webkit-box-orient: vertical;
                                        font-size: 16px;" class="celebrity-info-item-text">{{work.summary}}</span>
                            </a-tooltip>
                        </div>
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    import global_ from "../config/Global";

    const token = localStorage.getItem("access_token");

    export default {
        name: "Celebrity",
        methods: {
            getStars(stars) {
                return stars / 2;
            },
            initData() {
                let celebrity_id = this.$route.params.id;
                this.$http.get(global_.URLS.DOUBAN_CELEBRITY, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    },
                    params: {
                        celebrityId: celebrity_id
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }
                    this.celebrity = data.body.data;
                });
            },
            gotoMovieDetail(movie_id) {
                let path = "/movie/subject/" + movie_id;
                let url = this.$router.resolve({path: path});
                window.open(url.href, '_blank');
            },
        },
        data() {
            return {
                celebrity: null
            }
        },
        created() {
            this.initData();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/celebrity';
</style>
