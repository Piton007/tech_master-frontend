import getAll from "@/networking/blogs/get.all"
import create from "@/networking/blogs/create"
import update from "@/networking/blogs/update"
import remove from "@/networking/blogs/delete"
import dayjs from "dayjs"
import dayjsUTC from "dayjs/plugin/utc"
dayjs.extend(dayjsUTC)


export const state = () => ({
    list: []
})

export const getters = {
    getAll: (state) => () =>{
        return state.list
    },
    findById:(state)=>(id)=>{
        return state.list.find(x=>x.id == id)
    }
}

export const mutations = {
    set(state,blogs){
       state.list = blogs
       .sort((a,b)=>{return dayjs(b.fechaActualizacion).diff(a.fechaActualizacion)})
    },
    update(state,blog){
        const index = state.list.findIndex(x=>x.id === blog.id)
        state.list[index] = blog
    },
    remove(state,blog){
        const index = state.list.findIndex(x=>x.id === blog.id)
        state.list.splice(index,1)
    },
    add(state,blog){
        state.list.unshift(blog)
    }
}

export const actions = {
    fetchAll({commit,rootState}){
        return getAll.bind(this)(rootState.user.token)
        .then((blogs)=>{
            commit('set',blogs)
            return
        })
    },
    create({commit,rootState},blog){
        return create.bind(this)(blog,rootState.user.token)
        .then((blog)=>{
            commit("add",blog)
        })
    },
    update({commit,rootState},blog){
        return update.bind(this)(blog,rootState.user.token)
        .then((blog)=>{
            commit("update",blog)
        })
    },
    delete({commit,rootState},blog){
        return remove.bind(this)(blog,rootState.user.token)
        .then((blog)=>{
            commit("remove",blog)
        })
    }
}

