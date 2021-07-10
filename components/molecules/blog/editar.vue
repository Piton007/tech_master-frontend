<template>
    <editor ref="editor" :title="blog.title" :data="blog.content">
        <v-btn color="primary" @click="edit" block > Actualizar </v-btn>
    </editor>    
</template>

<script>
import Editor from "@/components/atoms/rich.text.editor"

export default {
    props:{
        id:{
            type:Number,
            default:-1
        },
    },    
    components:{
        Editor
    }, 
    computed:{
        blog(){
            return this.$store.getters["blogs/findById"](this.id)
        }
    },
    methods:{
        async edit(){
            const {valid,title,content} = this.$refs.editor.getContent()
            if (!valid) return
            try {
                await this.$store.dispatch("blogs/update",{
                    id:this.id,
                    title:title,
                    content:content
                })
                 this.$swal({
                    icon:"success",
                    title:"Actualización de blog",
                    text:"Se ha actualizado un blog"

                })
                this.$emit("update")
            } catch (error) {
                
            }finally {
                this.$refs.editor.reset()
            }
        }
    }
}
</script>

<style>

</style>