<template>
<div>
  <v-card>
      <v-card-title>Crear usuario</v-card-title>
      <v-divider></v-divider>
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-account"
                v-model="name"
                :rules="[v=> !!v || '*Campo obligatorio']"
                label="Nombre"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="lastname"
                prepend-icon="mdi-account-multiple"
                :rules="[v=> !!v || '*Campo obligatorio']"
                label="Apellidos"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-account-box-outline"
                v-model="dni"
                :rules="[v=> /^[0-9]{8}$/.test(v) || 'Ingresa un dni válido', v=> !!v || '*Campo obligatorio']"
                label="DNI"
              >
              </v-text-field>
            </v-col>
          </v-row>
            <v-row>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-email"
                v-model="email"
                :rules="[v => !!v || '*Campo obligatorio', v=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Ingresa un e-mail válido']"
                label="Email"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="tipo"
                :items="tipoOptions"
                prepend-icon="mdi-account-settings"
                :rules="[v=> !!v || '*Campo obligatorio']"
                label="Tipo de usuario"
              >
              </v-select>

            </v-col>
          </v-row>
            <v-row v-if="tipo !== 'tech' && tipo !== '' ">
            <v-col cols="12">
              <v-text-field
                v-model="institucion"
                prepend-icon="mdi-school"
                :rules="[v=> !!v || '*Campo obligatorio']"
                label="Institución educativa"
              >
              </v-text-field>
            </v-col>
          </v-row>
            <v-row>
            <v-col cols="12">
              <v-select
                v-model="priority"
                prepend-icon="mdi-alarm"
                :items="priorityOptions"
                item-text="text"
                item-value="value"
                :rules="[v=> !!v || '*Campo obligatorio']"
                label="Prioridad"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions style="text-align: center">
        <v-row>
          <v-col md="4" sm="12" offset-md="4">
            <v-btn block color="primary" @click="submit" > Crear</v-btn>
          </v-col>
        </v-row>
       
      </v-card-actions>
  </v-card>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Nueva Contraseña</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-4">
        <v-text-field outlined filled readonly :value="newPassword"> 

        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="dialog=false" block> Cerrar</v-btn>
      </v-card-actions>
    </v-card>


  </v-dialog>
  </div>
</template>

<script>
import submitUser from "@/networking/users/create.user.js"


export default {

  layout:"admin",
  data:()=>({
    dialog:false,
    valid:true,
    dni:"",
    lastname:"",
    newPassword:"",
    name:"",
    rol:"",
    email:"",
    institucion:"",
    tipo:"",
    priority :"",
    tipoOptions:[
    
    
    ],
    priorityOptions:[
      {text:"Alta",value:"high"},
      {text:"Media",value:"medium"},
      {text:"Baja",value:"low"}
    ]
  }),
  beforeMount(){
    if(this.$store.getters["user/getRol"]() === "admin"){
      this.tipoOptions = [
      {text:"Maestro",value:"teacher"},
      {text:"Voluntario",value:"volunteer"},
      {text:"Técnico",value:"tech"},
      {text:"Administrador",value:"admin"}
      ]
      return
    }
    this.tipoOptions = [
      {text:"Maestro",value:"teacher"},
      {text:"Voluntario",value:"volunteer"}    
      ]
  },
  methods:{
    reset(){
        this.$refs.form.reset()
        this.institucion = ""
    },
    async submit(){
      if (this.$refs.form.validate()){
          try {
            const {token,password} = await submitUser.bind(this)({
            first_name:this.name,
            last_name:this.lastname,
            dni:this.dni,
            rol:this.tipo,
            email:this.email,educational_institution:this.institucion,priority:this.priority})
            this.newPassword = password
            this.dialog = true
          } catch (error) {
            const {response:{data}} = error
            const errors = Object.entries(data.errors).map(([key,value])=>`${key}: ${value}`)
            this.$swal({
              icon:"error",
              titleText: data.msg,
              text:  errors.join("\n")
            })
          }finally {
            this.reset()
          }
      } 
    }
  }

}
</script>

<style>

</style>