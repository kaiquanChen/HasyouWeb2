<template>
    <div>
        <button @click="fn" v-freq="{click:500}">点点点</button>
    </div>
</template>

<script>
    export default {
        name: "book",
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
        },
        created() {
            // this.$router.push({path: "/book/books"});
        }
    }
</script>

<style lang="scss" scoped>
</style>
