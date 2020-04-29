<template>
  <div class="grCertificate">
    <div class="grCertificate-title">我的光荣证</div>
    <div class="certificate" :class="inMoveAnimation ? 'aniTop' : ''" @animationend="moveEnd">
      <div class="userName">
        <i class="icon" :style="{ backgroundImage: 'url(' + userinfo.headImgUrl + ')' }"></i>
        <p>{{ userinfo.nickName }}</p>
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
            :key="index"
            :style="{ backgroundImage: 'url(./static/' + (item ? 'icon1' : 'icon2') + '.png)' }"
          ></li>
        </ul>
        <ul>
          <li
            class="star"
            v-for="(item, index) in isIcon"
            :key="index"
            :style="{ backgroundImage: 'url(./static/' + (item ? 'icon1' : 'icon2') + '.png)' }"
          ></li>
        </ul>
      </div>
      <p class="certificate-text">{{ userText.text1 }}</p>
      <p class="certificate-text">{{ userText.text2 }}</p>
    </div>
    <div class="box">
      <div class="firstLi">
        <div>礼品名称</div>
        <div>中奖时间</div>
      </div>
      <ul v-show="isShowPrize == 'prize'">
        <li v-for="(item, index) in giftData">
          <div>{{ item.prizeName }}</div>
          <div>{{ item.insertTime }}</div>
        </li>
        <li v-for="(item, index) in liNum">
          <div></div>
          <div></div>
        </li>
      </ul>
      <div class="wait" v-show="isShowPrize == 'wait'">
        查询中...
        <div class="loading"></div>
      </div>
    </div>
    <transition name="fade">
      <div class="alertActivi" v-show="isActivi">
        <div v-show="prizeAlert">
          <div class="activi-img" v-show="prizeAlert"></div>
          <p>
            您的光荣星级为
            <span>5</span>
            星
          </p>
          <p>
            获得
            <span>{{ alertName }}</span>
          </p>
          <i @click="sureAlert"></i>
        </div>
        <div v-show="!prizeAlert">
          <div class="activi-img2" v-show="!prizeAlert"></div>
          <p>
            恭喜您获得一份
          </p>
          <p>
            <span>光荣献礼</span>
          </p>
          <i class='lottery' @click="prizeAlert=true"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '../api.js';
