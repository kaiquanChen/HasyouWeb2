<template>
    <div id="album-upload">
        <h1 class="title">上传照片</h1>
        <FileUpload v-on:returnFileIds="returnFileIds"></FileUpload>
        <div class="album">
            <h2 class="title">选择相册</h2>
            <div class="setting-tabs">
                <div :style="getStyle(true)" @click="toggleTab()" class="album">
                    <span>已有相册</span>
                    <img v-show="select" class="selected-album" src="/static/icon/tab_triangle_up.png" alt="triangle">
                </div>
                <div :style="getStyle(false)" @click="toggleTab()" class="new">
                    <span>新建相册</span>
                    <img v-show="!select" class="selected-new" src="/static/icon/tab_triangle_up.png" alt="triangle">
                </div>
            </div>
            <div class="new-album" v-show="!select">
                <label class="item">相册名称&emsp;(必填)</label>
                <input class="item" v-model="album_name" maxlength="20" type="text"/><br>
                <label class="item">相册描述</label>
                <textarea class="item" v-model="album_description" maxlength="128" type="text"/>
                <div class="album-btn">
                    <span class="btn-save" @click="saveAlbum()">保存</span>
                    <span class="btn-cancel" @click="cancelUpload()">取消</span>
                </div>
            </div>
            <div class="existed-albums" v-show="select">
                <ul class="album-items">
                    <li class="album-item" v-for="item in albums" :key="item.id">
                        <label>
                            <input type="radio" :value="item.id" v-model="album_id">&nbsp;{{item.name}}
                        </label>
                    </li>
                </ul>
                <div class="album-btn">
                    <span class="btn-save" @click="savePhotos()">保存</span>
                    <span class="btn-cancel" @click="cancelUpload()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import FileUpload from "../common/file/FileUpload";

    const user_album_url = global_.URLS.USER_ALBUM_URL;
    const save_album_url = global_.URLS.SAVE_ALBUM_URL;
    const save_photo_url = global_.URLS.SAVE_PHOTO_URL;
    // const token = sessionStorage.getItem("access_token");
    const token = localStorage.getItem("access_token");
    export default {
      name: "book",
      data() {
        return {
            user: null,
            file_ids:[],
            albums:[],
            select: false,
            album_name: "",
            album_description: "",
            select_album: {},
            album_id: ""
        };
      },
      components:{FileUpload},
      methods: {
          toggleTab() {
              this.select = !this.select;
          },
          returnFileIds(file_ids) {
              this.file_ids = file_ids;
          },
          getStyle(select) {
              if (select === this.select) {
                return "color:#37a;background-color:#ddd";
              } else {
                return "";
              }
          },
          cancelUpload() {
              this.$router.push({path: "/user/" + this.user.id});
          },
          savePhotos() {
              if (!this.file_ids || this.file_ids.length === 0) {
                  this.$message.error("图片不能为空");
                  return;
              }

            this.$http.post(save_photo_url, {
                body: {
                    album_id: this.album_id,
                    file_ids: this.file_ids
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

                if (res.code === 200) {
                    this.$router.push({path: "/user/" + this.user.id + "/albums"});
                }
            });
          },
          saveAlbum() {
            if (!this.album_name) {
                this.$message.error("相册名称不能为空!");
                return;
            }

            this.$http.post(save_album_url, {
                body: {
                    name: this.album_name,
                    description: this.album_description
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

                this.select_alubum = res.data;
                this.albums.push(res.data);
                this.album_id = res.data.id;
                this.select = !this.select;
            });
          },
          getAlbums() {
            this.$http.get(user_album_url, {
                headers: {
                    "bid":global_.FUNC.getBid(),
                    "X-HASYOU-TOKEN": token
                }
            }).then(data => {
                this.albums = data.body.data;
            });
        },
        getUserInfo() {
            let user_info = localStorage.getItem("user_info");
            // let user_info = sessionStorage.getItem("user_info");
            if (user_info) {
                this.user = JSON.parse(user_info);
            } else {
                this.$router.push({path: "/login"});
        }
        },
      },
      created() {
        this.getAlbums();
        this.getUserInfo();
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/albumUpload'
</style>
