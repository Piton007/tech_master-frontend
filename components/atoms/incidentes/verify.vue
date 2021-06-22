<template>
  <div>
    <v-dialog v-model="dialog" min-width="350" max-width="500">
        <v-card >
            <v-card-title style="justify-content:space-between" >
                <div :class="(decision === 'accept') ? 'success--text' : 'error--text' ">
                    {{(decision === 'accept') ? 'Aceptar resolución' : 'Rechazar resolución'}}
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="form">
                    <v-textarea rows="2" :rules="[v=> !!v || '*Campo obligatorio']" v-model="comment" label="Comentario">

                </v-textarea>
                </v-form>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text  @click="dialog=false"> Cerrar</v-btn>
                <v-btn color="primary" text  @click="verify"> Enviar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>  
    <v-btn color="success" text @click="showDialog(true)">
                         Aceptar
    </v-btn>
    <v-btn color="error" text @click="showDialog(false)">
                         Rechazar
    </v-btn>
  </div>
</template>

<script>
export default {
    inject:["ticket"],
    data:()=>({
        dialog:false,
        comment:"",
        decision:"accept"
    }),
    methods:{
        async verify(){
            if(!this.$refs.form.validate()) return
            
            try {

                await this.$store.dispatch("incidentes/verify", {
                result:this.decision,
                incidente_code: this.ticket.code,
                comment: this.comment,
            })
            } catch (error) {
                console.log(error)
            }
            this.dialog = false
            
        },
        showDialog(decision){
            this.decision = (decision) ? "accept" : "rejected" 
            this.dialog = true
        }
    },
    watch:{
        dialog(){
            if(!this.$refs.form) return
            this.$refs.form.reset()
        }
    }
}
</script>

<style>

</style>