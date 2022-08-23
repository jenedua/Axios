import Vue from 'vue'
import Axios  from 'axios'

// Axios.defaults.baseURL = 'https://curso-vue-1c945-default-rtdb.firebaseio.com/'
// Axios.defaults.headers.common['Authorization'] = 'abc123'
// Axios.defaults.headers.get['Accepts'] = 'application/json'

Vue.use({

    install(Vue){
        // Vue.prototype.$http = Axios
        Vue.prototype.$http = Axios.create({
            baseURL : 'https://curso-db862-default-rtdb.firebaseio.com/',
             headers: {                
                 "Authorization" : "abc123"                
             }
        })

        // criar interceptorio global
        Vue.prototype.$http.interceptors.request.use(config =>{
            // if(config.method == 'post'){
            //     config.method = 'put'
            // }
            //console.log(config.method)
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res => {
            // // const array = []
            // // for(let chave in res.data){
            // //     array.push({id: chave, ...res.data[chave]})
            // // }
            // res.data = array
            // console.log(res.data);
            return res
        }, error => Promise.reject(error))
    }
})