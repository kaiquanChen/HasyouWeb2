<template>
    <div id="note-detail">
        <div class="col-1"></div>
        <div class="col-2">
            <div class="note-nav">
                <span class="note-nav-list" target="_blank" @click="gotoMyNotes()">我的笔记</span> >
                <span>{{note.title}}</span>
            </div>
            <div class="note-header">
                <div class="left">
                    <img v-if="note.user" class="note-user-avatar" :src="note.user.avatar" :alt="note.user.nickname">
                </div>
                <div class="right">
                    <span class="note-creator" v-if="note.user">{{note.user.nickname}}</span>
                    <span class="note-time">{{note.update_time}}</span>
                </div>
            </div>
            <h1 class="note-title">{{note.title}}</h1>
<!--            <div class="markdown" v-html="note.html_content"></div>-->
            <mavon-editor
                defaultOpen="preview"
                :editable="false"
                v-model="note.content"
                :ishljs="true">
            </mavon-editor>
        </div>
        <div class="col-3"></div>
    </div>
</template>

<script>
import global_ from "../config/Global";

const note_url = global_.URLS.NOTE_URL;
    const upload_url = global_.URLS.FILE_URL;
    const note_update_url = global_.URLS.NOTE_UPDATE_URL;
    const token = localStorage.getItem("access_token");
    export default {
        name: "note",
        data() {
            return {
                user: {},
                note: {},
                tag_list: []
            };
        },
        methods: {
            gotoMyNotes() {
                this.$router.push({path: "/user/" + this.user.id + "/notes"});
            },
            getBrowserHeight() {
                let h = document.documentElement.clientHeight;
                return "height: " + (h - 150) + "px";
            },
            checkUserState() {
                if (!token) {
                    this.$router.push({path: "/login"});
                } else {
                    let user_json = localStorage.getItem("user_info");
                    this.user = JSON.parse(user_json);
                }
            },
            getUserInfo() {
                let user_info = localStorage.getItem("user_info");
                if (user_info) {
                    this.user = JSON.parse(user_info);
                } else {
                    this.$router.push({path: "/login"});
                }
            },
            getNote() {
                this.note.id = this.$route.params.id;
                if (this.note.id) {
                    this.$http.get(note_url + "subject/" + this.note.id, {
                        headers: {
                            bid: global_.FUNC.getBid(),
                            "X-HASYOU-TOKEN": token
                        }
                    }).then((data) => {
                        let res = data.body;
                        if (res.code === 200) {
                            this.note = res.data;
                        }
                    });
                }
            }
        },
        mounted() {
            this.getUserInfo();
            this.getNote();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/noteDetail';
</style>
