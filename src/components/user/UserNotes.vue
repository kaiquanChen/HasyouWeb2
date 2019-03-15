<template>
  <div id="user-note">
      <h1>Hello David!</h1>
  </div>
</template>

<script>
    import global_ from "../config/Global";

    const note_url = global_.URLS.NOTE_URL;
    const token = sessionStorage.getItem("access_token");
    export default {
      name: "book",
      data() {
        return {
            user: {},
            notes: [],
            page: {
                page: 1,
                count: 20,
                total: 0
            }
        };
      },
      methods: {
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
          getNotes() {
            this.$http.get(note_url + "subjects", {
                params: {
                    type: "NOTE",
                    p: this.page.page,
                    count: this.page.count
                },
                headers:{
                    "bid": global_.FUNC.getBid(),
                    "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
                }
            }).then(data => {
                this.notes = data.body.data.body;
                this.page.page = data.body.data.page;
                this.page.count = data.body.data.count;
                this.page.total = data.body.data.total;
            });
          }
      },
      created() {
          this.checkUserStatus();
          this.getUserInfo();
          this.getNotes();
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/user.scss'
</style>
