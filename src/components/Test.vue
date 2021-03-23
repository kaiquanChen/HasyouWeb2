<template>
    <div>
        <NoteLabel />
    </div>
</template>

<script>
import NoteLabel from "./user/NoteLabel";

export default {
        name: "book",
        components: {
            "NoteLabel": NoteLabel
        },
        data() {
            return {
                blocks: [
                    1, 2, 3, 5, 6
                ],
                value: new Date()
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
