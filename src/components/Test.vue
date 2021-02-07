<template>
    <MovieVideo />
</template>

<script>
    import MovieRecordItem from './movie/MovieRecordItem'
    import MovieGenreStats from "./user/MovieGenreStats";
    import MovieVideo from "./movie/MovieVideo";

    export default {
        name: "book",
        components: {
            "MovieVideo": MovieVideo
        },
        data() {
            return {
                blocks: [
                    1, 2, 3, 5, 6
                ]
            };
        },
        methods: {
            fn() {
                console.log("hello david!");
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
