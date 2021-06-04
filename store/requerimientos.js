import dayjs from "dayjs"


const STATUS = {
    "pending": "Pendiente",
    "in_process":"En curso",
    "resolved":"Resuelto",
    "rejected":"Rechazado",
    "closed":"Cerrado"
}

const PRIORITY = {
    "high":"Alta",
    "medium":"Media",
    "low":"Baja"
}

export const state = () => ({
    list:[]
})

export const getters = {
    findRequerimientoByCode: (state) => (code) =>{
        return state.list.find(x=>x.code === code)
    },
    getRequerimientos: (state) => () =>{
        return state.list
    }
}

export const mutations = {
    add(state,requerimiento){
        state.list.unshift(assembleVM(requerimiento))
    },
    set(state,requerimientos){
        state.list = requerimientos.sort((a,b)=>{return dayjs(b.fechaCreacion).diff(a.fechaCreacion)}).map(assembleVM)
    },
    spliceById(state,requerimiento){
        const index = state.list.findIndex(x=>x.code === requerimiento.code)
        state.list.splice(index,1,assembleVM(requerimiento))
     
   
    }
}

function assembleVM(dto){
    const now = dayjs().format("YYYY/MM/DD HH:mm:ss")
    const end = dayjs(now,"YYYY/MM/DD HH:mm:ss")
    const mins = end.diff(dto.fechaCreacion, 'minutes', true)
    const duration = `${end.diff(dto.fechaCreacion, 'hours')}h ${dayjs().minute(mins).$m}m`
    return {
        ...dto
        ,status:STATUS[dto.status],
        duration,
        creator:{...dto.creator,priority:PRIORITY[dto.creator.priority]}}
}