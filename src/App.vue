<template>
  <div id="app"><router-view /></div>
</template>

<script>
import api from './api.js';
export default {
  name: 'App',
  data(){
    return{
        initData:[]
    }
  },
  created() {
    this.slice(location.href);
  },
  methods: {
    slice(url) {
      for (let i = 0; i < url.slice(44, -2).split('&').length; i++) {
        this.initData.push(
          url
            .slice(44, -2)
            .split('&')
            [i].split('=')[1]
        );
      }
      this.getJsSign();
    },
    getJsSign() {
      var self = this;
      api.getJsSign(url).then(res => {
        if (res.data.code == 200) {
          self.wx.config({
          	debug: false,
          	appId: res.data.data.appid,
          	timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          	nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          	signature: res.data.data.signature, // 必填，签名
          	jsApiList: [ 'hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
          })
          self.wx.ready(function() {
          	self.wx.hideAllNonBaseMenuItem();
          })
        } else {
          self.$layer.msg(res.msg);
        }
      });
    }
  }
};
</script>

<style>
html,
body,
ul,
p {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
