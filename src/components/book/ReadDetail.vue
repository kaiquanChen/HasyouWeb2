<template>
    <div id="read-detail">
        <div class="left"></div>
        <div class="center">
            
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
    import global_ from "../config/Global"

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

            }
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/readDetail'
</style>
    