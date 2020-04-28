<template>
  <div class="home">
    <div class="rule" @click="alertImg(true)"></div>
    <div class="box box1" @click="goWeb('grCertificate')"></div>
    <div class="box box2" @click="goWeb('grList')"></div>
    <transition name="fade">
      <div v-show="show" class="ruleContet"><div class="close" @click="alertImg(false)"></div></div>
    </transition>
  </div>
</template>
<script>
import api from '../api.js';
export default {
  name: 'home',
  data() {
    return {
      show: false,
      initData:[],
      isbutton:false,
      clickNum:0
    };
  },
  created() {
    //todo 修改
		// this.slice('http://qrhhl.yunyutian.cn/labor/index.html?openid=oXslc0zEvV5RwspCzgWcQMmL-_yA&customerId=0000003#/')
    this.slice(location.href)
  },
  methods: {
    slice(url) {
      var a =url.split('?')[1].slice(0,-2);
      for (let i = 0; i < a.split('&').length; i++) {
        this.initData.push(
         a.split('&')
            [i].split('=')[1]
        );
      }
      console.log(this.initData);
      this.getInfo(this.initData)
    },
    //获取用户信息
    getInfo(e){
      api.info(e).then((res) => {
        if(res.data.code==200){
          this.isbutton=true;
          localStorage.setItem('info',JSON.stringify(res.data.data))
        }else{
          this.$layer.msg(res.msg)
        }
      });
    },
    goWeb(e) {
      console.log(this.isbutton)
      if(!this.isbutton){
        this.clickNum++;
        if(this.clickNum>=10){
          this.$layer.msg('请耐心等待，或刷新重试')
        }
        return
      }
      this.$router.push(e);
    },
    alertImg(e) {
      this.show = e;
    }
  }
};
</script>

<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.home {
  background: url(../../static/bg.jpg) no-repeat;
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  .ruleContet {
    background: url(../../static/ruleContent.png) no-repeat;
    background-size: 100% 100%;
    z-index: 50;
    position: fixed;
    width: 100%;
    height: 100%;
    .close {
      background: url(../../static/close.png) no-repeat;
      background-size: 100% 100%;
      z-index: 51;
      position: absolute;
      width: 48.667vw;
      height: 6.08vh;
      top: 85.83vh;
      left: 25.6665vw;
    }
  }
  .rule {
    background: url(../../static/ruleButton.png) no-repeat;
    background-size: 100% 100%;
    width: 19vw;
    height: 5.55vh;
    position: absolute;
    right: 2.3vw;
    top: 27.44vh;
  }
  .box1 {
    background: url(../../static/button1.png) no-repeat;
    top: 70.46vh;
  }
  .box2 {
    background: url(../../static/button2.png) no-repeat;
    top: 83.035vh;
  }
  .box {
    background-size: 100% 100%;
    width: 65.86vw;
    height: 8.17vh;
    position: absolute;
    left: 17.07vw;
  }
}
</style>
