export const state = ()=>({
    userInfo:{
        token:'',
        user:{}
    }
})

export const mutations = {
    //保存用户信息到state
    setUserInfo(state,data){
        state.userInfo = data
    },
    removeUserInfo(state,data){
        // localStorage.removeItem('mykey')
        state.userInfo = {}
    }
}

export const actions = {
    //登录
    login({commit},data){
        return this.$axios({
            method:'post',
            url:'/accounts/login',
            data
          }).then(res=>{
            let data = res.data
            
            return data
          })
    }
}