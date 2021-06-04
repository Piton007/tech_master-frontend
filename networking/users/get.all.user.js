 
 export default function (token) {
    return this.$axios.get("/users/",{
            headers:{
                Authorization: "Bearer "+token
            }
    }).then((response)=>{
            return response.data
    })


} 

