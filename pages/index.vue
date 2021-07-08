<template>
<div >

  <v-row >
    <v-col cols="12" >
      <v-card style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)" max-width="500" min-width="350" >
        <div >
            <v-img  class="mx-auto" src="/logo_text.png" width="250"></v-img>
        </div>
        <v-card-text >        
            <v-form ref="form">
              <v-text-field
                prepend-icon="mdi-email"
                v-model="email"
                :rules="[v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']"
                label="Email"
              >
              </v-text-field>
                <v-text-field
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                :type="show ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                v-model="password"
                @click:append="show = !show"
                :rules="[v=> !!v || '*Campo obligatorio']"
                label="Password"
              >
              </v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block class="primary-gradient" @click="login"> Ingresar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <change-password v-model="dialog" >
  </change-password>  
</div>
</template>

<script>
import loginUser from "@/networking/users/login.user"
import {saveLocalStorage} from "@/utils/check.token.js"
import ChangePassword from "@/components/change.password"

export default {
  components:{
    ChangePassword
  },
  data:()=>({
    dialog:false,
    email:"",
    password:"",
    show:false,
  }),
  methods:{
    async login(){
        try {
          if (!this.$refs.form.validate())return
          const user  = await loginUser.bind(this)({email:this.email,password:this.password})
          this.$store.commit("user/set",user)
          saveLocalStorage(this.$cookies,user)
          if(!user.confirmed){
            this.dialog = true
            return
          }
          if(["admin","tech","tech_2"].some(x=>user.rol === x)){
              this.$router.push({path:"/admin/requerimientos/"})
          }else{
              this.$router.push({path:"/requerimientos/"})
          }
        } catch (error) {
          
        }  
    }
  }
}
</script>
