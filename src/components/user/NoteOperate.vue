<template>
  <ul id="note-operate">
    <li class="item-operate">笔记详情</li>
    <li @click="sendMessage('edit')" class="item-operate" >修改内容</li>
    <li @click="sendMessage('tag')" class="item-operate">修改标签</li>
    <li class="item-operate">删除笔记</li>
  </ul>
</template>

<script>
    import global_ from "../config/Global";
    import Bus from "../../js/bus"

    const note_url = global_.URLS.NOTE_URL;
    const token = sessionStorage.getItem("access_token");
    export default {
      name: "book",
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
