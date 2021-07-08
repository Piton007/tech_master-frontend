<template>
<div v-if="!$fetch.pending">

  <v-data-table
    :headers="($store.state.user.rol === 'admin') ? headersAdmin : headers"
    :items="$store.getters['users/getUsers']()"
    :items-per-page="5"
    :search="search"
    :header-props="{
        'sort-by-text':'Filtros'
    }"
    no-data-text="No hay usuarios disponibles"
    class="elevation-1"
    :footer-props="{
        'items-per-page-text':'Usuarios por página'
    }"
  >
      <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Usuarios</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
            ></v-text-field>
        </v-toolbar>
    </template>
    <template v-slot:item.educationalInstitution="{item}">
        <div >{{(!item.educationalInstitution) ? "Ninguno" : item.educationalInstitution}}</div>
    </template>
    <template v-slot:item.reestablecer="{item}">
        <v-btn color="primary" style="font-size:12px" @click="changePassword(item.id)" > Cambiar contraseña </v-btn>
    </template>
  </v-data-table>
  <v-dialog max-width="500" v-model="userDialog" >
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
              <v-col
                  cols="12"
              >
              <v-text-field
                  
                  v-model="cel"
                  :rules="[v=>v=> !!v || '*Campo obligatorio']"
                  label="Teléfono"
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
              <v-row v-if="showInstitution">
              <v-col cols="12">
              
                <v-text-field
                  v-if="tipo === 'teacher' "
                  v-model="institucion"
                  prepend-icon="mdi-school"
                  :rules="[v=> !!v || '*Campo obligatorio']"
                  label="Institución educativa"
                >
                </v-text-field>
                <v-select v-else no-data-text="No existe datos" v-model="institucion"  
                prepend-icon="mdi-school" :items="institutionsVolunteer" :rules="[v=> !!v || '*Campo obligatorio']" label="Institución educativa" ></v-select>

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
              <v-row>
              <v-col cols="12">
                <v-select
                  v-model="requerimientoId"
                  prepend-icon="mdi-clipboard-text"
                  :items="requerimientos"
                  item-text="text"
                  item-value="value"
                  :rules="[v=> !!v || '*Campo obligatorio']"
                  label="Requerimiento"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions >
            <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="userDialog=false"
          >
              Cerrar
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="submit"
          >
              Crear
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
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
    <div>
        <v-btn
            fab
            color="primary"
            dark
            class="my-3 mr-2"
            style="float:right"       
            @click="userDialog=true"
                >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <export-excel   class="my-3 mr-2"
            style="float:right"   />
    </div>
      
       
  <change-password :userId="userId" v-model="changePassDialog" onlyAdmin />
  </div>
</template>

<script>
import submitUser from "@/networking/users/create.user.js"
import getAllRequerimientos from "@/networking/requerimientos/get.all.requerimientos"
import ExportExcel from "@/components/export.users.excel"
import ChangePassword from "@/components/change.password"

export default {
   components:{
     ExportExcel,
     ChangePassword
   },
    async fetch(){
        try {
          const [requerimientos,_] = await Promise.all([
                getAllRequerimientos.bind(this.$axios)(this.$cookies),
                this.$store.dispatch("users/getUsers")
                ])
            this.$store.commit("requerimientos/set",requerimientos)
        } catch (error) {
          
        }
         
      
        
    },
  layout:"admin",
  data:()=>({
    cel:"",
    institutionsVolunteer:[
      {text:"Alianza",value:"Alianza"},
      {text:"Libre",value:"Libre"}
    ],
    search:"",
    userId: "",
    headersAdmin:[
            {
        text:"Id",
        align:" d-none",
        value:"id",
      },
      {
          text:"Nombre",
          align:"start",
          sortable:true,
          value:'fullname'
      },
      {
          text:"Email",
          value:'email',
          sortable:false,
      },
      {
          text:"DNI",
          value:'dni',
          sortable:false,
      },
      {
          text:"Rol",
          value:'rol',
          sortable:false,
      },
      {
          text:"Prioridad",
          value:"priority",
          sortable:false,
      },
      {
          text:"Institución",
          value:"educationalInstitution",
          sortable:true,
      },
      {
          text:"Fecha Creación",
          value:"fechaCreacion",
          sortable:true,
      },
      {
        text:"Acciones",
        align:'center',
        value:"reestablecer"
      }
    ],
    headers:[
      {
        text:"Id",
        align:" d-none",
        value:"id",
      },
      {
          text:"Nombre",
          align:"start",
          sortable:true,
          value:'fullname'
      },
      {
          text:"Email",
          value:'email',
          sortable:false,
      },
      {
          text:"DNI",
          value:'dni',
          sortable:false,
      },
      {
          text:"Rol",
          value:'rol',
          sortable:false,
      },
      {
          text:"Prioridad",
          value:"priority",
          sortable:false,
      },
      {
          text:"Institución",
          value:"educationalInstitution",
          sortable:true,
      },
      {
          text:"Fecha Creación",
          value:"fechaCreacion",
          sortable:true,
      }
    ],
    userDialog:false,
    changePassDialog:false,
    valid:true,
    dni:"",
    lastname:"",
    newPassword:"",
    name:"",
    rol:"",
    email:"",
    dialog:false,
    requerimientoId:"",
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
      {text:"Administrador",value:"admin"},
      {text:"Técnico II",value:"tech_2"}
      ]
      return
    }
    this.tipoOptions = [
      {text:"Maestro",value:"teacher"},
      {text:"Voluntario",value:"volunteer"}    
      ]
  },
  computed:{

     requerimientos(){
       return this.$store.getters["requerimientos/getRequerimientos"]().filter(x=>x.status !== "Cerrado").map(x=>({text:x.code,value:x.id}))
     },
     showInstitution(){
       return (this.tipo === 'teacher' || this.tipo === 'volunteer') 
     }
  },
  methods:{
    changePassword(userId){
      this.userId = userId.toString()
      this.changePassDialog = true
    },
    reset(){
        this.$refs.form.reset()
        this.institucion = ""
    },
    async submit(){
      if (!this.$refs.form.validate()) return;
      try {
              if (this.$refs.form.validate()){
            const user = await submitUser.bind(this)({
            first_name:this.name,
            last_name:this.lastname,
            dni:this.dni,
            cel:this.cel,
            rol:this.tipo,
            requerimiento_id:this.requerimientoId,
            email:this.email,educational_institution:this.institucion,priority:this.priority})
            this.newPassword = user.password
            this.$store.commit("users/add",user)
            this.dialog = true          
      } 
      } catch (error) {
        
      }finally {
          this.reset()
          this.userDialog = false

      }

    }
  }

}
</script>

<style>

</style>