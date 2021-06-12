<template>
   <v-dialog
      v-model="dialog"
      width="500"
      min-width="350"
    >
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
        <v-card-title >
          Asignar a usuarios
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
            <v-form ref="form">
            <v-select :items="userOptions" :rules="[v=> !!v || '*Campo obligatorio']" v-model="user" label="Equipo" ></v-select>
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
import assignRequerimiento from "@/networking/requerimientos/assign.requerimiento"

export default {

    props:{
        requerimientoCode:String,
        assigned:{
            type:Object,
            default: function(){
                return {
                    id:""
                }
            }
        },
        disabled:Boolean 
    },
    beforeMount(){
        if(!this.assigned) return 
        this.user = this.assigned.id
    },
    watch:{
        assigned(){
            if(!this.assigned) return 
            this.user = this.assigned.id
        }
    },
    data:()=>({
        dialog:false,
        user:"",
    }),
    methods:{
      
        async assign(){
                if(!this.$refs.form.validate()) return 
                const requerimiento = await assignRequerimiento.bind(this)({
                requerimiento_code:this.requerimientoCode,
                user_id:this.user})
                this.$store.commit("requerimientos/spliceById",requerimiento)

                this.dialog=false
            
        },

        
    },
    computed:{
        userOptions(){
            const users = [...this.$store.state.users.list]            
            return users.filter(x=>x.rol === 'Admin' || x.rol === "Técnico").map((x)=>{
               if(x.email === this.$store.state.user.email)
                    return {
                        text: "Yo",
                        value: x.id
                    }               
               return { text:`${x.firstName} ${x.lastName}`,
                value: x.id}
            })
        }
    }

}
</script>

<style>

</style>