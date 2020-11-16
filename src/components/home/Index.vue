<template>
    <el-row id="index" v-if="!checkMedia()">
        <el-col :span="6">
            <div class="grid-content bg-purple" style="color: #ffffff">left</div>
        </el-col>
        <el-col :span="10">
            <div class="grid-content bg-purple-light">
                <MovieAlbum/>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple" style="color: #ffffff">right</div>
        </el-col>
    </el-row>
    <el-row id="index" v-else>
        <div class="grid-content bg-purple-light">
            <MovieAlbum/>
        </div>
    </el-row>
</template>
<script>
    import MovieAlbum from "../movie/MovieAlbum";

    export default {
        name: "index",
        data() {
            return {}
        },
        methods: {
            checkMedia() {
                return window.matchMedia('(max-width:600px)').matches;
            }
        },
        created() {

        },
        components: {
            "MovieAlbum": MovieAlbum
        },
    }
</script>
<style lang="scss" scoped>
    @import "./css/index";
</style>
