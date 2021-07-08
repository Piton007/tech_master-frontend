export default function (category,token) {
    return this.$axios.put("/categorias/",category,{
        headers:{
            Authorization: "Bearer "+token
        }
    }).then((response)=>{
            return response.data
    }).catch((err)=>{
        console.log(err)
    })
} 
