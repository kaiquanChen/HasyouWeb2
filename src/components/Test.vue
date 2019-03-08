<template>
  <div v-masonry origin-left="false" transition-duration="1s" item-selector=".item">
    <div v-masonry-tile class="item" v-for="(item, index) in blocks">
      <p>{{item}}</p>
    </div>
  </div> 
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
        // this.$router.push({path: "/book/books"});
      }
    }
</script>

<style lang="scss" scoped>
</style>
