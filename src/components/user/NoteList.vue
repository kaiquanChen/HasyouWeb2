<template>
    <div class="user-note-items">
        <div class="user-note-item" v-for="(item, index) in notes" :key="item.id">
            <a target="_blank" class="item-title" :href="gotoNoteDetail(item.id)">{{index + 1 + (page.page - 1) *
                page.count}} . {{item.title}}</a>
            <a-tag @click="gotoNoteTag(item.tag_name)" class="item-tag" color="orange" v-if="item.tag_name">
                {{item.tag_name}}
            </a-tag>
            <el-popover
                class="popover"
                placement="left-start"
                :disabled="popover_show"
                @show="show(item)"
                trigger="click">
                <NoteOperate></NoteOperate>
                <el-button style="border:#fff;" slot="reference">●●●</el-button>
            </el-popover>
            <span class="item-time">{{getCreateTime(item.update_time)}}</span>
        </div>
    </div>
</template>

<script>
    import NoteOperate from "./NoteOperate";
import Bus from "../../js/bus"

    const token = localStorage.getItem("access_token");

    export default {
        name: "note",
        props: ["notes", "page"],
        data() {
            return {
                // page: {
                //     page: 1,
                //     count: 20,
                //     total: 0
                // },
                pop_show: false,
                popover_show: false
            };
        },
        components: {NoteOperate},
        methods: {
            getCreateTime(s) {
                let arr = s.split(" ");
                if (arr.length > 2) {
                    return arr[0] + " " + arr[1] + arr[arr.length - 1].substr(arr[arr.length - 1].length - 1, arr[arr.length - 1].length);
                } else {
                    if (arr.length === 2) {
                        return arr[0] + " " + arr[1];
                    } else {
                        return arr[0];
                    }
                }
            },
            gotoNoteDetail(id) {
                return "/note/subject/" + id;
            },
            gotoNoteTag(tag_name) {
                Bus.$emit("goto-note-tag", tag_name);
            },
            hideModal() {
                this.pop_show = false;
                this.popover_show = false;
            },
            show(item) {
                Bus.$emit("select-tag", item);
            },
            checkUserStatus() {
                if (!token) {
                    this.$router.push({path: "/login"});
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
            getMessage() {
                Bus.$on("popover-show", response => {
                    this.popover_show = response;
                });
            }
        },
        mounted() {
            this.checkUserStatus();
            this.getUserInfo();
            this.getMessage();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/noteList';
</style>
