export default function (store) {
    return this.get("/requerimientos",{
        headers:{
            Authorization: "Bearer "+ store.get('user').token
        }
}).then((response)=>{
            return response.data.data
    })


} 

