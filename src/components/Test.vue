<template>
    <el-calendar v-model="value">
        <template
            slot="dateCell"
            slot-scope="{date, data}">
<!--            <p>{{data}}-{{data}}</p>-->
<!--            <p :class="data.isSelected ? 'is-selected' : ''">-->
<!--                {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}-->
<!--            </p>-->
        </template>
    </el-calendar>
</template>

<script>
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
