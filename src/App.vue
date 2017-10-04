<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
      
    </div>
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>
<script>
  import header from './components/header/header';
  import { URLparse } from "common/js/extends";
  export default {
    data() {
        return {
            seller: {
              id : (() => {
                return URLparse().id;
              })()
            }
        }
    },
    created() {
        this.$http.get("/api/seller").then((res) => {
            this.seller = Object.assign({}, res.data.result, this.seller);
        }, (err) => {
            console.log('err');
        })
    },
    components : {
      "v-header" : header
    }
  }
</script>

<style scoped lang="stylus">
  @import "./common/stylus/mixin.styl"

  .tab 
    display: flex
    width: 100%
    line-height: 40px
    height: 40px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item 
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        text-decoration none
        &.active
          color: rgb(240, 20, 20)
          

</style>
