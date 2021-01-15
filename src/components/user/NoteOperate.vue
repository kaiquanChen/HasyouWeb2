<template>
    <ul id="note-operate">
        <li @click="sendMessage('share')" class="item-operate">共享笔记</li>
        <li @click="sendMessage('edit')" class="item-operate">修改内容</li>
        <li @click="sendMessage('tag')" class="item-operate">修改标签</li>
        <li @click="sendMessage('delete')" class="item-operate">删除笔记</li>
    </ul>
</template>

<script>
import Bus from "../../js/bus"

const token = localStorage.getItem("access_token");
    export default {
        name: "NoteOperate",
        data() {
            return {
                user: {},
            };
        },
        methods: {
            sendMessage(type) {
                if (type === "edit") {
                    Bus.$emit("note-edit", true);
                } else if (type === "tag") {
                    Bus.$emit("edit-tag-name", true);
                    Bus.$emit("popover-show", true);
                } else if (type === "detail") {
                    Bus.$emit("note-detail", true);
                } else if (type === "delete") {
                    Bus.$emit("note-delete", true);
                } else if (type === "share") {
                    Bus.$emit("note-share", true);
                    Bus.$emit("popover-show", true);
                }
            }
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/noteOperate'
</style>
