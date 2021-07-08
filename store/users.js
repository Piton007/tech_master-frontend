import getAllUser from "@/networking/users/get.all.user"
const ROLS = {
    "admin":"Admin",
    "tech":"Técnico",
    "tech_2":"Técnico II",
    "volunteer":"Voluntario",
    "teacher":"Maestro"
}
const PRIORITY = {
    "high":"Alta",
    "medium":"Media",
    "low":"Baja"
}

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
        state.list.unshift(assembleVM(user))
    },
    set(state,users){
        state.list = users.map(assembleVM)
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
function assembleVM(x){
    return {...x,fullname:x.firstName + " "+x.lastName,priority:PRIORITY[x.priority],rol:ROLS[x.rol]}
}