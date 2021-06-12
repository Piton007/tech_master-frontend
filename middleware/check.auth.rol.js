import {getPathRolHome} from "@/utils/rol.js"
import {restoreFromLocalStorage,remove} from "@/utils/check.token"

export default function ({ route, store, redirect, $cookies,from }) {
    
    if(route.name === "index"){
        remove($cookies)
        store.commit("user/set",{rol:"",token:""})
        return
    }

    const user = restoreFromLocalStorage($cookies)
    if (!user){
        return
    }
    if (!user.token){
         return
    }

    store.commit("user/set",user)
    
    const home = getPathRolHome(route.name,user.rol)
    if(!!home)
        redirect(home)
    
    
    
    
    
}
