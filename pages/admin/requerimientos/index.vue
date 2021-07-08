<template>
<div>


    <v-data-table
    v-if="!$fetch.pending"
    :headers="headers"
    :items="$store.getters['requerimientos/getRequerimientos']()"
    :items-per-page="5"
    :search="search"
    :header-props="{
        'sort-by-text':'Filtros'
    }"
    no-data-text="No hay requerimientos disponibles"
    :footer-props="{
        'items-per-page-text':'Requerimientos por página'
    }"
    class="elevation-1"
  >
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Requerimientos</v-toolbar-title>
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
        <div v-if="!!item.supervisedBy">{{item.supervisedBy.firstName}} {{item.supervisedBy.lastName}}</div>
        <template v-else>
            <div>{{$store.state.user.rol.includes('tech')}}</div>
            <assign-tech v-if="$store.state.user.rol.includes('tech')" :requerimientoCode="item.code" ></assign-tech>
            <div v-else> Nadie</div>
        </template>
    </template>
    <template v-slot:item.asignar="{item}">  
        <assign-admin :requerimientoCode="item.code" :disabled="item.status === 'Cerrado'" :assigned="item.supervisedBy" ></assign-admin>
    </template>
        <template v-slot:item.ver="{item}">
        <v-icon @click.stop="clickRow(item) " color="info"> mdi-eye</v-icon>    

    </template>
  </v-data-table>
    <div v-if="$store.state.user.rol === 'admin'">
       <export-requerimiento    class="my-3 mr-2"
            style="float:right"   />
  </div>
  </div>
</template>

<script>
import getAllRequerimientos from "@/networking/requerimientos/get.all.requerimientos"
import AssignAdmin from "@/components/asignar.admin.requerimiento"
import AssignTech from "@/components/asignar.tech.requerimiento"
import ExportRequerimiento from "@/components/export.requerimiento.excel.vue"


export default {
    components:{
        AssignAdmin,
        AssignTech,
        ExportRequerimiento
    },
    layout:"admin",
    async fetch(){
            try {
                            let requerimientos 
            if (this.$store.getters["user/getRol"]() === "admin"){
                const [req,_] = await Promise.all([
                getAllRequerimientos.bind(this.$axios)(this.$cookies),
                this.$store.dispatch("users/getUsers")
                ])
                requerimientos = req
            }else{
                requerimientos = await  getAllRequerimientos.bind(this.$axios)(this.$cookies)
            }
            
            
            this.$store.commit("requerimientos/set",requerimientos)
            } catch (error) {
                
            }

        
    },
    beforeMount(){
        if(this.$store.state.user.rol.includes('tech')){

            this.headers = [
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
                    sortable:true,
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
            return
            }
        this.headers = [
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
                sortable:true,
            },
            {
                text:"Responsable",
                value:"supervisedBy",
                sortable:true,
            },
            {
                text:"Asignar",
                align:"center",
                value:"asignar",
                sortable:false,
            },
            {
                text:"Ver más",
                value:"ver",
                align:"center",
                sortable:false,
            }
        ]
    },
    data:()=>({
        modo:"tech",
        items:[],
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
                sortable:true,
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
        ],
        
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