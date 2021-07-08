<template>
  <v-data-table
    :headers="headers"
    :items-per-page="5"
    :search="search"
    :items="$store.getters['incidentes/getAll']()"
    :item-class="overdue"
    :header-props="{
        'sort-by-text':'Filtros'
    }"
    no-data-text="No hay incidentes disponibles"
    :footer-props="{
        'items-per-page-text':'Incidentes por página'
    }"
    class="elevation-1"
  >
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Incidentes</v-toolbar-title>
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
    <template v-slot:item.supervisedBy="{item}">
      <div>
        <div v-if="!item.supervisedBy && !$store.state.user.rol.includes('tech')">
          Nadie
        </div>    
        <div v-if="!!item.supervisedBy">{{item.supervisedBy.firstName}} {{item.supervisedBy.lastName}}</div>
        <div>
          <assign-tech v-if="!item.supervisedBy && $store.state.user.rol.includes('tech')" :code="item.code"/>
        </div>
      </div>

    </template>
      <template v-slot:item.ver="{item}">
            <v-icon @click.stop="clickRow(item)" color="info"> mdi-eye</v-icon>    
      </template>
      <template v-slot:item.affected.priority="{item}">
        {{(item.affected.priority == 'high') ? 'Alta' : (item.affected.priority == 'medium') ? 'Media' : 'Baja'}}    
      </template>
      <template v-slot:item.asignar="{item}">
        <assign-admin :code="item.code" :disabled="item.status === 'Cerrado'"></assign-admin>
      </template>
      <template v-slot:item.elevar="{item}">
        <div  v-if="!!item.supervisedBy" >
          <prioritize v-if="item.supervisedBy.rol === 'tech'" :code="item.code" :disabled="item.status === 'Cerrado'"></prioritize>
        </div>
      </template>
  </v-data-table>
</template>

<script>
import dayjs from "dayjs"
import dayjsUTC from "dayjs/plugin/utc"
import AssignTech from "@/components/molecules/incidentes/assign.tech"
import AssignAdmin from "@/components/molecules/incidentes/assign.admin"
import Prioritize from "@/components/molecules/incidentes/prioritize"

dayjs.extend(dayjsUTC)

export default {
  components:{
    AssignTech,
    AssignAdmin,
    Prioritize
  },
  data:()=>({
    clientHeaders:[
      {
        text:"Código",
        align:"start",
        sortable:true,
        value:"code"
      },
      {
        text:"Fecha de registro",
        align:"start",
        sortable:true,
        value:'fechaCreacion'
      },
      {
        align:"start",
        sortable:true,
        text:"Servicio",
        value:"category.servicio"
      },
      {
        text:"Categoría",
        align:"start",
        sortable:true,
        value:"category.categoria"
      },
      {
        text:"Estado",
        align:"start",
        value:"status"
      },
      {
        text:"Impacto",
        align:"start",
        value:"category.prioridad.label"
      },
      {
        text:"Prioridad",
        align:"start",
        value:"affected.priority"
      },
      {
        text:"Responsable",
        align:"start",
        value:"supervisedBy"
      },
      {
        text:"Ver más",
        align:"start",
        value:"ver"
      }
    ],
    techHeaders:[
      {
        text:"Código",
        align:"start",
        sortable:true,
        value:"code"
      },
      {
        text:"Fecha de registro",
        align:"start",
        sortable:true,
        value:'fechaCreacion'
      },
      {
        align:"start",
        sortable:true,
        text:"Servicio",
        value:"category.servicio"
      },
      {
        text:"Categoría",
        align:"start",
        sortable:true,
        value:"category.categoria"
      },
      {
        text:"Estado",
        align:"start",
        value:"status"
      },
      {
        text:"Impacto",
        align:"start",
        value:"category.prioridad.label"
      },
      {
        text:"Prioridad",
        align:"start",
        value:"affected.priority"
      },
      {
        text:"Responsable",
        align:"start",
        value:"supervisedBy"
      },
      {
        text:"Elevar",
        align:"center",
        value:"elevar",
        sortable:false,
      },
      {
        text:"Ver más",
        align:"start",
        value:"ver"
      }
    ],
    tech2Headers:[
      {
        text:"Código",
        align:"start",
        sortable:true,
        value:"code"
      },
      {
        text:"Fecha de registro",
        align:"start",
        sortable:true,
        value:'fechaCreacion'
      },
      {
        align:"start",
        sortable:true,
        text:"Servicio",
        value:"category.servicio"
      },
      {
        text:"Categoría",
        align:"start",
        sortable:true,
        value:"category.categoria"
      },
      {
        text:"Estado",
        align:"start",
        value:"status"
      },
      {
        text:"Impacto",
        align:"start",
        value:"category.prioridad.label"
      },
      {
        text:"Prioridad",
        align:"start",
        value:"affected.priority"
      },
      {
        text:"Responsable",
        align:"start",
        value:"supervisedBy"
      },
      {
        text:"Ver más",
        align:"start",
        value:"ver"
      }
    ],
    adminHeaders:[
      {
        text:"Código",
        align:"start",
        sortable:true,
        value:"code"
      },
      {
        text:"Fecha de registro",
        align:"start",
        sortable:true,
        value:'fechaCreacion'
      },
      {
        align:"start",
        sortable:true,
        text:"Servicio",
        value:"category.servicio"
      },
      {
        text:"Categoría",
        align:"start",
        sortable:true,
        value:"category.categoria"
      },
      {
        text:"Estado",
        align:"start",
        value:"status"
      },
      {
        text:"Impacto",
        align:"start",
        value:"category.prioridad.label"
      },
      {
        text:"Prioridad",
        align:"start",
        value:"affected.priority"
      },
      {
        text:"Responsable",
        align:"start",
        value:"supervisedBy"
      },
      {
        text:"Asignar",
        align:"center",
        value:"asignar",
        sortable:false,
      },
      {
        text:"Ver más",
        align:"start",
        value:"ver"
      }
    ],
    search:""
  }),

  computed:{
    headers(){
      if(this.$store.state.user.rol === 'admin')
        return this.adminHeaders
      if(this.$store.state.user.rol === 'tech')
        return this.techHeaders
      if(this.$store.state.user.rol === 'tech_2')
        return this.tech2Headers
      if(this.$store.state.user.rol === 'teacher' || this.$store.state.rol === 'volunteer')
        return this.clientHeaders
    }
      
  },
  methods:{
    clickRow(item,data){
      if(!this.admin)
        this.$router.push({path:"/incidentes/"+item.code})
      else
        this.$router.push({path:"/admin/incidentes/"+item.code})
    },
    overdue(item){
        
        const now = dayjs().utcOffset(-5).format("YYYY/MM/DD HH:mm:ss")
        const end = dayjs(now,"YYYY/MM/DD HH:mm:ss")
        if (end.diff(item.fechaCreacion) < 0 && item.estado !== "Cerrado")
          return "red"
    }
  }


}
</script>

<style>

</style>