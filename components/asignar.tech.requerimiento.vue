<template>
    <v-btn
          color="primary"
          dark
          @click="assign"
        >
          Asignar
        </v-btn>
</template>

<script>
import assignRequerimiento from "@/networking/requerimientos/assign.requerimiento"

export default {
    props:{
        requerimientoCode:String 
    },
    methods:{
        async assign(){
                const requerimiento = await assignRequerimiento.bind(this)({requerimiento_code:this.requerimientoCode,user_id:this.$store.state.user.id})
                this.$store.commit("requerimientos/spliceById",requerimiento)
           
        }
    }
}
</script>

<style>

</style>