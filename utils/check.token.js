export const restoreFromLocalStorage  =(storage) => {
    return storage.get("user")
}

export const saveLocalStorage = (storage,user)=>{
   storage.set('user', JSON.stringify(user),{
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
}

export const remove = (storage)=>{
   storage.removeAll()
 }

export default function(){
    const token = restoreFromLocalStorage()
    
}