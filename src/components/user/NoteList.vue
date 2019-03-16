<template>
    <div class="user-note-items">
        <div class="user-note-item" v-for="(item, index) in notes" :key="item.id">
            <a class="item-title" href="">{{index + 1}} . {{item.title}}</a>
            <a-tag @click="gotoNoteTag(item.tag_name)" class="item-tag" color="orange" v-if="item.tag_name">{{item.tag_name}}</a-tag>
            <el-popover
                class="popover"
                placement="left-start"
                :disabled="popover_show"
                @show="show(item)"
                trigger="click">
                <NoteOperate></NoteOperate>
                <el-button style="border:#fff;" slot="reference">●●●</el-button>
            </el-popover>
            <span class="item-time">{{item.update_time}}</span>
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import NoteOperate from "./NoteOperate";
    import Bus from "../../js/bus"

    const note_url = global_.URLS.NOTE_URL;
    const note_update_url = global_.URLS.NOTE_UPDATE_URL;
    const token = sessionStorage.getItem("access_token");
    export default {
      name: "note",
      props:["notes"],
      data() {
        return {
            page: {
                page: 1,
                count: 20,
                total: 0
            },
            pop_show: false,
            select_tag: {},
            popover_show: false
        };
      },
      components:{NoteOperate},
      methods: {
          gotoNoteTag(tag_name) {
              Bus.$emit("goto-note-tag", tag_name);
          },
          handleCurrentChange(val) {
              this.page.page = val;
              this.getNotes();
          },
          save() {
              this.$http.post(note_update_url, {
                body: {
                    id: this.select_tag.id,
                    tag_name: this.select_tag.tag_name
                }
            }, {
                headers: {
                    "bid":global_.FUNC.getBid(),
                    "X-HASYOU-TOKEN": token
                }
            }).then(data => {
                let res = data.body;
                if (res.code === 5006) {
                    this.error_message = "账号或密码错误!";
                    return;
                }

                if (res.code === 5001) {
                    this.$router.push({path:"/register"});
                    return;
                }
                this.notes.map((item, key) => {
                    if (item.id === res.data.id) {
                        this.notes[key] = res.data;
                        return;
                    }
                })
                this.$message.success("操作成功!");
                this.hideModal();
            });
          },
          hideModal() {
              this.pop_show = false;
              this.popover_show = false;
          },
          show(item) {
              this.select_tag = item;
          },
          checkUserStatus() {
              if (!token) {
                  this.$router.push({path: "/login"});
              }
          },
          getUserInfo() {
              let user_info = sessionStorage.getItem("user_info");
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
      created() {
        this.checkUserStatus();
        this.getUserInfo();
        this.getMessage();
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/noteList'
</style>
