<template>
    <div id="movie-album">
        <MovieAlbumCard :item="item" v-for="item in albums" :key="item.id"/>
    </div>
</template>

<script>
    import MovieAlbumCard from "./MovieAlbumCard";

    export default {
        name: "MovieAlbum",
        data() {
            return {
                albums: [
                    {
                        "id": "447222172184739840",
                        "name": "知识改变命运",
                        "watched_cont": 0,
                        "album_item_cont": 2,
                        "description": "尊重科学，尊重人才尊重科学，尊重人才尊重科学，尊重人才尊重科学，尊重人才尊重科学，尊重人才尊重科学，尊重人才尊重科学，尊重人才",
                        "cover": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2547694957.jpg",
                        "update_time": "2020-10-26 08:04:59",
                        "create_time": "2020-04-13 23:42:20",
                        "items": [
                            {
                                "album_id": "447222172184739840",
                                "movie_id": "27176742",
                                "title": "驭风男孩",
                                "average": 6.0,
                                "summary": "2020 / 剧情 / 切瓦特·埃加福 / 爱伊莎·玛依卡",
                                "rank": 1,
                                "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2547694957.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "447222172184739840",
                                "movie_id": "1291543",
                                "title": "功夫",
                                "rank": 1,
                                "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2219011938.jpg",
                                "is_watched": 0
                            }
                        ]
                    },
                    {
                        "id": "472071279907808672",
                        "name": "权力的游戏系列",
                        "watched_cont": 0,
                        "album_item_cont": 8,
                        "description": "权游的经典，你还要继续错过吗？",
                        "cover": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p896064368.jpg",
                        "update_time": "2020-08-13 22:08:43",
                        "create_time": "2020-08-13 22:08:43",
                        "items": [
                            {
                                "album_id": "472071279907808672",
                                "movie_id": "3016187",
                                "title": "权力的游戏 第一季",
                                "rank": 1,
                                "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p896064368.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808672",
                                "movie_id": "6558062",
                                "title": "权力的游戏  第二季",
                                "rank": 2,
                                "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1441478479.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808672",
                                "movie_id": "10590706",
                                "title": "权力的游戏 第三季",
                                "rank": 2,
                                "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1884199062.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808672",
                                "movie_id": "23232876",
                                "title": "权力的游戏 第四季",
                                "rank": 2,
                                "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2172313849.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808672",
                                "movie_id": "25826612",
                                "title": "权力的游戏 第五季",
                                "rank": 2,
                                "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2230256732.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808672",
                                "movie_id": "25862357",
                                "title": "权力的游戏 第六季",
                                "rank": 6,
                                "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2321971908.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808672",
                                "movie_id": "26235354",
                                "title": "权力的游戏 第七季",
                                "rank": 7,
                                "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2462245619.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808672",
                                "movie_id": "26584183",
                                "title": "权力的游戏 第八季",
                                "rank": 8,
                                "image_url": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2552503815.jpg",
                                "is_watched": 0
                            }
                        ]
                    },
                    {
                        "id": "472071279907808896",
                        "name": "爱情公寓系列",
                        "watched_cont": 0,
                        "cover": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2325129230.jpg",
                        "description": "不是说好会尖叫的小房子在对面吗？",
                        "album_item_cont": 7,
                        "update_time": "2020-08-13 22:53:39",
                        "create_time": "2020-08-13 22:53:39",
                        "items": [
                            {
                                "album_id": "472071279907808896",
                                "movie_id": "3926132",
                                "title": "爱情公寓",
                                "rank": 1,
                                "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2325129230.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808896",
                                "movie_id": "4707205",
                                "title": "爱情公寓2",
                                "rank": 2,
                                "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p765135303.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808896",
                                "movie_id": "6312211",
                                "title": "爱情公寓3",
                                "rank": 3,
                                "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1625980712.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808896",
                                "movie_id": "10793510",
                                "title": "爱情公寓4",
                                "rank": 4,
                                "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2163160507.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808896",
                                "movie_id": "25931446",
                                "title": "爱情公寓5",
                                "rank": 5,
                                "image_url": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2580338609.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808896",
                                "movie_id": "24852545",
                                "title": "爱情公寓",
                                "rank": 6,
                                "image_url": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2521648155.jpg",
                                "is_watched": 0
                            },
                            {
                                "album_id": "472071279907808896",
                                "movie_id": "26803819",
                                "title": "爱情公寓番外篇：开心原力",
                                "rank": 7,
                                "image_url": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2368468271.jpg",
                                "is_watched": 0
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            "MovieAlbumCard": MovieAlbumCard
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
