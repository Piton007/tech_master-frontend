export default function (token) {
    return this.$axios.get("/categorias/",{
        headers:{
            Authorization: "Bearer "+token
        }
    }).then((response)=>{
            return response.data
    }).catch((err)=>{
        console.log(err)
    })
} 

