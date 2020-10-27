<template>
    <div id="footer">
        <div class="left">
            <router-link to="note">留言板</router-link>
        </div>
        <div class="center">
        </div>
        <div class="right">
            <router-link to="about">关于有你</router-link>
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import Bus from "../../js/bus"

    export default {
        name: "",
        data() {
            return {}
        },
        methods: {
            checkMedia() {
                return window.matchMedia('(max-width:600px)').matches;
            },
            getMessage() {
                Bus.$on("request-page", response => {
                    this.page.p = response.p;
                    this.page.count = response.count;
                    this.page.total = response.total;
                    this.keywords = response.keywords;

                    this.globalSearch();
                });
            }
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/footer.scss'
</style>
