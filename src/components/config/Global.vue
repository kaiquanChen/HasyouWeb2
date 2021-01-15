<template>

</template>

<script>
    const uuidV4 = require("uuid/v4");

    const TEST_URL = 'http://localhost:8018/'
    const FLY_URL = 'http://106.14.190.5:8018/'

    const COMMON_URL = FLY_URL

    // short book
    const SHORT_BOOK_PREFIX = 'shortbook/'
    const SHORT_BOOK_URL = COMMON_URL + SHORT_BOOK_PREFIX

    // douban book
    const DOUBAN_BOOK = 'book/'
    const BOOK_URL = COMMON_URL + DOUBAN_BOOK
    // douban short comment
    const BOOK_SHORT_COMMENT_URL = COMMON_URL + DOUBAN_BOOK + 'comments'
    const BOOK_REVIEW_URL = COMMON_URL + DOUBAN_BOOK + "reviews/"
    const BOOK_ANNUAL_URL = COMMON_URL + 'book/annual/'
    const BOOK_READ_URL = BOOK_URL + "read";
    const BOOK_RECORD_URL = BOOK_URL + "record";
    const BOOK_WANT_URL = BOOK_URL + "want";

    // douban annotation
    const BOOK_ANNOTATION_URL = BOOK_URL + "annotation/";

    // group
    const GROUP = COMMON_URL + 'group/'

    // douban_book_tag
    const DOUBAN_BOOK_TAG_URL = COMMON_URL + 'tag/'

    // movie
    const DOUBAN_MOVIE = COMMON_URL + 'movie/'
    const MOVIE_SHORT_COMMENT_URL = DOUBAN_MOVIE + "comments/"
    const MOVIE_REVIEW_URL = DOUBAN_MOVIE + "reviews/"
    const MOVIE_GENRE_URL = DOUBAN_MOVIE + "tag/genres"
    const MOVIE_ANNUAL_URL = COMMON_URL + 'movie/annual/'
    const MOVIE_WATCH_URL = DOUBAN_MOVIE + "watched";
    const MOVIE_RECORD_URL = DOUBAN_MOVIE + "record";
    const MOVIE_WANT_URL = DOUBAN_MOVIE + "want";
    const MOVIE_BLOOPER_URL = DOUBAN_MOVIE + "blooper/";
    const MOVIE_TRAILER_URL = DOUBAN_MOVIE + "trailer/";
    const MOVIE_ALBUM_URL = DOUBAN_MOVIE + "album/save";
    const MOVIE_ALBUM_LIST_URL = DOUBAN_MOVIE + "album/page";
    const MOVIE_ALBUM_DETAIL_URL = DOUBAN_MOVIE + "album/";
    const MOVIE_ALBUM_ITEM_URL = DOUBAN_MOVIE + "album/item";
    const MOVIE_ALBUM_ITEM_DELETE_URL = DOUBAN_MOVIE + "album/item/delete";
    const MOVIE_COMING_URL = DOUBAN_MOVIE + "coming";

    // celebrity
    const DOUBAN_CELEBRITY = COMMON_URL + "celebrity/movie";

    // question
    const QUESTION_URL = DOUBAN_MOVIE + "question/";
    const ANSWER_URL = DOUBAN_MOVIE + "answer/";

    // v2 post
    const POST_URL = COMMON_URL + 'v2/'

    // v2 node
    const NODE_URL = COMMON_URL + 'node/'

    // v2 comment
    const COMMENT_URL = POST_URL + "comment/";
    const FOLLOW_POST_URL = POST_URL + "follow";

    // event
    const EVENT_URL = COMMON_URL + 'event/'

    // music
    const DOUBAN_MUSIC_URL = COMMON_URL + 'music/'

    // file
    const FILE_URL = COMMON_URL + "file/upload";
    // const FILE_URL = "https://localhost:8048/file/";

    const FILE_LIST_URL = COMMON_URL + "/file/";

    // youni note
    const NOTE_URL = COMMON_URL + "note/";
    const NOTE_SAVE_URL = NOTE_URL + "save";

    // moment
    const MOMENT_URL = COMMON_URL + "moment/";
    const MOMENT_SUBJECTS_URL = MOMENT_URL + "subjects";
    const MOMENT_SUBJECT_URL = MOMENT_URL + "subject";

    // global search
    const GLOBAL_SEARCH_URL = COMMON_URL + "search/";

    // user
    const KAPTCHA_URL = COMMON_URL + "user/kaptcha";
    const LOGIN_URL = COMMON_URL + "user/login";
    const VERIFY_ACCOUNT_URL = COMMON_URL + "user/verify/account";
    const LOGOUT_URL = COMMON_URL + "user/logout";
    const REGISTER_URL = COMMON_URL + "user/register";
    const USER_INFO_URL = COMMON_URL + "user/info";
    const USER_ALBUM_URL = COMMON_URL + "user/albums";
    const SAVE_ALBUM_URL = COMMON_URL + "user/album/save";
    const SAVE_PHOTO_URL = COMMON_URL + "user/photo/save";
    const USER_PHOTO_URL = COMMON_URL + "user/album/";


    // blog
    const BLOG_URL = COMMON_URL + "blog";
    const SAVE_BLOG_URL = BLOG_URL + "/save";
    const LIST_BLOG_URL = BLOG_URL + "/subjects";
    const BLOG_SUBJECT_URL = BLOG_URL;

    // global variable
    let GLOBAL_VARIABLE = {};

    // global function
    let getUuid = function () {
        return uuidV4().replace(/-/g, "");
    }

    let getBid = function () {
        let bid = localStorage.getItem("bid");
        if (!bid) {
            bid = getUuid();
            localStorage.setItem("bid", bid);
        }
        return bid;
    }

    let getToken = function () {
        return localStorage.getItem("access_token");
    }

    let setToken = function (token) {
        localStorage.setItem("access_token", token);
    }

    let setUserInfo = function (user_info) {
        let user_json = JSON.stringify(user_info);
        localStorage.setItem("user_info", user_info);
    }

    let getUserInfo = function () {
        let user_json = localStorage.getItem("user_info");
        return JSON.parse(user_json);
    }

    let getUserInfoByUid = async function (uid) {
        let user_json = sessionStorage.getItem(uid);
        if (!user_json) {
            await loadUserInfo(uid);
            user_json = sessionStorage.getItem(uid);
        }
        try {
            return JSON.parse(user_json);
        } catch (e) {
            return user_json;
        }

    }

    let loadUserInfo = async function (uid) {
        await axios.get(USER_INFO_URL, {
            params: {
                uid: uid
            }
        }).then((data) => {
            console.log(4);
            sessionStorage.setItem(uid, JSON.stringify(data.data.data));
        });
    }

    let setUserInfoByUid = function (uid, user_info) {
        let user_json = JSON.stringify(user_info);
        sessionStorage.setItem(uid, user_info);
    }

    let getValue = function (key) {
        return localStorage.getItem(key);
    }

    let getScrollHeight = function () {
        let bodyScrollHeight = 0
        let documentScrollHeight = 0
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight
        }
        // 当页面内容超出浏览器可视窗口大小时，Html的高度包含body高度+margin+padding+border所以html高度可能会大于body高度
        return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
    }

    let isReachBottom = function () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动条的高度
        const winHeight = document.documentElement.clientHeight || document.body.clientHeight; // 一屏的高度
        const scrollHeight = getScrollHeight(); // 获取文档总高度
        return scrollTop >= parseInt(scrollHeight) - winHeight;
    }

    let isReachHalfBottom = function () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动条的高度
        const winHeight = document.documentElement.clientHeight || document.body.clientHeight; // 一屏的高度
        const scrollHeight = getScrollHeight(); // 获取文档总高度
        return scrollTop >= (parseInt(scrollHeight) - winHeight) / 2;
    }

    let getBrowserHeight = function () {
        return document.documentElement.scrollHeight;
    }

    let getBrowserWidth = function () {
        return document.documentElement.clientWidth;
    }

    let request = function (reqUrl, result, params, method, headers) {
        if (!reqUrl) {
            alert("url must not be empty!");
            return;
        }

        if (!method) {
            method = "get";
        }

        if (!headers) {
            headers = getBid();
        }

        if (!params) {
            params = {};
        }

        axios.request({
            url: reqUrl,
            method: method,
            headers: {"bid": headers},
            params: params,
            transformResponse: [function (data) {
                result = data;
            }]
        });
    }

    const URLS = {
        TEST_URL,
        FLY_URL,
        COMMON_URL,

        /* dou ban */
        BOOK_URL,
        BOOK_SHORT_COMMENT_URL,
        DOUBAN_BOOK_TAG_URL,
        BOOK_ANNUAL_URL,
        DOUBAN_MOVIE,
        EVENT_URL,
        DOUBAN_MUSIC_URL,
        BOOK_REVIEW_URL,
        MOVIE_REVIEW_URL,
        MOVIE_SHORT_COMMENT_URL,
        MOVIE_ANNUAL_URL,
        MOMENT_SUBJECTS_URL,
        MOVIE_GENRE_URL,
        MOVIE_WATCH_URL,
        MOVIE_RECORD_URL,
        MOVIE_WANT_URL,
        BOOK_READ_URL,
        BOOK_WANT_URL,
        BOOK_RECORD_URL,
        BOOK_ANNOTATION_URL,
        MOVIE_BLOOPER_URL,
        MOVIE_TRAILER_URL,
        QUESTION_URL,
        ANSWER_URL,
        MOVIE_ALBUM_URL,
        MOVIE_ALBUM_ITEM_URL,
        MOVIE_ALBUM_LIST_URL,
        MOVIE_ALBUM_ITEM_DELETE_URL,
        MOVIE_COMING_URL,
        MOVIE_ALBUM_DETAIL_URL,

        DOUBAN_CELEBRITY,

        /* v2 */
        COMMENT_URL,
        POST_URL,
        NODE_URL,
        FOLLOW_POST_URL,

        /* file */
        FILE_URL,
        FILE_LIST_URL,

        /* short book */
        SHORT_BOOK_URL,

        /* note */
        NOTE_URL,
        NOTE_SAVE_URL,

        /* other */
        GROUP,

        /* user */
        KAPTCHA_URL,
        LOGIN_URL,
        VERIFY_ACCOUNT_URL,
        REGISTER_URL,
        USER_INFO_URL,
        LOGOUT_URL,
        USER_ALBUM_URL,
        SAVE_ALBUM_URL,
        SAVE_PHOTO_URL,
        USER_PHOTO_URL,

        /* blog */
        SAVE_BLOG_URL,
        LIST_BLOG_URL,
        BLOG_SUBJECT_URL,

        /* global search*/
        GLOBAL_SEARCH_URL,

        GLOBAL_VARIABLE
    }

    const FUNC = {
        getUuid,
        getBid,
        isReachBottom,
        isReachHalfBottom,
        request,
        getToken,
        setToken,
        getUserInfo,
        setUserInfo,
        getBrowserHeight,
        getBrowserWidth,
        getUserInfoByUid,
        setUserInfoByUid
    }

    export default {
        URLS,
        FUNC
    }
</script>

<style scoped>

</style>
