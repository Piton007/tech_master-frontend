<template>
  <div> 
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
    <template v-slot:item.priority="{item}">
        {{item.priority.label}}
    </template>
    <template v-slot:item.estimated="{item}">
        {{item.priority.sla}} h
    </template>
    <template v-slot:item.edit="{item}">
            <v-icon @click.stop="clickRow(item)" color="info"> mdi-pencil</v-icon>    
      </template>

  </v-data-table>
    <v-dialog v-model="editDialog"
      persistent      
      width="500"
      min-width="350"
      >
    <v-card>
        <v-card-title>Actualizar categoría</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <category-form ref="form" :categoryId="categoryId"></category-form>
        </v-card-text>
        <v-card-actions >
            <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="editDialog=false"
          >
              Cerrar
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="update"
          >
              Actualizar
          </v-btn>
        </v-card-actions>
    </v-card>

  </v-dialog>
  </div>
</template>

<script>
import CategoryForm from "@/components/molecules/categories/category.picker"

export default {
    components:{
        CategoryForm
    },
    data:()=>({
        categoryId:-1,
        editDialog:false,
        search:"",
        headers:[
            {
                text:"Id",
                align:" d-none",
                sortable:true,
                value:"id"
            },
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
                text:'Impacto',
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
                text:"Editar",
                align:"start",
                value:"edit"
            }
           
        ]
    }),
    methods:{
            async update(){
                if (!this.$refs.form.validate()) return
                try {
                    await this.$store.dispatch("categories/update",
                        {
                            ...this.$refs.form.submit(),
                            category_id:this.categoryId
                        }

                    )
                    this.$swal({
                        icon:"success",
                        title:"Actualización de categoría",
                        text:"Se ha actualizado una categoria"

                    }) 
                } catch (error) {
                    
                }finally{
                    this.editDialog = false
                }
            
        },
        customFilter(value, search, item) {
            if (typeof value === 'object')
                return value.label.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1  || value.sla.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1      
            return value != null &&
            search != null &&
            typeof value !== 'boolean' &&
            value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
           
        },
        clickRow(e){
            this.categoryId = e.id
            this.editDialog = true
            
        }
    },
    
    
}
</script>

<style>

</style>