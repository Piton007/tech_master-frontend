export default function (incidente,token) {
    return this.$axios.post("/incidentes/comment",incidente,{
        headers:{
            Authorization: "Bearer "+token
        }
    }).then((response)=>{
            return response.data.data
    }).catch((err)=>{
        console.log(err)
    })
} 

