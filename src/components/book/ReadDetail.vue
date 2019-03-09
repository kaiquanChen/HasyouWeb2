<template>
    <div id="read-detail">
        <div class="left"></div>
        <div class="center">
            <h2 class="title">{{short_book.name}}</h2>
            <div class="content" v-html="short_book.summary">
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
    import global_ from "../config/Global"
    import 'highlight.js/styles/default.css';

    const marked = require('marked');
    const hljs = require('highlight.js');
    const short_book_url = global_.URLS.SHORT_BOOK_URL;
    export default {
        name: "book",
        data() {
            return {
                short_book: {}
            };
        },
        methods: {
            getShortBookDetail() {
                this.$http.get(short_book_url + "subject/" + this.$route.params.id, {
                    headers: {
                    "bid": global_.FUNC.getBid()
                    }
                }).then((data) => {
                    if (data.body.code === 200) {
                        this.short_book = data.body.data;
                    }
                });
            }
        },
        created() {
            this.getShortBookDetail();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/readDetail'
</style>
    