<template>
  <v-dialog v-model="dialog"       
      width="500"
      min-width="350"> 
    <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          :disabled="disabled"
          v-bind="attrs"
          v-on="on"
        >
          Asignar
        </v-btn>
    </template>
    <v-card>
        <v-card-title>Asignar</v-card-title>
        <v-card-text>
            <v-form ref="form">
                <user-picker :assign="['técnico II']" v-model="user"></user-picker>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            color="primary"
            text
            @click="dialog=false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="assign"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
        
    </v-card>
  </v-dialog>
</template>

<script>
import UserPicker from "@/components/atoms/user.picker.vue"

export default {
    components:{
        UserPicker
    },
    props:{
        disabled:Boolean,
        code:{
            type:String,
            default:""
        }
    },
    data:()=>({
        dialog:false,
        disabled:false,
        user:""
    }),
    methods:{
        async assign(){
            if(!this.$refs.form.validate()) return
            try {
                await this.$store.dispatch("incidentes/assign",{
                incidente_code:this.code,
                user_id:this.user}
                )
            } catch (error) {
                
            }finally{
                this.dialog=false

            }
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