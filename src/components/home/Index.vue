<template>
    <el-row id="index">
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
</template>
<script>
    import global_ from "../config/Global";
    import MovieAlbum from "../movie/MovieAlbum";

    export default {
        name: "index",
        data() {
            return {}
        },
        methods: {},
        created() {

        },
        components: {
            "MovieAlbum": MovieAlbum
        }
    }
</script>
<style lang="scss" scoped>
    @import "./css/index";
</style>
