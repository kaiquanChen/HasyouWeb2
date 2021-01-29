<template>
    <div id="movie-detail" v-title data-title="测试title">
        <div class="left">
            <h1 class="movie-title">{{data.title}}
                <span class="movie-year" v-if="data.year && data.year.length > 0">
            ({{data.year}})
          </span>
            </h1>
            <div class="content">
                <div class="avatar">
                    <a target="_blank" v-if="data.image_url" :href="data.image_url">
                        <img :src="data.image_url" :alt="data.title">
                    </a>
                    <div class="user-operation" v-if="!data.operations || data.operations.length === 0">
                        <span class="read" @click="watchMovie()">看过</span>
                        <span class="want-read" @click="wantMovie()">想看</span>
                    </div>
                    <div class="operation-div" v-else>
              <span class="operate"
                    v-for="operate in data.operations"
                    v-if="operate.operation === 'READ_BOOK'">已看</span>
                        <span class="operate"
                              v-for="operate in data.operations"
                              v-if="operate.operation === 'WANT_BOOK'">已加入要看计划</span>
                    </div>
                    <span class="update" @click="updateMovie()" v-if="user && user.id == 1">更新</span>
                </div>
                <div class="info">
                    <div v-if="directors && directors.length > 0">
                        <label>导演:</label>
                        <span v-for="(director, index) in directors" :key="director.id">
                <a class="movie-director" target="_blank" :href="gotoCelebrityDetail(director.id)" v-if="index < directors.length - 1">{{director.name}} <i>/ </i></a>
                <a class="movie-director" target="_blank" :href="gotoCelebrityDetail(director.id)" v-else>{{director.name}}</a>
              </span>
                    </div>
                    <div v-if="writers && writers.length > 0">
                        <label>编剧:</label>
                        <span v-for="(writer, index) in writers" :key="writer.id">
                <a class="movie-writer" target="_blank" :href="gotoCelebrityDetail(writer.id)" v-if="index < writers.length - 1">{{writer.name}} <i>/ </i></a>
                <a class="movie-writer" target="_blank" :href="gotoCelebrityDetail(writer.id)" v-else>{{writer.name}}</a>
              </span>
                    </div>
                    <div v-if="casts && casts.length > 0" v-show="!show_full_casts">
                        <label>主演:</label>
                        <span v-for="(cast, index) in casts" :key="cast.id" v-if="index < 3">
                            <a class="movie-cast" target="_blank" :href="gotoCelebrityDetail(cast.id)" v-if="index < casts.length - 1">{{cast.name}} <i>/ </i></a>
                            <a class="movie-cast" target="_blank" :href="gotoCelebrityDetail(cast.id)" v-else>{{cast.name}}</a>
                        </span>
                        <a class="load-more" @click="loadMore()" v-if="casts.length > 0">更多...</a>
                    </div>
                    <div v-if="casts && casts.length > 0" v-show="show_full_casts">
                        <label>主演:</label>
                        <span v-for="(cast, index) in casts" :key="cast.id">
                <a class="movie-cast" target="_blank" :href="gotoCelebrityDetail(cast.id)" v-if="index < casts.length - 1">{{cast.name}} <i>/ </i></a>
                <a class="movie-cast" target="_blank" :href="gotoCelebrityDetail(cast.id)" v-else>{{cast.name}}</a>
              </span>
                    </div>
                    <div v-if="data.genres && data.genres.length > 0">
                        <label>类型:</label>
                        <span v-for="(genre, index) in data.genres" :key="genre.id" v-if="index < 3">
                <span class="movie-genre" v-if="index <= 1">{{genre.name}} <i>/ </i></span>
                <span class="movie-genre" v-else>{{genre.name}}</span>
              </span>
                    </div>
                    <div v-if="data.country && data.country.length > 0">
                        <label>制片国家/地区:</label>
                        <span v-for="(country, index) in data.country" v-if="index < 3">
                <span class="movie-country" v-if="index < data.country.length - 1">{{country}} <i>/ </i></span>
                <span class="movie-country" v-else>{{country}}</span>
              </span>
                    </div>
                    <div v-if="data.pubdates && data.pubdates.length > 0">
                        <label>上映时间:</label>
                        <span v-for="(date, index) in data.pubdates">
                <span class="movie-pubdate" v-if="index < data.pubdates.length - 1">{{date}} <i>/ </i></span>
                <span class="movie-pubdate" v-else>{{date}}</span>
              </span>
                    </div>
                    <div v-if="data.duration && data.duration.length > 0">
                        <label>片长:</label>
                        <span v-for="(duration, index) in data.duration">
                <span class="movie-duration" v-if="index < data.duration.length - 1">{{duration}} <i>/ </i></span>
                <span class="movie-duration" v-else>{{duration}}</span>
              </span>
                    </div>
                    <div v-if="data.akas && data.akas.length > 0">
                        <label>又名:</label>
                        <span v-for="(name, index) in data.akas">
                <span class="movie-name" v-if="index < data.akas.length - 1">{{name}} <i>/ </i></span>
                <span class="movie-name" v-else>{{name}}</span>
              </span>
                    </div>
                    <div class="movie-box">
                        <a target="_blank" style="color:#aaa" :href="gotoDouban(data)">去豆瓣看看</a>
                    </div>
                    <div class="movie-box" v-if="data.box">
                        <label>实时票房:</label>
                        <span>{{data.box}}</span>
                    </div>
                </div>
                <div class="rate">
                    <div class="rate-body">
                        <span class="rate-title">豆瓣评分:</span>
                        <span class="rate-num"><b>{{data.average}}</b></span>
                        <el-rate
                            class="primary-rate"
                            :value="getStars(data.average)"
                            disabled
                            text-color="#ff9900">
                        </el-rate>
                        <div class="movie-rate-process" v-if="data['scores']['5']">
                            <span class="movie-rate-process-title">5星</span>&nbsp;
                            <div class="movie-rate-process-item" :style="getCommentRateStyle(data['scores'], '5')" />
                            <span class="movie-rate-process-content">{{getCommentRate(data['scores'], '5')}}</span>
                        </div>
                        <div class="movie-rate-process" v-if="data['scores']['4']">
                            <span class="movie-rate-process-title">4星</span>&nbsp;
                            <div class="movie-rate-process-item" :style="getCommentRateStyle(data['scores'], '4')" />
                            <span class="movie-rate-process-content">{{getCommentRate(data['scores'], '4')}}</span>
                        </div>
                        <div class="movie-rate-process" v-if="data['scores']['3']">
                            <span class="movie-rate-process-title">3星</span>&nbsp;
                            <div class="movie-rate-process-item" :style="getCommentRateStyle(data['scores'], '3')" />
                            <span class="movie-rate-process-content">{{getCommentRate(data['scores'], '3')}}</span>
                        </div>
                        <div class="movie-rate-process" v-if="data['scores']['2']">
                            <span class="movie-rate-process-title">2星</span>&nbsp;
                            <div class="movie-rate-process-item" :style="getCommentRateStyle(data['scores'], '2')" />
                            <span class="movie-rate-process-content">{{getCommentRate(data['scores'], '2')}}</span>
                        </div>
                        <div class="movie-rate-process" v-if="data['scores']['1']">
                            <span class="movie-rate-process-title">1星</span>&nbsp;
                            <div class="movie-rate-process-item" :style="getCommentRateStyle(data['scores'], '1')" />
                            <span class="movie-rate-process-content">{{getCommentRate(data['scores'], '1')}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="movie-summary">
                <h3>{{data.title}}的剧情介绍 · · · · · ·</h3>
                <p>{{data.summary}}</p>
            </div>
            <div class="movie-cast">
                <h3>{{data.title}}的演职员 · · · · · ·
                    <a class="all-casts" href="#" v-if="data.celebrities && data.celebrities.length > 6">
                        (全部 {{data.celebrities.length}})
                    </a>
                </h3>
                <div class="celebrity-item" v-for="(celebrity, index) in data.celebrities"
                     v-if="(index < 6) && (celebrity.avatar)" :key="celebrity.id">
                    <a :href="celebrity.avatar" target="_blank">
                        <img :src="celebrity.avatar"/>
                    </a>
                    <a class="celebrity-name" target="_blank" :href="gotoCelebrityDetail(celebrity.id)">{{celebrity.name}}</a>
                    <span class="celebrity-roles">
              <span class="celebrity-roles-item" v-for="role in celebrity.roles">{{role}}&nbsp;</span>
            </span>
                </div>
            </div>
            <div class="movie-blooper">
                <h3>{{data.title}}的主题曲 · · · · · ·
                    <a class="all-bloopers" href="#" v-if="data.celebrities && data.celebrities.length > 6">
                        (全部 {{trailer.page.total}})
                    </a>
                    <video-player
                        class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions">
                    </video-player>
                </h3>
            </div>
            <div class="movie-comment">
                <h3>{{data.title}}的短评 · · · · · · <span
                    style="color:rgb(51, 119, 170);">  (全部{{comments.page.total}}条)</span></h3>
                <span id="comment-nav-root">
            <span @click="toggleCommentNav('hot')"
                  v-bind:style="comment_selected ? 'color:black' : 'color:#3377aa'"
                  class="comment-nav">最热&nbsp;</span>
            <span class="comment-nav">\</span>
            <span @click="toggleCommentNav('latest')"
                  v-bind:style="!comment_selected ? 'color:black' : 'color:#3377aa'"
                  class="comment-nav">&nbsp;最新
            </span>
          </span>
                <div class="movie-comment-body">
                    <div class="movie-comment-item" v-for="item in comments.body" :key="item.id">
                        <div class="comment-info">
                            <a target="_blank" :href="item.user.avatar" class="creator-avatar"
                               v-if="item.user && item.user.avatar">
                                <img :src="item.user.avatar" :alt="item.user.name">
                            </a>
                            <a href="javascript:void(0);" class="creator-avatar" v-else>
                                <img src="/static/image/user_anon.jpeg" alt="匿名">
                            </a>
                            &nbsp;
                            <span class="creator-name" v-if="item.user">
                  <a target="_blank" :href="gotoAuthor(item.user.uid)">{{item.user.name}}</a>
                </span>
                            <span style="color: gray" v-else>[已注销]</span>&emsp;
                            <el-rate style="margin-left:10px;float: left" v-model="item.stars" disabled></el-rate>
                            <span class="create-time">{{item.created_at}}</span>
                            <span class="votes">{{item.useful_count}}赞</span>
                        </div>
                        <div class="comment-content">
                            <p>
                                {{item.content}}
                            </p>
                        </div>
                    </div>
                    <div class="pagination">
                        <el-pagination
                            class="post-pagination"
                            @current-change="handleCommentCurrentChange"
                            :page-size="comments.page.count"
                            :pager-count="pager_count"
                            :small="checkMedia()"
                            layout="prev, next"
                            :total="comments.page.total > 15 * 20 ? 15 * 20 : comments.page.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="movie-review">
                <h3>{{data.title}}的影评 · · · · · ·<span
                    style="color:rgb(51, 119, 170);">  (全部{{reviews.page.total}}条)</span></h3>
                <span id="review-nav-root">
            <span @click="toggleReviewNav('hot')"
                  v-bind:style="review_selected ? 'color:black' : 'color:#3377aa'"
                  class="review-nav">最热&nbsp;</span>
            <span class="review-nav">\</span>
            <span @click="toggleReviewNav('latest')"
                  v-bind:style="!review_selected ? 'color:black' : 'color:#3377aa'"
                  class="review-nav">&nbsp;最新
            </span>
            <div class="movie-review-body">
              <div class="movie-review-item" v-for="(item, index) in reviews.body">
                <div class="review-info">
                  <a target="_blank" :href="gotoAuthor(item.user.uid)" class="creator-avatar"
                     v-if="item.user && item.user.avatar">
                    <img :src="item.user.avatar" :alt="item.user.name">
                  </a>
                  <a href="javascript:void(0);" class="creator-avatar" v-else>
                    <img src="/static/image/user_anon.jpeg" alt="匿名">
                  </a>
                  &nbsp;
                  <span class="creator-name" v-if="item.user">
                    <a target="_blank" :href="gotoAuthor(item.user.uid)">{{item.user.name}}</a>
                  </span>
                  <span style="color: gray" v-else>[已注销]</span>&emsp;
                  <el-rate style="margin-left:10px;float: left" v-model="item.stars" disabled></el-rate>
                  <span class="create-time">{{getDate(item.created_at)}}</span>
                  <span class="votes">{{item.useful_count}}赞</span>
                </div>
                <div class="review-title">
                  <a target="_blank" :href="gotoReview(item.id)">{{item.title}}</a>
                </div>
                <div class="review-summary">
                  <p>
                    {{item.summary}}
                  </p>
                </div>
              </div>
              <div class="pagination">
                <el-pagination
                    class="review-pagination"
                    @current-change="handleReviewCurrentChange"
                    :page-size="reviews.page.count"
                    :pager-count="pager_count"
                    :small="checkMedia()"
                    layout="prev, pager, next"
                    :total="reviews.page.total">
                </el-pagination>
              </div>
            </div>
          </span>
            </div>
            <div class="movie-discussion">
                <h3>{{data.title}}的讨论区 · · · · · ·</h3>
                <div class="movie-question-body">
                    <div class="movie-question-item" v-for="(item, index) in questions.body">
                        <h4>{{item.title}}</h4>
                    </div>
                </div>
                <div class="pagination">
                    <el-pagination
                        class="post-pagination"
                        @current-change="handleQuestionCurrentChange"
                        :page-size="questions.page.count"
                        :pager-count="pager_count"
                        :small="checkMedia()"
                        layout="prev, pager, next"
                        :total="questions.page.total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import Bus from "../../js/bus";

    const movie_url = global_.URLS.DOUBAN_MOVIE;
    const comment_url = global_.URLS.MOVIE_SHORT_COMMENT_URL;
    const review_url = global_.URLS.MOVIE_REVIEW_URL;
    const watch_url = global_.URLS.MOVIE_WATCH_URL;
    const blooper_url = global_.URLS.MOVIE_BLOOPER_URL;
    const trailer_url = global_.URLS.MOVIE_TRAILER_URL;
    const want_url = global_.FUNC.MOVIE_WANT_URL;
    const question_url = global_.URLS.QUESTION_URL;
    const answer_url = global_.URLS.ANSWER_URL;

    const token = localStorage.getItem("access_token");
    export default {
        name: "book",
        data() {
            return {
                answers: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 5
                    }
                },
                questions: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 10
                    }
                },
                user: {},
                data: {},
                directors: [],
                writers: [],
                casts: [],
                show_full_casts: false,
                summary_show: false,
                review_selected: false,
                review_sort: 'latest',
                comment_selected: false,
                comment_sort: 'latest',
                comments: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 20
                    }
                },
                reviews: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 10
                    }
                },
                bloopers: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 10
                    }
                },
                trailer: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 5
                    }
                },
                pager_count: 7,
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: "zh-CN",
                    aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [
                        {
                            // src: "//path/to/video.mp4", // 路径
                            src: "src/images/VID1121.mp4", // 路径
                            type: "video/mp4" // 类型
                        }
                    ],
                    // poster: "../../static/images/test.jpg", //你的封面地址
                    poster: "src/images/logo.png", //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true //全屏按钮
                    }
                }
            }
        },
        methods: {
            getCommentRate(item, index) {
                return item[index];
            },
            getCommentRateStyle(item, index) {
                let score = item[index];
                score = score.replace("%", "");
                let rate = Number(score) / 100 * 80 + 'px';
                return "background-color:#FFD596;height: 10px;width:" + rate;
            },
            updateMovie() {
                let movie_id = this.$route.params.id;
                let update_movie_url = movie_url + "update/" + movie_id;
                this.$http.get(update_movie_url, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        this.$message.error("数据更新错误,请稍后再试!");
                        return;
                    }

                    this.data = data.body.data;
                    this.$message({
                        message: "数据更新成功!",
                        type: 'success'
                    });
                });
            },
            gotoAuthor(id) {
                return "/user/" + id;
            },
            gotoReview(id) {
                return "https://movie.douban.com/review/" + id;
            },
            getDate(time) {
                return time.split(" ")[0];
            },
            handleReviewCurrentChange(val) {
                this.reviews.page.page = val;
                this.getMovieReview();
            },
            handleCommentCurrentChange(val) {
                this.comments.page.page = val;
                this.getMovieComment();
            },
            toggleCommentNav(comment_sort) {
                if (this.comment_sort === comment_sort) {
                    return;
                }
                this.comment_selected = !this.comment_selected;
                this.comment_sort = comment_sort;
                this.getMovieComment();
            },
            toggleReviewNav(review_sort) {
                if (this.review_sort === review_sort) {
                    return;
                }
                this.review_selected = !this.review_selected;
                this.review_sort = review_sort;
                this.getMovieReview();
            },
            watchMovie() {
                if (token) {
                    this.$http.post(watch_url, {
                        body: {
                            movie_id: this.$route.params.id
                        }
                    }, {
                        headers: {
                            bid: global_.FUNC.getBid(),
                            "X-HASYOU-TOKEN": token
                        }
                    }).then((data) => {
                        if (data.body.code === 200) {
                            this.data.operations.push(data.body.data);
                        } else if (data.body.code === 5006) {
                            this.$message({
                                message: '请先登录!',
                                type: 'warning'
                            });
                            this.$router.push({path: "/login"});
                        }
                    });
                } else {
                    this.$router.push({path: "/login"});
                }
            },
            wantMovie() {
                if (token) {
                    this.$http.post(want_url, {
                        body: {
                            movie_id: this.$route.params.id
                        }
                    }, {
                        headers: {
                            bid: global_.FUNC.getBid(),
                            "X-HASYOU-TOKEN": token
                        }
                    }).then((data) => {
                        if (data.body.code === 200) {
                            this.data.operations.push(data.body.data);
                        } else if (data.body.code === 5006) {
                            this.$message({
                                message: '请先登录!',
                                type: 'warning'
                            });
                            this.$router.push({path: "/login"});
                        }
                    });
                } else {
                    this.$router.push({path: "/login"});
                }
            },
            getYear(year) {
                return JSON.parse(year)[0];
            },
            toggleSummaryShow() {
                this.summary_show = !this.summary_show;
            },
            getStars(stars) {
                return stars / 2;
            },
            loadMore() {
                this.show_full_casts = !this.show_full_casts;
            },
            getMovie() {
                let movie_id = this.$route.params.id;
                const movie_detail_url = movie_url + "subject/" + movie_id;
                this.$http.get(movie_detail_url, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }
                    this.data = data.body.data;
                    this.handleCelebrityRoles();
                    document.title = this.data.title + "(Withyou)";
                });
            },
            getMovieComment() {
                let movie_id = this.$route.params.id;
                this.$http.get(comment_url + movie_id, {
                    params: {
                        sort: this.comment_sort,
                        p: this.comments.page.page,
                        count: this.comments.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.comments.body = data.body.data.body;
                    this.comments.page.total = data.body.data.total;
                    this.comments.page.page = data.body.data.page;
                    this.comments.page.count = data.body.data.count;
                });
            },
            getMovieReview() {
                let movie_id = this.$route.params.id;
                this.$http.get(review_url + movie_id, {
                    params: {
                        sort: this.review_sort,
                        p: this.reviews.page.page,
                        count: this.reviews.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.reviews.body = data.body.data.body;
                    this.reviews.page.total = data.body.data.total;
                    this.reviews.page.page = data.body.data.page;
                    this.reviews.page.count = data.body.data.count;
                });
            },
            getMovieBlooper() {
                let movie_id = this.$route.params.id;
                this.$http.get(blooper_url + movie_id, {
                    params: {
                        p: 1,
                        count: 5
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.bloopers.body = data.body.data.body;
                    this.bloopers.page.total = data.body.data.total;
                    this.bloopers.page.page = data.body.data.page;
                    this.bloopers.page.count = data.body.data.count;

                    let bloopers = [];
                    for (let blooper of data.body.data.body) {
                        let resource = {
                            src: blooper.resource_url, // 路径
                            type: "video/mp4" // 类型
                        };
                        bloopers.push(resource);
                    }
                    this.playerOptions.sources = bloopers;
                    this.playerOptions.poster = this.bloopers.body[0].small;
                });
            },
            getMovieTrailer() {
                let movie_id = this.$route.params.id;
                this.$http.get(trailer_url + movie_id, {
                    params: {
                        p: 1,
                        count: 5
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.trailer.body = data.body.data.body;
                    this.trailer.page.total = data.body.data.total;
                    this.trailer.page.page = data.body.data.page;
                    this.trailer.page.count = data.body.data.count;

                    let trailers = [];
                    for (let trailer of data.body.data.body) {
                        let resource = {
                            src: trailer.resource_url, // 路径
                            type: "video/mp4" // 类型
                        };
                        trailers.push(resource);
                    }
                    this.playerOptions.sources = trailers;
                    this.playerOptions.poster = this.trailer.body[0].small;
                });
            },
            handleCelebrityRoles() {
                let celebrities = this.data.celebrities;
                celebrities.map((item, key) => {
                    let roles = item.roles;
                    roles.map((role, key) => {
                        if (role === "导演") {
                            this.directors.push(item);
                        } else if (role === "编剧") {
                            this.writers.push(item);
                        } else if (role === "演员" || role === "配音") {
                            this.casts.push(item);
                        }
                        return;
                    });
                });
            },
            checkMedia() {
                return window.matchMedia('(max-width:600px)').matches;
            },
            getUserInfo() {
                this.user = global_.FUNC.getUserInfo();
            },
            getQuestions() {
                let movie_id = this.$route.params.id;
                this.$http.get(question_url + movie_id, {
                    params: {
                        p: this.questions.page.page,
                        count: this.questions.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.questions.body = data.body.data.body;
                    this.questions.page.total = data.body.data.total;
                    this.questions.page.page = data.body.data.page;
                    this.questions.page.count = data.body.data.count;
                });
            },
            getAnswers(question_id) {
                this.$http.get(answer_url + question_id, {
                    params: {
                        p: this.answers.page.page,
                        count: this.answers.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.answers.body = data.body.data.body;
                    this.answers.page.total = data.body.data.total;
                    this.answers.page.page = data.body.data.page;
                    this.answers.page.count = data.body.data.count;
                });
            },
            changeActivekey(question_id) {
                this.getAnswers(question_id);
            },
            handleQuestionCurrentChange(val) {
                this.questions.page.page = val;
                this.getQuestions();
            },
            gotoDouban(item) {
                return "https://movie.douban.com/subject/" + item.id + "/?from=showing";
            },
            gotoCelebrityDetail(celebrity_id) {
                return "/movie/celebrity/" + celebrity_id;
            }
        },
        created() {
            this.getMovie();
            this.getMovieComment();
            this.getMovieReview();
            // this.getMovieBlooper();
            this.getMovieTrailer();
            this.getUserInfo();
            this.getQuestions();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/movieDetail';
</style>
