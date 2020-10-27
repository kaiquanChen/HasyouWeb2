<template>
    <div id="forum">
        <div class="left"></div>
        <div class="center">
            <router-view></router-view>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
    import global_ from "../config/Global"

    const BOOK_URL = global_.URLS.BOOK_URL;
    const tag_url = global_.URLS.DOUBAN_BOOK_TAG_URL;
    export default {
        name: "book",
        data() {
            return {};
        },
        methods: {
            checkMedia() {
                return window.matchMedia('(max-width:600px)').matches;
            }
        },
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    @import './css/forum'
</style>
