export default function (blog,token) {
    return this.$axios.delete("/blogs/"+blog.id,{
        headers:{
            Authorization: "Bearer "+token
        }
    }).then((response)=>{
            return response.data
    }).catch((err)=>{
        console.log(err)
    })
} 
