<template>
    <v-dialog
     v-model="dialog"
     width="500"
     min-width="350"
    >
        <template v-slot:activator="{on,attrs}">
            <v-btn color="primary" 
            v-bind="attrs"
            v-on="on"
            block> Resolver</v-btn>
        </template>
        <v-card >
            <v-card-title>
                
                Resolver incidente
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="form">
                    <v-textarea rows="2" v-model="comment" label="Comentario">

                    </v-textarea>
                </v-form>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text  @click="dialog=false"> Close</v-btn>
                <v-btn color="primary" text  @click="resolve"> Enviar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    

</template>

<script>
export default {
    inject:["ticket"],
    data:()=>({
        dialog:false,
        comment:""
    }),
    methods:{
        resolve(){
            if(!this.$refs.form.validate()) return
            try {
                this.$store.dispatch("incidentes/resolve",{
                incidente_code:this.ticket.code,
                comment:this.comment
                })
            } catch (error) {
                
            }finally{
                this.$refs.form.reset()
                this.dialog = false
            }
        }
    }
}
</script>

<style>

</style>