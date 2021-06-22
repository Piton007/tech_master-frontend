<template>
    <v-card>
        <v-card-title>
            Agregar Comentario
        </v-card-title>
        <v-card-text>
        <v-form ref="form">
            <v-textarea outlined :rules="[(v=>!!v || '*Campo obligatorio')]" label="Descripción" placeholder="Añadir un nuevo comentario..." v-model="newComment">

            </v-textarea>
            </v-form>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit" text :disabled="loading"> Añadir</v-btn>
        </v-card-actions>
    </v-card-text>
    </v-card>
</template>

<script>
export default {
    props:{
        code:{
            type:String,
            default:""
        }
    },
    data:()=>({
        newComment:"",
        loading:false
    }),
    methods:{
        submit(){
            if(!this.$refs.form.validate()) return
            try {
                
            
                this.loading = true
                this.$store.dispatch("incidentes/comment",
                    {
                        user_id:this.$store.state.user.id,
                        incidente_code:this.code,
                        comment:this.newComment
                    }
                )
                this.$swal({
                    icon:"success",
                    title:"Nuevo comentario",
                    text:"Se ha agregado un nuevo comentario"

                })
            } catch (error) {
                console.log(error)
            }finally {
            
           
                this.$refs.form.reset()
                this.loading = false
                this.dialog = false
            }
        }
    }
}
</script>

<style>

</style>