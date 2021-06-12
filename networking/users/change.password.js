
 export default function (user) {
    return this.$axios.post("/users/change-password",user,{
            headers:{
                Authorization: "Bearer "+this.$store.state.user.token
            }
    }).then((response)=>{
            return response
    }).catch((err)=>{
        console.log(err)
    })


} 

