<template>
    <MovieGenreStats />
</template>

<script>
    import MovieRecordItem from './movie/MovieRecordItem'
    import MovieGenreStats from "./user/MovieGenreStats";

    export default {
        name: "book",
        components: {
            "MovieGenreStats": MovieGenreStats
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