export default {
  name: 'grCertificate',
  data() {
    return {
      userinfo: {
        name: '青西',
        useImg: 'https://pic.cwyyt.cn/upload/img/20200420/152603263_useImg.png'
      },
      userText: {
        text1: '人生是不断的奋斗过程，',
        text2: '需要你的勤劳勇敢。'
      },
      // isIcon: [false, false, false, false, false],
      giftData: [],
      inAnimation: 6,
      //需要闪几个星星
      starNum: 0,
      inMoveAnimation: false,
      //当前星星数
      nowStar: 0,
      //是否显示下面奖品列表
      isShowPrize: 'wait',
      //弹出奖品的名字
      alertName: '',
      isActivi: false, 
      //新增几次奖品
      newPrize: 1,
      //奖品弹窗切换
      prizeAlert: false
    };
  },
  computed: {
    liNum() {
      if (this.giftData.length <= 7) {
        return 7 - this.giftData.length;
      } else {
        return 0;
      }
    },
    isIcon() {
      var a = [false, false, false, false, false];
      for (let i = 0; i < this.nowStar; i++) {
        a[i] = true;
      }
      return a;
    }
  },
  mounted() {
    this.userinfo = JSON.parse(localStorage.getItem('info'));
    this.showStar(this.userinfo);
    this.getDraw();
  },
  methods: {
    //星星动画
    showStar(e) {
      var self = this;
      //假设e.num是显示星数
      self.nowStar = e.starView % 5;
      self.newPrize = Math.floor(e.star / 5) - Math.floor(e.starView / 5);
      if (e.star - e.starView > 0) {
        setTimeout(() => {
          self.flashStar(e.star - e.starView, e.starView % 5);
        }, 1000);
      }
    },
    //闪几个星
    flashStar(e, f) {
      var self = this;
      self.starNum = e;
      if (self.starNum <= 0) {
        return;
      }
      //e闪几颗星，f从第几颗开始闪
      setTimeout(() => {
        self.inAnimation = f % 5;
        self.nowStar = (f % 5) + 1;
        if (f >= 4) {
          self.starNum--;
          self.playMoveAnimation();
          return;
        }
        self.flashStar(e - 1, f + 1);
      }, 500);
    },

    //获取用户信息
    getInfo(e) {
      api.info(e).then(res => {
        if (res.data.code == 200) {
          this.isbutton = true;
          localStorage.setItem('info', JSON.stringify(res.data.data));
        } else {
          this.$layer.msg(res.msg);
        }
      });
    },
    getDraw() {
      var self = this;
      self.isShowPrize = 'wait';
      let data = JSON.parse(localStorage.getItem('info')).openid;
      api.draw(data).then(res => {
        if (res.data.code == 200) {
          self.giftData = res.data.data;
          self.isShowPrize = 'prize';
        } else {
          self.$layer.msg(res.data.msg);
        }
      });
    },
    playMoveAnimation() {
      this.inMoveAnimation = true;
    },
    //确认弹窗
    sureAlert() {
      var self = this;
      self.isActivi = false;
      self.flashStar(this.starNum, self.nowStar);
    },
    moveEnd() {
      var self = this;
      setTimeout(() => {
        if (self.nowStar == 5) {
          self.nowStar = 0;
          self.alertName = self.giftData[self.giftData.length - self.newPrize].prizeName;
          self.isActivi = true;
          return;
        }
      }, 1000);
      setTimeout(() => {
        self.inMoveAnimation = false;
      }, 2000);
      // this.inMoveAnimation=false
    },
    //触发动画
    playAnimation(e) {
      if ((e + 1) % 5 === 0) {
        this.nowStar = 0;
      }
      this.inAnimation = e;
      this.nowStar = e;
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
.wait {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 700;
  width: 100%;
  height: 70%;
  font-size: 25px;
  .loading {
    background: url(../../static/loading.gif) no-repeat;
    width: 50px;
    margin-top: 20px;
    height: 50px;
    background-size: 100% 100%;
  }
}

.aniTop {
  animation-duration: 2s;
  animation-timing-function: ease-in;
  animation-name: move;
  animation-fill-mode: forwards;
}

.anim {
  animation-duration: 0.5s;
  animation-name: twinkle;
  animation-fill-mode: forwards;
}

@keyframes move {
  0% {
    left: 0;
  }

  70% {
    left: -750px;
    opacity: 0;
  }

  71% {
    left: 0;
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes twinkle {
  0% {
    transform: scale(1);
  }

  90% {
    transform: scale(4);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 0;
  }
}

.grCertificate {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(../../static/grCertificateBG.png) no-repeat;
  background-size: 100% 100%;
  //弹窗样式
  .alertActivi {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    z-index: 95;
    color: rgb(159, 59, 30);
    font-size: 40px;
    .activi-img {
      background: url(../../static/active.png) no-repeat;
      background-size: 100% 100%;
      height: 20.5vh;
      width: 470px;
      margin-bottom: 5vh;
    }
    .activi-img2 {
      background: url(../../static/gift.png) no-repeat;
      background-size: 100% 100%;
      height: 300px;
      width: 300px;
      margin-bottom: 5vh;
    }
    i {
      display: block;
      width: 320px;
      height: 6vh;
      background: url(../../static/button_sure.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 2vh;
    }
    .lottery{
      background: url(../../static/lottery.png) no-repeat;
      background-size: 100% 100%;
    }
    p {
      margin-bottom: 2vh;
      color: rgb(149, 84, 9);
      font-size: 40px;
    }
    div {
      background: url(../../static/activibg.png) no-repeat;
      width: 700px;
      height: 65.67vh;
      background-size: 100% 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10vh;
    }
    span {
      color: rgb(180, 50, 37) !important;
      font-weight: 700;
    }
  }
  .grCertificate-title {
    margin-top: 3.823vh;
    padding-left: 5.8vw;
    height: 5vh;
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
    padding-top: 3.5vh;
    box-sizing: border-box;

    .certificate-text {
      font-size: 23.07px;
      color: black;
      font-weight: 700;
      text-align: left;
      text-indent: 17.173vw;
      margin-bottom: 0.5vh;
    }

    .certificate-title {
      font-size: 50px;
      color: #993126;
      font-weight: 800;
      letter-spacing: 10px;
    }

    .certificate-star {
      height: 7vh;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 1.5vh 0 1.5vh 128.8px;
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
        white-space: nowrap;
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
