<template>
  <json-excel :fields="jsonFields" worksheet="Reporte de incidentes" name="Reporte_Incidentes.xls" :data="$store.getters['incidentes/getAll']()" > 
    
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
            "Código":"code",
            "Fecha de registro":"fechaCreacion",
             "Fecha de resuelto":{
                field:"logs",
                callback: (value)=> {
                    const resolved = value.filter(x=>x.status === "resolved")
                    if (!resolved.length)
                        return ""
                    return resolved[0].fechaCreacion 
                }
            },
            "Fecha de asignacion":"fechaAsignacion",
            "Fecha de cierre":"fechaCierre",
            "Servicio":{
                field: "category",
                callback: (value)=> (!value) ? "--" : value.servicio
            },
            "Categoría":{
                field:"category",
                callback: (value)=> (!value) ? "--" : value.categoria
            },
            "Subcategoría":{
                field:"category",
                callback: (value)=> (!value) ? "--" : value.subcategoria
            },
            "Afectado":"affected.dni",
            "Nombre de afectado":{
                field:"affected",
                callback: (value)=> (!value) ? "--" : value.firstName + " " + value.lastName
            },
            "Reportador Por":"creator.dni",
            "Estado":"status",
            "Prioridad": {               
                field:"category",
                callback: (value)=> {
                    return (!value) ? "--" : value.prioridad.label
                }
                },
            "Responsable":{
                field:"supervisedBy",
                callback: (value)=> {
                    return (!value) ? "Nadie" : value.dni
                }
            }

        }
    })

}
</script>

<style>

</style>