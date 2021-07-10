<template>
  <div>
        <div class="container" v-if="display">
            <div  class="text-h3 my-5 text-center">{{blog.title}}</div>
            <div v-html="blog.content" style="border:2px solid black">
                
            </div>
            <div class="mt-5" style="display:flex; justify-content:center " v-if="$store.state.user.rol === 'admin'">
                <v-btn color="info" @click="edit" class="mx-5"> 
                    <v-icon dark>
                        mdi-pencil
                    </v-icon> 
                </v-btn>
                <v-btn color="error" class="mx-5">
                    <v-icon dark @click="remove">
                        mdi-close-box
                    </v-icon>
                </v-btn>
            </div>
        </div>
        <div v-else>
            <edit-blog :id="id"   @update="()=>display=true"/>
        </div>
    </div>
</template>

<script>
import EditBlog from "@/components/molecules/blog/editar"


export default {
    components:{
        EditBlog
    },
    props:{
        id:{
            type:Number,
            default:-1
        },
        
    },
    
    computed:{
        blog(){
            this.display
            const blog = this.$store.getters["blogs/findById"](this.id)
            return blog
        }
    },
    data:()=>({
        display:true,

    }),
    methods:{
        edit(){
            this.display = false
        },
        async remove(){
            try {
                await this.$store.dispatch("blogs/delete",{
                    id:this.id
                })
                 this.$swal({
                    icon:"success",
                    title:"Eliminar blog",
                    text:"Se ha eliminado un blog"

                })
                this.router.push({path:"/ayuda/"})
            } catch (error) {
                
            }finally {
                this.$router.push({path:"/ayuda/"})
            }
        }
    }
}
</script>

<style>

</style>