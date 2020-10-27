<template>
    <div id="read">
        <div class="left"></div>
        <div class="center">
            <div class="qingnian">
                <h2 class="title">青年文摘</h2>
                <div class="short-book-items">
                    <div class="short-book-item" v-for="(item, index) in short_books">
                        <a target="_blank" :href="gotoReadDetail(item.id)">{{item.name}}</a>
                        <span class="date">{{getSimpleDate(item.create_time)}}</span>
                    </div>
                </div>
            </div>
            <div class="douban-moment">
                <h2 class="title">豆瓣时刻</h2>
                <div class="moment-items" v-masonry origin-left="true" fit-width="true" transition-duration="1s"
                     item-selector=".item">
                    <div v-masonry-tile class="moment-item item" v-for="item in moments" :key="item.id"
                         @click="gotoDetail(item.id)">
                        <h3 class="moment-title">{{item.title}}</h3>
                        <p class="moment-content">{{item.summary}}</p>
                        <ul class="moment-images" v-if="item.image && item.image.length > 1 ">
                            <li class="image-item" v-for="(image, index) in item.image"
                                v-if="index < 3" :key="image.id">
                                <img :src="image" :alt="image">
                            </li>
                        </ul>
                        <div class="moment-info">
                            <span class="creator-avatar" v-if="item.user">
                                <img :src="item.user.avatar" :alt="item.user.name">
                            </span>
                            <span class="creator-name" v-if="item.user">{{item.user.name}}</span>
                            <span class="creator-avatar" v-if="!item.user">
                                <img src="/static/image/user_anon.jpeg">
                            </span>
                            <span class="creator-name" v-if="!item.user">匿名</span>
                            <span class="create-time">{{getDate(item.publish_time)}}</span>
                            <span class="vote">{{item.liked_count}}赞</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
    import global_ from "../config/Global"

    const moment_url = global_.URLS.MOMENT_SUBJECTS_URL;
    const short_book_url = global_.URLS.SHORT_BOOK_URL;
    export default {
        name: "book",
        data() {
            return {
                short_books: [],
                moments: [],
                page: {
                    page: 1,
                    count: 10,
                    total: 0
                },
                more_message: "点击加载更多",
                load_flag: true,
                loadding: false
            };
        },
        methods: {
            getSimpleDate(time) {
                return time.substr(5, time.length - 1);
            },
            getDate(time) {
                return time.substr(0, 10);
            },
            getMomentList() {
                this.loading = true;
                this.$http.get(moment_url, {
                    headers: {
                        bid: global_.FUNC.getBid()
                    },
                    params: {
                        p: this.page.page,
                        count: this.page.count
                    }
                }).then(data => {
                    if (data.body.code !== 200) {
                        this.$message.error("数据获取失败!");
                        console.log(data);
                        return;
                    }

                    this.moments = data.body.data.body;
                    this.page.page = data.body.data.page;
                    this.page.count = data.body.data.count;
                    this.page.total = data.body.data.total;
                });
            },
            getShortBookList() {
                this.$http.get(short_book_url + "/subjects/QNWZ", {
                    headers: {
                        bid: global_.FUNC.getBid()
                    },
                    params: {
                        p: this.page.page,
                        count: 20
                    }
                }).then(data => {
                    if (data.body.code !== 200) {
                        this.$message.error("数据获取失败!");
                        console.log(data);
                        return;
                    }

                    this.short_books = data.body.data.body;
                });
            },
            gotoDetail(id) {
                window.open("https://www.douban.com/note/" + id, "_blank");
            },
            gotoReadDetail(id) {
                return "/book/read/" + id;
            },
            checkMedia() {
                return window.matchMedia('(max-width:415px)').matches;
            },
        },
        created() {
            this.getMomentList();
            this.getShortBookList();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/read'
</style>
