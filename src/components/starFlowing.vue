<template>
  <div class='starFlowing'>
<div class="box">
      <div class="firstLi">
        <div>获取时间</div>
        <div>数量</div>
        <div>获取来源</div>
      </div>
      <ul>
        <li v-for="(item, index) in listData">
          <div>{{ item.insertTime }}</div>
          <div>{{ item.star}}</div>
          <div >{{ item.type }}</div>
        </li>
        <li v-for="item in liNum">
          <div></div>
          <div></div>
          <div></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../api.js'
  export default{
    name:'starFlowing',
    data(){
      return{
        listData: [
        ]
      }
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
      this.getRecord()
    },
    methods:{
      getRecord(){
        var self =this;
        let data=JSON.parse(localStorage.getItem('info')).userId;
        api.record(data).then((res)=>{
          if(res.data.code==200){
            self.listData=res.data.data.map((res)=>{
              var aName='';
              if(res.type==1){
                aName='扫码';
              }else if(res.type==2){
                aName='首页';
              }else{
                aName=res.type;
              }
              return{
                insertTime:res.insertTime,
                star:res.star,
                type:aName
              }
            });
          }else{
            self.$layer.msg(res.data.msg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
.starFlowing{
  background: url(../../static/flowingBG.png) no-repeat;
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  .box {
    height: 66.14vh;
    background-color: #dbc4b0;
    width: 700px;
    margin: 30.11vh auto 0;
    border-radius: 50px;
    overflow: hidden;
    // .longText {
    //   text-align: left;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   display: -webkit-box;
    //   -webkit-line-clamp: 2;
    //   -webkit-box-orient: vertical;
    //   cursor: default;
    // }
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
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: center;
        padding: 10px;
        border-right: solid 5px #d5b79f;
      }
      div:first-of-type {
        width: 300px;
        color: black;
        white-space: nowrap;
      }
      div:last-of-type {
        border: none;
        width: 290px;
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
