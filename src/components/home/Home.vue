<template>
  <div id="withyou-home">
    <withyou-header></withyou-header>
    <router-view class="withyu-home-center"></router-view>
    <withyou-footer></withyou-footer>
  </div>
</template>

<script>
  import global_ from '../config/Global'
  import Header from '@/components/header/Header'
  import Footer from '@/components/footer/Footer'
  export default {
    name: 'HelloWorld',
    components:{
      withyouHeader: Header,
      withyouFooter: Footer
    },
    data () {
      return {
      }
    },
    methods: {
      getHeight() {
        // let height = global_.FUNC.getBrowserHeight();
        // return "height:" + height;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .withyu-home-center {
    padding-top: 59px;
  }
</style>
