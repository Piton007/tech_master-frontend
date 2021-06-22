export default function (token) {
    return this.$axios.get("/incidentes/",{
        headers:{
            Authorization: "Bearer "+token
        }
    }).then((response)=>{
            return response.data.data
    }).catch((err)=>{
        console.log(err)
    })
} 

