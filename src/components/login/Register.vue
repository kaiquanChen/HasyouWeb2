<template>
    <div id="login">
        <div class="left"></div>
        <div class="center">
          <h1>暂不支持!</h1>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
  import global_ from "../config/Global"
  import Bus from "../../js/bus"

  const kaptcha_url = global_.URLS.KAPTCHA_URL;
  const login_url = global_.URLS.LOGIN_URL;
    export default {
      name: "",
      data() {
        return {
        }
      },
      methods: {
      },
      created() {
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/login'
</style>
