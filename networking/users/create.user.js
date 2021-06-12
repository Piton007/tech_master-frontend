
 export default function (user) {
    return this.$axios.post("/users/",user,{
            headers:{
                Authorization: "Bearer "+this.$store.state.user.token
            }
    }).then((response)=>{
            return response.data
    }).catch((err)=>{
        console.log(err)
    })


} 

