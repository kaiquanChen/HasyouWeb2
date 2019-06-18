<template>
  <form action="http://203.195.153.34:8080/login" method="POST">
    <label>手机号码：</label><input type="text" name="mobile" />
    <label>密码：</label><input type="password" name="password">
    <input type="submit" value="登录">
  </form>
</template>

<script>
    export default {
      name: "book",
      data() {
        return {
          blocks: [
            1, 2, 3, 5, 6
          ]
        };
      },
      methods: {
      },
      created() {
      }
    }
</script>

<style lang="scss" scoped>
</style>
