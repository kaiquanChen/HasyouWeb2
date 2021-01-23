<template>
    <MovieRecordItem />
</template>

<script>
    import MovieRecordItem from './movie/MovieRecordItem'

    export default {
        name: "book",
        components: {
            "MovieRecordItem": MovieRecordItem
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
