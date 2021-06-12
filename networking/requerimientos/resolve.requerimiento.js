
 export default function (request) {
    return this.$axios.post("/requerimientos/resolver",request,{
        headers:{
            Authorization: "Bearer "+this.$store.state.user.token
        }
}).then((response)=>{
            return response.data.data
    }).catch((err)=>{
        console.log(err)
    })


} 
