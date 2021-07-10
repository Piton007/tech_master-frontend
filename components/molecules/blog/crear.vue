<template>
    <editor ref="editor">
        <v-btn color="primary" @click="crear" block > Crear </v-btn>
    </editor>    
</template>

<script>
import Editor from "@/components/atoms/rich.text.editor"

export default {    
    components:{
        Editor
    },
    methods:{
        async crear(){
            const {valid,title,content} = this.$refs.editor.getContent()
            if (!valid) return
            try {
                await this.$store.dispatch("blogs/create",{
                    title:title,
                    content:content
                })
                 this.$swal({
                    icon:"success",
                    title:"Nuevo blog",
                    text:"Se ha publicado un blog"

                })
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