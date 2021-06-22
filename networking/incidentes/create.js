export default function (incidente,token) {
    return this.$axios.post("/incidentes/",incidente,{
        headers:{
            Authorization: "Bearer "+token
        }
    }).then((response)=>{
            return response.data
    }).catch((err)=>{
        console.log(err)
    })
} 

