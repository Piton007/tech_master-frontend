<template>
  <div>
    <v-breadcrumbs
      :items="breadcrumbs"
      class="mb-2"
      divider="<"
    >
        <template v-slot:item="{ item }">
        <v-breadcrumbs-item
            :to="item.href"
            router
            exact
            :disabled="item.disabled"
        >
            {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
    <v-container >
        <v-row>
            <v-col :cols="cols.info" >
                <view-info :ticket="incidente">
                    <resolve v-if="!!incidente.supervisedBy && incidente.status ==='En curso' && incidente.supervisedBy.email === $store.state.user.email "/>
                </view-info>
            </v-col>
            <v-col :cols="cols.logs" >
                <v-card style="height:100%; overflow:hidden" >
                    <v-card-title class="card-title" > Bitácora de incidente </v-card-title>
                    <div class="secondary" style="height:100%;max-height:90vh;overflowY:scroll" >
                    <logs :data="incidente.logs"/>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <add-comment :code="incidente.code"></add-comment>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
import Logs from "@/components/molecules/incidentes/logs"
import ViewInfo from "@/components/molecules/incidentes/view.info"
import AddComment from "@/components/molecules/incidentes/add.comment"
import Resolve from "@/components/molecules/incidentes/resolve.vue"

export default {
    layout:"admin",
    components:{
        Logs,
        ViewInfo,
        AddComment,
        Resolve
    },
    data:()=>({}),
    computed:{
        cols(){
            if(this.$vuetify.breakpoint.smAndDown)
                return {info:12,logs:12}
            return {info:4,logs:8}
        },
        incidente(){
            return this.$store.state.incidentes.list.find(x=>x.code === this.$route.params.id)
        },
        breadcrumbs(){
            return [
                {text:'incidentes',disabled:false,href:"/admin/incidentes"},
                {text:this.incidente.code,disabled:true}
            ]
        }
    }
}
</script>

<style>

</style>