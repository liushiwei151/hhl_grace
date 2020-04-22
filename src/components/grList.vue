<template>
  <div class="grList">
    <div class="box">
      <div class="firstLi">
        <div>排名</div>
        <div>用户编号</div>
        <div>昵称</div>
        <div>光荣星</div>
      </div>
      <ul>
        <li v-for="(item, index) in listData">
          <div>{{ item.rank }}</div>
          <div>{{ item.memberNo}}</div>
          <div class="longText">{{ item.nickName }}</div>
          <div>{{ item.star }}</div>
        </li>
        <li v-for="item in liNum">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../api.js';
export default {
  name: 'grList',
  data() {
    return {
      listData: [
      ]
    };
  },
  computed:{
    liNum(){
      if(this.listData.length<=10){
        return 10-this.listData.length
      }else{
        return 0
      }
    }
  },
  created() {
    this.getRank()
  },
  methods: {
    getRank() {
      var self= this;
      api.rank().then(res => {
        if (res.data.code == 200) {
          self.listData=res.data.data
        }else{
          self.$layer.msg(res.data.msg)
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.grList {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(../../static/grListBG.png) no-repeat;
  background-size: 100% 100%;
  .box {
    height: 66.14vh;
    background-color: #dbc4b0;
    width: 90vw;
    margin: 30.11vh auto 0;
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
      font-size: 25px;
      height: 6vh;
      div {
        width: 24.8vw;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: center;
        padding: 10px;
        border-right: solid 5px #d5b79f;
      }
      div:first-of-type {
        width: 15.6vw;
        color: black;
      }
      div:last-of-type {
        border: none;
      }
    }
    li:nth-of-type(-n + 10) {
      div:first-of-type {
        color: #ab2b2b;
        font-weight: 700;
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
