<template>
    <div id="album-photo">
        <h1 class="title">我的相册-The Girl</h1>
        <div class="moment-items" v-masonry origin-left="true" fit-width="true" transition-duration="0s"
             item-selector=".item">
            <div v-masonry-tile class="moment-item item" v-for="item in photos">
                <el-card :body-style="{ padding: '0px' }">
                    <img v-gallery class="image-item" :src="item.file_url" alt="你好">
                    <div class="desc" style="padding: 8px 0 5px 8px;">
                        <span>好吃的汉堡</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ getDate(item.create_time) }}</time>
                            <br>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";

    const photo_url = global_.URLS.USER_PHOTO_URL;
    const token = localStorage.getItem("access_token");
    export default {
        name: "book",
        data() {
            return {
                album: {},
                photos: [],
                page: {
                    page: 1,
                    count: 20,
                    total: 0
                },
                active: true
            };
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true);
        },
        methods: {
            handleScroll() {
                let is_bottom = global_.FUNC.isReachHalfBottom();
                if (this.active && is_bottom) {
                    this.active = false;
                    this.page.page = this.page.page + 1;
                    this.getPhotos();
                }
            },
            getDate(time) {
                return time.split(" ")[0];
            },
            getPhotos() {
                let album_id = this.$route.params.album_id;
                this.$http.get(photo_url + album_id, {
                    params: {
                        p: this.page.page,
                        count: this.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    if (data.body.data.body.length === 0) {
                        return;
                    }
                    this.page.page = data.body.data.page;
                    this.page.count = data.body.data.count;
                    this.page.total = data.body.data.total;
                    data.body.data.body.map((item, key) => {
                        this.photos.push(item);
                    })
                    this.active = true;
                });
            }
        },
        created() {
            this.getPhotos();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/photo'
</style>
