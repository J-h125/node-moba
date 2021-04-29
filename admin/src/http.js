import axios from "axios";
import Vue from 'vue'
import router from "@/router";
const http = axios.create({
        baseURL:'http://localhost:3000/admin/api'
    })

// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token){
        config.headers.Authorization ='bearer ' + (localStorage.token||'')
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
http.interceptors.response.use(res=>{      //axios拦截器
    return res
},(err)=>{
    Vue.prototype.$message({                 //element ui   挂载到了 prototype上
        type:"error",
        message: err.response.data.message
    })
    if(err.response.status === 401){
        router.push('')
    }

   return Promise.reject(err)
})
export default http