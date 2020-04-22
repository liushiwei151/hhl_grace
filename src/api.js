import axios from 'axios'
import qs from 'qs'
// axios.defaults.timeout = 3000; //响应时间
//测试
 axios.defaults.baseURL = 'http://qrhhl.yunyutian.cn/huanghelou1916-labor';   //配置接口地址
 //正式
 // axios.defaults.baseURL = 'https://qr.hhl1916.com/huanghelou1916-market/market';   //配置接口地址
axios.defaults.withCredentials = true;

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
   if(localStorage.getItem('info')){
      let  token =JSON.parse(localStorage.getItem('info')).token;
      config.headers.token = token;
    }
    return config;
},(error) =>{
    alert('错误的传参')
    return Promise.reject(error);
});

const  getJsSign=(data)=>{
	return axios.get('/labor/index/getJsSign',{
		params:{
			url:data
		}
	})
}
const info =(data)=>{
  return axios.post('/labor/index/info/'+data[0]+'/'+data[1])
}
const rank=()=>{
  return axios.get('/labor/star/rank')
}
const draw=(data)=>{
  return axios.post('/labor/certificate/draw/'+data)
}
export default{
getJsSign,
rank,
info,
draw
}
