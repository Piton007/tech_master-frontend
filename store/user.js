


export const state = () => ({
    rol:"",
    token:"",
    email:"",
    firstname: "",
    lastname:"",
    id:"",
    confirmed:false
})

export const getters = {
    getRol: (state) => () =>{
        return state.rol
    },
    getName: (state)=> () =>{
        return `${state.firstname} ${state.lastname}`
    }
}

export const mutations = {
    set(state,user){
        state.rol  = user.rol
        state.token = user.token
        state.email = user.email
        state.firstname = user.firstname
        state.lastname = user.lastname
        state.id = user.id
        state.confirmed = user.confirmed
    },
    updatePassword(state){
        state.confirmed = true
    }
    
}
