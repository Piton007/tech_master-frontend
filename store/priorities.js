import getAll from "@/networking/priorities/get.all"


export const state = () => ({
    list: []
})

export const getters = {
    getAll: (state) => () =>{
        return state.list
    }
}

export const mutations = {
    set(state,priorities){
       state.list = priorities.sort((a,b)=>a.sla - b.sla)
    }
    
}

export const actions = {
    fetchAll({commit,rootState}){
        return getAll.bind(this)(rootState.user.token)
        .then((priorities)=>{
            return commit('set',priorities)
        })  
           
    }
}

