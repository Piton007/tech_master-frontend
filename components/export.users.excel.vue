<template>
  <json-excel :fields="jsonFields" worksheet="Reporte de usuarios" name="Reporte_Usuarios.xls" :data="$store.getters['users/getUsers']()" > 
    
      <slot>
          <v-btn  fab color="green">
              <v-icon> mdi-file-excel</v-icon>
          </v-btn>
      </slot>
  </json-excel>
</template>

<script>
import JsonExcel from "vue-json-excel";
import dayjs from "dayjs";

export default {
    components:{
        JsonExcel
    },
    data:()=>({
        jsonFields:{
            "Nombres":"fullname",
            "Email":"email",
            "DNI":"dni",
            "Rol":"rol",
            "Prioridad":"priority",
            "Institución":"educationalInstitution",
            "Usuario solicitante":{
                field:"log",
                callback: (value)=> {
                    if(!value) return ""
                    return value.requerimiento.reportedBy.dni
                }
            },
            "Usuario asignado":{
                field:"log",
                callback: (value)=> {
                    if(!value) return ""
                    if(!value.requerimiento.supervisedBy) return ""
                    return value.requerimiento.supervisedBy.dni
                }
            },
            "Fecha de creación":"fechaCreacion",
            "Fecha de solicitud":{
                field:"log",
                callback: (value)=> {
                    if(!value) return ""
                    return dayjs(value.requerimiento.createdAt).format("YYYY/MM/DD HH:mm:ss")
                }
            }
        }
    })

}
</script>

<style>

</style>