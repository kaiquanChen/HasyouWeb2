<template>
    <div class="video-container">
        <video-player
            class="video-player vjs-custom-skin video"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions">
        </video-player>
    </div>
</template>

<script>
export default {
    props: ["playerOptions", "source"],
    name: "MovieVideo",
    data() {
        return {}
    },
    mounted() {
        let sources = [];
        sources.push(this.source);
        this.playerOptions.poster = this.source.small;
        this.playerOptions.sources = sources;
    }
}
</script>

<style lang="scss" scoped>
    @import './css/movieVideo';
</style>
