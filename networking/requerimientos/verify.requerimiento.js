
 export default function (request) {
    return this.$axios.post("/requerimientos/verify",request,{
        headers:{
            Authorization: "Bearer "+this.$store.state.user.token
        }
}).then((response)=>{
            return response.data.data
    })


} 
