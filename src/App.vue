<template>
  <div id="app">
    <router-view />
    <div class='flowingIcon' @click="goWeb('starFlowing')"></div>
  </div>
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
    this.prohibitFontSize();
    this.$router.push('/');
    this.slice(location.href);
  },
  methods: {
    //wx禁止调整字体大小
        prohibitFontSize(){
          if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
            handleFontSize();
          } else {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', handleFontSize);

              document.attachEvent('onWeixinJSBridgeReady', handleFontSize);
            }
          }
          var handleFontSize = function () {
            // 设置网页字体为默认大小
            WeixinJSBridge.invoke('setFontSizeCallback', {
              fontSize: 0
            });

            // 重写设置网页字体大小的事件
            WeixinJSBridge.on('menu:setfont', function() {
              WeixinJSBridge.invoke('setFontSizeCallback', {
                fontSize: 0
              });
            });
          }
        },
    goWeb(e){
      this.$router.push(e)
    },
    slice(url) {
      var a =url.split('?')[1].slice(0,-2);
      for (let i = 0; i < a.split('&').length; i++) {
        this.initData.push(
         a.split('&')
            [i].split('=')[1]
        );
      }
      this.getJsSign();
    },
    getJsSign() {
      var self = this;
      let url = location.href.split('#')[0];
      var share={
        title:'劳动最光荣，一起领证去！',
        desc:'点亮你的光荣星，10000份好礼等你领！',
        link:'http://qrhhl.yunyutian.cn/huanghelou1916-center/wx/gCode?name=toLabor',//todo 测试服地址
        imgUrl:'https://pic.cwyyt.cn/upload/img/20200429/1637373737_shareImg.jpg'
      }
      api.getJsSign(url).then(res => {
        if (res.data.code == 200) {
          self.wx.config({
          	debug: false,
          	appId: res.data.data.appid,
          	timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          	nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          	signature: res.data.data.signature, // 必填，签名
          	jsApiList: [ 'hideMenuItems','updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
          })
          self.wx.ready(function() {
          	self.wx.hideMenuItems({
          	  menuList: ['menuItem:editTag','menuItem:copyUrl','menuItem:originPage','menuItem:openWithQQBrowser','menuItem:openWithSafari','menuItem:share:email','menuItem:share:brand']
          	});
             self.wx.updateAppMessageShareData({
                title: share.title, // 分享标题
                desc: share.desc, // 分享描述
                link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: share.imgUrl, // 分享图标
                success: function () {
                  // 设置成功
                }
              });
              self.wx.updateTimelineShareData({
                  title: share.title, // 分享标题
                  link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: share.imgUrl, // 分享图标
                  success: function () {
                    // 设置成功
                  }
                })
          })
        } else {
          self.$layer.msg(res.data.msg);
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
.flowingIcon{
  background: url(../static/flowing.png) no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: fixed;
  right: 50px;
  bottom: 100px;
}
</style>
