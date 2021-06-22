<template>
    <div>
        <incidentes/>
        <div style="float:right;" class="my-3 mr-2">
            <add-incidente/>
        </div>
    </div>
</template>

<script>
import AddIncidente from "@/components/molecules/incidentes/create"
import Incidentes from "@/components/molecules/incidentes/data.table"

export default {
    layout:"client",
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
        }
    },
    components:{
        Incidentes,
        AddIncidente
    }
}
</script>

<style>

</style>