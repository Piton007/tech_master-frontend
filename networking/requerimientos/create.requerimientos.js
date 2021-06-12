
 export default function (requerimiento) {
    return this.$axios.post("/requerimientos",requerimiento,{
        headers:{
            Authorization: "Bearer "+this.$store.state.user.token
        }
}).then((response)=>{
            return response.data.data
    }).catch((err)=>{
        console.log(err)
    })


} 

