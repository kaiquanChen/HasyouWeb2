<template>

</template>

<script>
    import global_ from "../config/Global";
    import Bus from "../../js/bus"

    const note_url = global_.URLS.NOTE_URL;
    const token = localStorage.getItem("access_token");
    export default {
        name: "book",
        data() {
            return {
                user: {},
            };
        },
        methods: {},
        created() {
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/noteOperate'
</style>
