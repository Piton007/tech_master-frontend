import getAllUser from "@/networking/users/get.all.user"


export const state = () => ({
    list:[],
    fetched:false,
})

export const getters = {

    getUsers: (state) => () =>{
        return state.list
    }
}

export const mutations = {
    add(state,user){
        state.list.unshift(user)
    },
    set(state,users){
        state.list = users
    }
}

export const actions = {
    getUsers({state,commit,rootState}){
        return getAllUser.bind(this)(rootState.user.token).then((data)=>{
                    commit('set',data)
                    state.fetch = true
                    
            })
           
    }
}
