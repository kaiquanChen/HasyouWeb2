<template>
  <div id="user-album">
    <h1>我的相册</h1>
    <div class="photos-btn">
        <span class="photos-btn-pic">
            <a target="_blank" class="lnk-create" :href="gotoAlbumUpload()"><i>+</i>发照片</a>
        </span>
        <span class="photos-btn-pic">
            <a target="_blank" class="lnk-create-album" :href="gotoAlbumUpload()"><i>+</i>新建相册</a>
        </span>
    </div>
    <ul class="record-items" v-if="albums && albums.length > 0">
        <li class="record-item album" v-for="album in albums" :key="album.id">
            <div class="album-card" @click="gotoAlbumDetail(album.id)">
                <img :src="album.first_image_url" alt="card" v-if="album.first_image_url">
                <img src="/static/icon/photo_album_thumb.png" alt="" v-else>
            </div>
            <a class="album-name" target="_blank" :href="gotoAlbumDetail(album.id)">{{album.name}}</a><br>
            <span class="create-time">{{getDate(album.create_time)}}更新</span>
        </li>
    </ul>
    <ul class="record-items" v-else>你还没有相册，去创建自己的第一个相册吧!</ul>
  </div> 
</template>

<script>
    import global_ from "../config/Global";

    const user_album_url = global_.URLS.USER_ALBUM_URL;
    const token = localStorage.getItem("access_token");
    export default {
      name: "book",
      data() {
        return {
            user: null,
            albums: []
        };
      },
      methods: {
        getDate(time) {
            return time.split(" ")[0];
        },
        gotoAlbumUpload() {
            return "/user/" + this.user.id + "/album/upload";
        },
        gotoAlbumDetail(id) {
            return "/user/" + this.user.id + "/album/" + id;
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
    @import './css/userAlbums'
</style>
