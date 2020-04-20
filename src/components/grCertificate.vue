<template>
  <div class="grCertificate">
    <div class="grCertificate-title" @click="playAnimation(4)">我的光荣证</div>
    <div class="certificate">
      <div class="userName">
        <i class="icon" :style="{ backgroundImage: 'url(' + userinfo.useImg + ')' }"></i>
        <p>{{ userinfo.name }}</p>
      </div>
      <div class="certificate-title">光荣证</div>
      <div class="certificate-star">
        <p>光荣星级:</p>
        <ul>
          <li
            class="star"
            v-for="(item, index) in isIcon"
            :class="inAnimation == index ? 'anim' : ''"
            @animationend="inAnimation = 6"
            :style="{ backgroundImage: 'url(../../static/' + (item ? 'icon1' : 'icon2') + '.png)' }"
          ></li>
        </ul>
        <ul>
          <li
            class="star"
            v-for="(item, index) in isIcon"
            :style="{ backgroundImage: 'url(../../static/' + (item ? 'icon1' : 'icon2') + '.png)' }"
          ></li>
        </ul>
      </div>
      <p class="certificate-text">{{ userinfo.text }}</p>
    </div>
    <div class="box">
      <div class="firstLi">
        <div>礼品名称</div>
        <div>中奖时间</div>
      </div>
      <ul>
        <li v-for="(item, index) in giftData">
          <div>{{ item.name }}</div>
          <div>{{ item.time }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'grCertificate',
  data() {
    return {
      userinfo: {
        name: '青西',
        useImg: 'https://pic.cwyyt.cn/upload/img/20200420/152603263_useImg.png',
        text: '人生是不断的奋斗过程，需要你的勤劳勇敢。'
      },
      isIcon: [false, false, false, false, false],
      giftData: [
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' },
        { name: 'DM物质', time: '2020-05-03 08:00:52' }
      ],
      inAnimation: 6,
      dd:0
    };
  },
  mounted() {
    this.fn(3)
  },
  methods: {
    //连续触发
    fn(e){
      var self=this;
      setTimeout(()=>{
        self.playAnimation(self.dd);
        self.dd++;
        if(self.dd>=e){
          return
        }
        self.fn(e);

      },1500)
    },
    //触发动画
    playAnimation(e) {
      this.inAnimation = e;
      this.isIcon[e] = true;
    }
  }
};
</script>

<style scoped lang="less">
.anim {
      animation-duration: 1s;
      animation-name: twinkle;
      animation-fill-mode: forwards;
}
@keyframes twinkle {
 0% {
   transform: scale(1);
 }

 90% {
   transform: scale(4);
   opacity: 0;
 }
// 100%{
//   transform: scale(2);
//   opacity: 0;
// }
 to {
   transform: scale(1);
   opacity: 0
 }
}
.grCertificate {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(../../static/grCertificateBG.png) no-repeat;
  background-size: 100% 100%;
  .grCertificate-title {
    margin-top: 3.823vh;
    padding-left: 5.8vw;
    text-align: left;
    font-size: 35px;
    color: #993126;
    margin-bottom: 2.143vh;
  }
  .certificate {
    background: url(../../static/certificate.png) no-repeat;
    background-size: 100% 100%;
    width: 86.93vw;
    height: 28.56vh;
    margin: 0 auto;
    position: relative;
    padding-top: 4vh;
    box-sizing: border-box;
    .certificate-text {
      font-size: 23.07px;
      color: black;
      font-weight: 700;
    }
    .certificate-title {
      font-size: 50px;
      color: #993126;
      font-weight: 800;
      letter-spacing: 10px;
    }
    .certificate-star {
      height: 9vh;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 2.174vh 0 2.174vh 128.8px;
      box-sizing: border-box;
      position: relative;
      .star {
        height: 6.2vw;
        width: 6.2vw;
        background-size: 100% 100%;
      }
      ul {
        width: 35vw;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 32.997vw;
        top: 0;
      }
      p {
        font-size: 23.07px;
        color: #993126;
        font-weight: 700;
        width: 15.824vw;
      }
    }
    .userName {
      position: absolute;
      top: 3vh;
      left: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 23.1px;
    }
    .icon {
      display: block;
      width: 63px;
      height: 63px;
      background-size: 100% 100%;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
  .box {
    height: 47.86vh;
    background-color: #dbc4b0;
    width: 90vw;
    margin: 11.4vh auto 0;
    border-radius: 50px;
    overflow: hidden;
    .longText {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      cursor: default;
    }
    ul {
      height: 61.0524vh;
      overflow: hidden;
      overflow-y: auto;
    }
    ul::-webkit-scrollbar {
      display: none;
    }
    li,
    .firstLi {
      display: flex;
      align-items: center;
      font-size: 28px;
      color: black;
      height: 6vh;
      div {
        width: 60vw;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: center;
        padding: 10px;
        border-right: solid 5px #d5b79f;
      }
      div:first-of-type {
        width: 30vw;
        color: black;
      }
      div:last-of-type {
        border: none;
      }
    }
    li:nth-of-type(even) {
      background-color: #e7dacd;
    }
  }
  .firstLi {
    font-size: 30px !important;
    color: #ab2b2b;
    font-weight: 700;
    background-color: #e7dacd;
    div {
      color: #ab2b2b !important;
    }
  }
}
</style>
