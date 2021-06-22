<template>

    <v-btn
          color="primary"
          dark
          :disabled="disabled"
            @click="assign"
        >
          Asignar
    </v-btn>
</template>

<script>
import UserPicker from "@/components/atoms/user.picker.vue"

export default {
    components:{
        UserPicker
    },
    props:{
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
             try {
                await this.$store.dispatch("incidentes/assign",{
                incidente_code:this.code,
                user_id:this.$store.state.user.id}
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