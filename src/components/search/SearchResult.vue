<template>
    <div id="search-result" v-title data-title="测试title">
        <div class="left"></div>
        <div class="center">
            <div class="center-left">
                <h1>搜索<span class="high-light">{{keywords}}</span>共<span class="high-light">{{page.total}}</span>个结果
                </h1>
                <div class="results">
                    <div class="result-item" v-for="item in items" :key="item.subject_id">
                        <div class="result-item-info">
                            <div class="item-info">
                                <!-- <span class="title" v-if="item.type === 'book'">
                                    [图书]&nbsp;
                                    <a target="_blank" :href="getDetail(item)">{{item.name}}</a>
                                </span> -->
                                <span class="title">
                                    [电影]&nbsp;
                                    <a target="_blank" :href="getDetail(item)">{{item.title}}</a>
                                </span>
                                <el-rate
                                    class="primary-rate"
                                    :value="getStars(item.average)"
                                    :score-template="item.average + ''"
                                    show-score
                                    disabled
                                    text-color="#ff9900">
                                </el-rate>
                            </div>
                            <div class="item-info2">
                                <span class="it" v-if="item.content">
                                    {{item.content}}
                                </span><br/>
                                <span class="it" v-if="item.stars">
                                    {{item.stars}}
                                </span><br/>
                            </div>
                            <span class="intro text-info">{{item.summary}}</span>
                        </div>
                        <div class="result-item-image">
                            <a target="_blank" :href="item.image_url"><img :src="item.image_url" :alt="item.name"/></a>
                        </div>
                    </div>
                    <div class="pagination">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            layout="prev, pager, next"
                            :total="page.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="center-right"></div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
    import Bus from '../../js/bus'

    export default {
        name: "book",
        data() {
            return {
                keywords: "",
                items: [],
                page: {
                    total: 0,
                    p: 1,
                    count: 0
                },
                pager_count: 7
            };
        },
        methods: {
            getStars(stars) {
                return stars / 2;
            },
            getAverage(average) {
                return average.toString();
            },
            checkMedia() {
                return window.matchMedia('(max-width:600px)').matches;
            },
            getMessage() {
                Bus.$on("search-on", response => {
                    this.items = response.body;
                    this.page.p = response.page;
                    this.page.count = response.count;
                    this.page.total = response.total;
                    this.keywords = response.keywords;
                });
            },
            getDetail(item) {
                return "/movie/subject/" + item.subject_id;
                // if (item.type === "book") {
                //   return "/book/subject/" + item.id;
                // } else if (item.type === "movie") {
                //   return "/movie/subject/" + item.id;
                // }
            },
            handleCurrentChange(val) {
                this.page.p = val;
                Bus.$emit("request-page", {
                    p: val,
                    count: this.page.count,
                    total: this.page.total,
                    keywords: this.keywords
                });
            }
        },
        created() {
            this.getMessage();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/searchResult'
</style>
