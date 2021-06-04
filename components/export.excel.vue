<template>
  <json-excel :fields="jsonFields" worksheet="Reporte de requerimientos" name="Reporte_Requerimentos.xls" :data="$store.getters['requerimientos/getRequerimientos']()" > 
    
      <slot>
          <v-btn  fab color="green">
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
            "Fecha de cierre":"fechaCierre",
            "Detalle":{
                field: "categories",
                callback: (value)=> value[0]
            },
            "SubDetalle":{
                field:"categories",
                callback: (value)=> (value.length >= 1) ? value[1] : "--"
            },
            "SubDetalle-2":{
                field:"categories",
                callback: (value)=> (value.length >= 2) ? value[2] : "--"
            },
            "SubDetalle-3":{
                field:"categories",
                callback: (value)=> (value.length >= 3) ? value[3] : "--"
            },
            "Reportador Por":"creator.dni",
            "Estado":"status",
            "Prioridad":"creator.priority",
            "Responsable":{
                field:"supervisedBy",
                callback: (value)=> {
                    return (!value) ? "Nadie" : value.firstName
                }
            }

        }
    })

}
</script>

<style>

</style>