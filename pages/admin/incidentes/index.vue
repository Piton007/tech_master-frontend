<template>
  <div v-if="!$fetch.pending">
      <incidentes :admin="$store.state.user.rol === 'admin'"/>
      <div style="float:right;" class="my-3 mr-2" v-if="$store.state.user.rol === 'teacher' || $store.state.user.rol=== 'volunteer'">
        <add-incidente />
      </div>
        <div v-if="$store.state.user.rol === 'admin'">
            <export   class="my-3 mr-2"
            style="float:right"   />
        </div>
  </div>
</template>

<script>
import AddIncidente from "@/components/molecules/incidentes/create"
import Incidentes from "@/components/molecules/incidentes/data.table"
import Export from "@/components/export.incidente.excel"

export default {
    layout:"admin",
    async fetch(){
try {
        await Promise.all(
            [
                this.$store.dispatch("priorities/fetchAll"),
                this.$store.dispatch("categories/fetchAll"),
                this.$store.dispatch("users/getUsers"),
                this.$store.dispatch("incidentes/fetchAll"),

            ]
        )
        } catch (error) {
            console.log(error)
        }
    },
    components:{
        AddIncidente,
        Incidentes,
        Export
    }
}
</script>

<style>

</style>