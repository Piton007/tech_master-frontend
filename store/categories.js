import getAll from "@/networking/categories/get.all"
import create from "@/networking/categories/create"
import update from "@/networking/categories/update"



export const state = () => ({
    list: []
})

export const getters = {
    getAll: (state) => () =>{
        return state.list
    },
    findById:(state)=>(id)=>{
        return state.list.find(x=>x.id === id)
    },
    findByOne:(state) => ({service,category,subcategory})=>{
        return state.list.find(x =>
            service === x.service &&
            category === x.category &&
            subcategory === x.subCategory
            )
    },
    getServices:(state) => () => {
        return state.list.reduce((acc,v)=>{
            if (!acc.find(x=> x === v.service))
                acc.push(v.service)
            return acc
        },[]).map(addItem)
    },
    getCategories:(state)=>(service)=>{
        return state.list.filter(x=>x.service === service)
            .reduce((acc,v)=>{
                if (!acc.find(x=> x === v.category))
                    acc.push(v.category)
                return acc
            },[]).map(addItem)
    },
    getSubcategories:(state,{service,category})=>()=>{
        return state.list
        .filter(x=>x.service === service && x.category === category)
        .reduce((acc,v)=>{
            if (!acc.find(x=> x === v.subCategory))
                acc.push(v.subCategory)
            return acc
        },[]).map(addItem)  
    }
}

export const mutations = {
    set(state,categories){
       state.list = categories.map(assembleVM).sort((a,b)=> a.priority.sla - b.priority.sla)
    },
    update(state,category){
        const index = state.list.findIndex(x=>x.id === category.id)
        state.list[index] = assembleVM(category)
    },
    remove(state,index){
        state.list.splice(index,1)
    },
    add(state,category){
        state.list.push(assembleVM(category))
    }
}

export const actions = {
    fetchAll({commit,rootState}){
        return getAll.bind(this)(rootState.user.token)
        .then((categories)=>{
            commit('set',categories)
            return
        })
    },
    create({commit,rootState},category){
        return create.bind(this)(category,rootState.user.token)
        .then((c)=>{
            commit("add",c)
        })
    },
    update({commit,rootState},category){
        return update.bind(this)(category,rootState.user.token)
        .then((c)=>{
            commit("update",c)
        })
    }
}

function assembleVM(category){
    return {
        id:category.id,
        service:category.servicio,
        category: category.categoria,
        subCategory:category.subcategoria || "",
        priority:category.prioridad,
        sla: category.sla,
        fechaCreacion:category.fechaCreacion
    }
}
function addItem(value) {
    return {
        text:value,
        value
    }

}