<template>
    <div>

    </div>
</template>

<script>
    import global_ from "../config/Global";
    import Bus from "../../js/bus"

    const note_url = global_.URLS.NOTE_URL;
    const token = localStorage.getItem("access_token");
    export default {
        props:["movie"],
        name: "MovieItem",
        data() {
            return {
                user: {},
                movie: {

                },
            };
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/movieItem';
</style>
