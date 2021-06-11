<template>
<div>
    <v-data-table
    :headers="headers"
    :items="$store.getters['requerimientos/getRequerimientos']()"
    :items-per-page="5"
    :search="search"
    no-data-text="No hay requerimientos disponibles"
    class="elevation-1"
    :header-props="{
        'sort-by-text':'Filtros'
    }"
    :footer-props="{
        'items-per-page-text':'Requerimientos por página'
    }"
  >
  <data-table-header  sort-by-text="Buscar"></data-table-header>
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Reporte de requerimientos</v-toolbar-title>
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
    <template v-slot:item.categories="{item}">
        <div>Creación de usuario</div>
    </template>
        <template v-slot:item.supervisedBy="{item}">
            <div v-if="!!item.supervisedBy">{{item.supervisedBy.firstName}}</div>
            <div v-else> Nadie </div>
        </template>
    <template v-slot:item.ver="{item}">
        <v-icon @click.stop="clickRow(item)" color="info"> mdi-eye</v-icon>    
    </template>
  </v-data-table>
  <div>
       <export-requerimiento   class="my-3 mr-2"
            style="float:right"   />
  </div>
 
</div>
</template>

<script>
import getAllRequerimientos from "@/networking/requerimientos/get.all.requerimientos"
import ExportRequerimiento from "@/components/export.requerimiento.excel.vue"

export default {
    layout:"admin",
    components:{
       "export-requerimiento":ExportRequerimiento
    },
    async fetch(){
        try {
            const requerimientos = await getAllRequerimientos.bind(this.$axios)(this.$cookies)
            this.$store.commit("requerimientos/set",requerimientos)
        } catch (e) {
            console.log(e)
                            this.$swal({
                icon:"error",
                title: 'Error',
                text: e
                })       
        } 
        
    },
    data:()=>({
        search:"",
        headers:[
                        {
                text:"Código",
                align:"start",
                sortable:true,
                value:'code'
            },
            {
                text:"Fecha de registro",
                align:"start",
                sortable:true,
                value:'fechaCreacion'
            },
            {
                text:"Detalle",
                value:'categories',
                sortable:false,
            },
            {
                text:"Reportador por",
                value:"creator.dni",
                sortable:false,
            },
            {
                text:"Estado",
                value:"status",
                sortable:true,
            },
            {
                text:"Prioridad",
                value:"creator.priority",
                align:"center",
                sortable:true,
            },
            {
                text:"Tiempo",
                value:"duration",
            },
            {
                text:"Responsable",
                value:"supervisedBy",
                sortable:true,
            },
            {
                text:"Ver más",
                value:"ver",
                align:"center",
                sortable:false,
            }
        ]
    }),
    methods:{
        clickRow(item){
            this.$router.push({path:"/admin/requerimientos/"+item.code})
        },
    }
}
</script>

<style>

</style>