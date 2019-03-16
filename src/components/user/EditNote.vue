<template>
    <div id="edit-note">
        <div class="note-header">
            <input class="note-title" type="text" v-model="title" placeholder="请输入标题...">
        </div>
      <mavon-editor
        ref=md
        v-model="content"
        :style="getBrowserHeight()"
        @save="save(false)"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        id="edit-markdown"
        :ishljs="true">
      </mavon-editor>
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
      data() {
        return {
            tag: {},
            content: "",
            title: ""
        };
      },
      components:{NoteOperate},
      methods: {
          getBrowserHeight() {
            let h = document.documentElement.clientHeight;
            return "height: " + h + "px";
          },
          checkUserState() {
            let token = sessionStorage.getItem("access_token");
            if (!token) {
              this.$router.push({path: "/login"});
            } else {
              let user_json = sessionStorage.getItem("user_info");
              this.user = JSON.parse(user_json);
            }
          },
          save(published) {
            this.params.published = published;
            this.checkParams();
            this.$http.post(save_blog_url, {
              body: {
                id: this.params.id,
                title: this.params.title,
                content: this.params.content,
                published: this.params.published,
                is_private: this.params.is_private
              }
            }, {
              headers: {
                bid: global_.FUNC.getBid(),
                "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
              }
            }).then((data) => {
              let res = data.body;
              if (res.code !== 200) {
                this.$message.error("保存失败!");
                console.log(data);
                return;
              }
              this.$message({
                message: '保存成功!',
                type: 'success'
              });
            });
          },
          $imgAdd(pos, $file) {
            let formData = new FormData();
            formData.append("file", $file);
            formData.append("key", this.user.nickname + "/");
            let options = {
              url: upload_url,
              data: formData,
              method:"post",
              headers: {
                'Content-Type': 'multipart/form-data',
                "bid": global_.FUNC.getBid()
              }
            };
            axios(options).then((res) => {
              if (res.data.code === 200) {
                let fly_file = res.data.data[0];
                this.$refs.md.$img2Url(pos, fly_file["file_url"]);
                this.params.file_ids.push(fly_file.id);
              }
            });
          },
          $imgDel(pos) {
            // delete
          },
          checkParams() {
            let params = this.params;
            if (!params.title) {
              this.$message.error("文章标题不能为空!");
              return;
            }

            if (!params.content) {
              this.$message.error("文章内容不能为空!");
            }
          }
      },
      created() {
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/editNote'
</style>
