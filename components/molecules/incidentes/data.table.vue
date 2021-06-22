<template>
  <v-data-table
    :headers="(!admin) ? clientHeaders : adminHeaders"
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
        <div v-if="!item.supervisedBy && $store.state.user.rol !== 'tech'">
          Nadie
        </div>    
        <div v-if="!!item.supervisedBy">{{item.supervisedBy.firstName}} {{item.supervisedBy.lastName}}</div>
        <div>
          <assign-tech v-if="!item.supervisedBy && $store.state.user.rol === 'admin'" :code="item.code"/>
        </div>
      </div>

    </template>
      <template v-slot:item.ver="{item}">
            <v-icon @click.stop="clickRow(item)" color="info"> mdi-eye</v-icon>    
      </template>
      <template v-slot:item.asignar="{item}">
        <assign-admin :code="item.code" :disabled="item.status === 'Cerrado'"></assign-admin>
      </template>
  </v-data-table>
</template>

<script>
import dayjs from "dayjs"
import dayjsUTC from "dayjs/plugin/utc"
import AssignTech from "@/components/molecules/incidentes/assign.tech"
import AssignAdmin from "@/components/molecules/incidentes/assign.admin"


dayjs.extend(dayjsUTC)

export default {
  components:{
    AssignTech,
    AssignAdmin
  },
  props:{
    admin:{
      type:Boolean,
      default:false
    }
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
        text:"Prioridad",
        align:"start",
        value:"category.prioridad.label"
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
        text:"Prioridad",
        align:"start",
        value:"category.prioridad.label"
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
        if (end.diff(item.fechaCreacion) < 1 && item.estado !== "Cerrado")
          return "red"
    }
  }


}
</script>

<style>

</style>