


export const state = () => ({
    rol:"",
    token:"",
    email:"",
    id:"",
    confirmed:false
})

export const getters = {
    getRol: (state) => () =>{
        return state.rol
    }
}

export const mutations = {
    set(state,user){
        state.rol  = user.rol
        state.token = user.token
        state.email = user.email
        state.id = user.id
        state.confirmed = user.confirmed
    },
    updatePassword(state){
        state.confirmed = true
    }
    
}
