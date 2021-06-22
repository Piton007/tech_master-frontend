<template>
  <json-excel :fields="jsonFields" worksheet="Reporte de categorias" name="Reporte_Categoria.xls" :data="$store.getters['categories/getAll']()" > 
    
      <slot>
          <v-btn  fab color="green" dark>
              <v-icon> mdi-file-excel</v-icon>
          </v-btn>
      </slot>
  </json-excel>
</template>

<script>
import JsonExcel from "vue-json-excel";

export default {
    components:{
        JsonExcel
    },

    data:()=>({
        jsonFields:{
            "Servicio":"service",
            "Categoría":"category",
            "Subcategoria":"subCategory",
            "Prioridad":"priority.label",
            "Tiempo estimado":{
                field: "priority.sla",
                callback: (value)=> value + " h"
            },
            "Fecha de creación":"fechaCreacion",
        }
    })

}
</script>

<style>

</style>