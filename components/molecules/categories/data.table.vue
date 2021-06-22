<template>
  <v-data-table
    :headers="headers"
    :items="$store.getters['categories/getAll']()"
    :items-per-page="5"
    :search="search"
    :customFilter="customFilter"
    :header-props="{
        'sort-by-text':'Filtros'
    }"
    no-data-text="No hay categorías disponibles"
    :footer-props="{
        'items-per-page-text':'Categorías por página'
    }"
    class="elevation-1"
  
  >
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>
                Categorías
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details>
            </v-text-field>
        </v-toolbar>
    </template>
    <template v-slot:item.ver="{item}">
        <v-icon @click.stop="clickRow(item)" color="info"> mdi-eye</v-icon>    
    </template>
    <template v-slot:item.priority="{item}">
        {{item.priority.label}}
    </template>
    <template v-slot:item.estimated="{item}">
        {{item.priority.sla}} h
    </template>

  </v-data-table>
</template>

<script>

export default {
    data:()=>({
        search:"",
        categoryDialog:false,
        headers:[
            {
                text:'Servicio',
                align:'start',
                sortable:true,
                value:'service'
            },
            {
                text:'Categoría',
                align:'start',
                sortable:true,
                value:'category'
            },

            {
                text:'Prioridad',
                align:'center',
                sortable:true,
                value:'priority',
                sort: (a,b) => b.sla - a.sla
            },
            {
                text:'Tiempo de atención',
                align:'center',
                sortable:false,
                value:'estimated',
            },
            {
                text:'Ver más',
                value:"ver",
                align:"center",
                sortable:false
            }   
        ]
    }),
    methods:{
        customFilter(value, search, item) {
            if (typeof value === 'object')
                return value.label.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1  || value.sla.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1      
            return value != null &&
            search != null &&
            typeof value !== 'boolean' &&
            value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
           
        },
        clickRow(e){
            this.dialog = true
        }
    }
    
}
</script>

<style>

</style>