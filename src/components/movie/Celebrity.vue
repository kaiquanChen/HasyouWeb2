<template>
    <div id="block">
        <div id="celebrity-info">
            <h1 class="celebrity-name">{{celebrity.name}}（{{celebrity.nameEn}}）</h1>
            <div class="celebrity-info-body">
                <div class="celebrity-info-body-avatar">
                    <img :src="celebrity.avatar" :alt="celebrity.name" />
                </div>
                <div class="celebrity-info-item">
                    性别: <span class="celebrity-info-item-text">{{celebrity.gender}}</span><br>
                    星座: <span class="celebrity-info-item-text">{{celebrity.constellation}}</span><br>
                    出生日期: <span class="celebrity-info-item-text">{{celebrity.birthday}}</span><br>
                    出生地: <span class="celebrity-info-item-text">{{celebrity.bornPlace}}</span><br>
                    职业: <span class="celebrity-info-item-text">{{celebrity.professions}}</span><br>
                    更多外文名: <span class="celebrity-info-item-text">{{celebrity.aka}}</span><br>
                    更多中文名: <span class="celebrity-info-item-text">{{celebrity.akaEn}}</span><br>
                </div>
            </div>
            <div class="celebrity-info-summary">
                <h3 class="summary-title">个人简介</h3>
                <span>{{celebrity.summary}}</span>
            </div>
        </div>
        <h2 id="celebrity-title">{{celebrity.name}}演艺生涯</h2>
        <el-timeline>
            <el-timeline-item :timestamp="work.year" placement="top" v-for="work in celebrity.works" :key="work.id">
                <el-card>
                    <h4>{{work.title}}（{{work.original_title}}）</h4>
                    <div class="movie-item-card">
                        <div class="movie-item-card-left">
                            <img class="work-item-img" :src="work.image_url" :alt="work.title"/>
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
                            <span class="celebrity-info-item-text">{{work.summary}}</span>
                        </div>
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    export default {
        name: "Celebrity",
        methods: {
            getStars(stars) {
                return stars / 2;
            },
        },
        data() {
            return {
                celebrity: {
                    id: "1315103",
                    name: "金晨",
                    nameEn: "Gina Jin",
                    gender: "女",
                    summary: "金晨，1990年9月5日出生于山东济南，毕业于北京舞蹈学院民族舞、音乐剧专业，中国大陆女演员、平面模特...",
                    constellation: "处女座",
                    birthday: "1990-09-05",
                    bornPlace: "中国,山东,济南",
                    aka: "大喜",
                    akaEn: "Jin Chen / Gina",
                    avatar: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1592367274.69.webp",
                    professions: "演员 / 配音",
                    website: "weibo.com/1713031610",
                    works: [
                        {
                            id: "5130727",
                            title: "只要你好",
                            original_title: "只要你好",
                            role: "导演 / 演员",
                            content: "2015 / 2016-02-18(中国大陆) / 96分钟 / 日本",
                            image_url: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1592367274.69.webp",
                            year: 2019,
                            average: 9.2,
                            summary: "金晨，1990年9月5日出生于山东济南，毕业于北京舞蹈学院民族舞、音乐剧专业，中国大陆女演员、平面模特..."
                        },
                        {
                            id: "5130727",
                            title: "只要你好",
                            original_title: "只要你好",
                            role: "导演 / 演员",
                            content: "2015 / 2016-02-18(中国大陆) / 96分钟 / 日本",
                            image_url: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1592367274.69.webp",
                            year: 2020,
                            average: 9.2,
                            summary: "金晨，1990年9月5日出生于山东济南，毕业于北京舞蹈学院民族舞、音乐剧专业，中国大陆女演员、平面模特..."
                        }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/celebrity';
</style>
