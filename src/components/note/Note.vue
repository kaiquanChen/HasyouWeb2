<template>
    <div id="note">
        <h1>仓库准备...</h1>
    </div>
</template>

<script>
    import global_ from "../config/Global";

    const user_album_url = global_.URLS.USER_ALBUM_URL;
    const save_album_url = global_.URLS.SAVE_ALBUM_URL;
    const save_photo_url = global_.URLS.SAVE_PHOTO_URL;
    const token = sessionStorage.getItem("access_token");
    export default {
        name: "book",
        data() {
            return {
                user: null,
                file_ids: [],
                albums: [],
                select: false,
                album_name: "",
                album_description: "",
                select_album: {},
                album_id: ""
            };
        },
        methods: {
            getUserInfo() {
                let user_info = sessionStorage.getItem("user_info");
                if (user_info) {
                    this.user = JSON.parse(user_info);
                } else {
                    this.$router.push({path: "/login"});
                }
            },
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/note'
</style>
