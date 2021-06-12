<template>
  <v-dialog v-model="value"       
      width="500"
      persistent
      min-width="350">
      <v-card>
          <v-card-title>Cambiar contraseña</v-card-title>
          <v-card-text>
            <v-form ref="form">
                <v-text-field  
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                :type="show ? 'text' : 'password'" 
                @click:append="show = !show" 
                v-model="password"
                :rules="[(v)=>!!v || '*Campo obligatorio']" 
                label="Nueva contraseña"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="close" text >Cerrar</v-btn>
              <v-btn @click="submit" text>Cambiar</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import changePass from "@/networking/users/change.password"
import updatePass from "@/networking/users/update.password"

export default {
    props:{
        value:{
            type:Boolean,
            default:false
        },
        onlyAdmin:{
            type:Boolean,
            default:false
        },
        userId:{
            type:String,
            default:""
        }

    },
    data:()=>({
        password:"",
        show:false,
    }),
    methods:{
        close(){
            this.$refs.form.reset()
            this.$emit('input',false)
        },
        async submit(){
            if(!this.$refs.form.validate()) return
            if(this.onlyAdmin){
                await this.changePassword()
            }else{
                await this.updatePassword()
            }
            this.close()            
        },
        async updatePassword(){
            try {
                await updatePass.bind(this)({password:this.password})
                this.$store.commit("user/updatePassword")
                let self = this
                if(["admin","tech"].some(x=>this.$store.state.user.rol === x)){
                    this.$router.push({path:"/admin/requerimientos/"})
                }else{
                    this.$router.push({path:"/requerimientos/"})
                }
            } catch (error) {
                console.log(error)
            }
        },
        async changePassword(){
            try {
                let self = this
                await changePass.bind(this)({user_id:this.userId,password:this.password})
            } catch (error) {
                
            }
        }
    }
}
</script>

<style>

</style>