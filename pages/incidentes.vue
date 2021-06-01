<template>
    <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    :search="search"
    @click:row="clickRow"
    no-data-text="No hay incidentes disponibles"
    class="elevation-1"
  >
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Incidentes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-toolbar>
    </template>
    <template v-slot:item.responsable="{item}">
        <div v-if="!!item.responsable">{{item.responsable}}</div>
        <v-btn v-else small> Asignar </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
    data:()=>({
        search:"",
        headers:[
            {
                text:"Fecha de registro",
                align:"start",
                sortable:true,
                value:'fechaCreacion'
            },
            {
                text:"Detalle",
                value:'servicio',
                sortable:false,
            },
            {
                text:"Reportador por",
                value:"dni",
                sortable:false,
            },
            {
                text:"Estado",
                value:"estado",
                sortable:true,
            },
            {
                text:"Responsable",
                value:"responsable",
                sortable:false,
            }
        ],
        items: [
            {
                fechaCreacion:"08-08-2021 15:23:23",
                servicio: "Creación de usuario",
                dni:"75393086",
                estado:"Pendiente"
            },
            {
                fechaCreacion:"08-08-2021 15:23:23",
                servicio: "Creación de usuario",
                dni:"75393086",
                estado:"En curso",
                responsable:"Jose Luis"
            }
        ]
    }),
    methods:{
        clickRow(item,data){
            console.log(item)
            console.log(data)
        }
    }
}
</script>

<style>

</style>