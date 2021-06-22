import getAll from "@/networking/incidentes/get.all"
import create from "@/networking/incidentes/create"
import addComment from "@/networking/incidentes/add.comment"
import verify from "@/networking/incidentes/verify"
import assign from "@/networking/incidentes/assign"
import resolve from "@/networking/incidentes/resolve"
import dayjs from "dayjs"
import dayjsUTC from "dayjs/plugin/utc"
dayjs.extend(dayjsUTC)

const STATUS = {
    "pending": "Pendiente",
    "in_process":"En curso",
    "resolved":"Resuelto",
    "rejected":"Rechazado",
    "closed":"Cerrado"
}


export const state = () => ({
    list: []
})

export const getters = {
    getAll: (state) => () =>{
        return state.list
    }
}
export const mutations = {
    set(state,incidentes){
        state.list = incidentes.sort((a,b)=>a.category.prioridad.sla - b.category.prioridad.sla).map(assembleVM)

    },
    add(state,incidente){
        state.list.push(assembleVM(incidente))
    },
    spliceById(state,incidente){
        const index = state.list.findIndex(x=>x.code === incidente.code)
        state.list.splice(index,1,assembleVM(incidente))
    }
    
}

export const actions = {
    fetchAll({commit,rootState}){
        return getAll.bind(this)(rootState.user.token)
        .then((incidentes)=>{
            commit('set',incidentes)
        })    
    },
    create({commit,rootState},incidente){
        return create.bind(this)(incidente,rootState.user.token)
        .then((inc)=>{
            commit("add",inc)
        })
    },
    comment({commit,rootState},incidente){
        return addComment.bind(this)(incidente,rootState.user.token)
        .then((inc)=>{
            commit("spliceById",inc)
        })
    },
    verify({commit,rootState},incidente){
        return verify.bind(this)(incidente,rootState.user.token)
        .then((inc)=>{
            commit("spliceById",inc)
        })
    },
    assign({commit,rootState},incidente){
        return assign.bind(this)(incidente,rootState.user.token)
        .then((inc)=>{
            commit("spliceById",inc)
        })
    },
    resolve({commit,rootState},incidente){
        return resolve.bind(this)(incidente,rootState.user.token)
        .then((inc)=>{
            commit("spliceById",inc)
        })
    }
}

function assembleVM(dto){
    const now = dayjs().utcOffset(-5).format("YYYY/MM/DD HH:mm:ss")
    const end = dayjs(now,"YYYY/MM/DD HH:mm:ss")
    const mins = end.diff(dto.fechaCreacion, 'minutes', true)
    const duration = `${end.diff(dto.fechaCreacion, 'hours')}h ${dayjs().minute(mins).$m}m`
    return {
        ...dto
        ,status:STATUS[dto.status],
        duration,
    
    }
}


