export default function (blog,token) {
    return this.$axios.put("/blogs/",blog,{
        headers:{
            Authorization: "Bearer "+token
        }
    }).then((response)=>{
            return response.data
    }).catch((err)=>{
        console.log(err)
    })
} 
