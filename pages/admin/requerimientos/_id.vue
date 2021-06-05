<template>
    <div>
    <v-dialog v-model="dialog" min-width="350" max-width="500">
        <v-card >
            <v-card-title style="justify-content:space-between">
                
                    Resolver requerimientos
                
                
                
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-textarea rows="2" v-model="comment" label="Comentario">

                </v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text  @click="dialog=false"> Close</v-btn>
                <v-btn color="primary" text  @click="resolve"> Enviar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
    <v-container>
    <v-row style="flex-wrap: no-wrap" >
        <v-col  md="4" sm="12">
            <v-card>
                <v-card-title>
                    <div>
                        Agente trabajando: {{(!requerimiento.supervisedBy)? "Nadie" : requerimiento.supervisedBy.firstName}}  
                    </div>
                    
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> Código: </span>
                    <span>{{requerimiento.code}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> Usuario: </span>
                    <span>{{requerimiento.creator.firstName}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> DNI: </span>
                    <span>{{requerimiento.creator.dni}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> Estado: </span>
                    <span>{{requerimiento.status}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> Tiempo: </span>
                    <span>{{requerimiento.duration}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold">Fecha de creación: </span>
                    <span>{{requerimiento.fechaCreacion}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold">Fecha de asignación: </span>
                    <span>{{requerimiento.fechaAsignacion || "--:--" }}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold">Fecha de cierre: </span>
                    <span>{{requerimiento.fechaCierre || "--:--"}}</span>
                </p>
                <p class="mb-2 mx-2 font-weight-bold">
                    Descripción: 
                    
                </p>
                <div class="mb-2 mx-2">
                    <div v-for="(line,index) of requerimiento.description.split('\n')"  :key='index'>
                        {{line}}
                    </div>
                </div>


                </v-card-text>
                <v-card-actions v-if="!!requerimiento.supervisedBy" >
                    <v-btn color="primary" @click="dialog=true" v-if="requerimiento.status ==='En curso' && requerimiento.supervisedBy.email === $store.state.user.email " block> Resolver</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col md="8" v-if="$vuetify.breakpoint.mdAndUp" >
            <v-card style="height:100%; overflow:hidden" >
                <v-card-title > Bitácora de Requerimientos </v-card-title>
                <div class="secondary" style="height:100%;max-height:90vh;overflowY:scroll" >
                    <v-timeline dense align-top style="height:100%">
                        <v-timeline-item v-for="(log,index) in logs" :key="index" color="warning" class="mb-4 pr-6" >                            
                        <v-card
                            color="info"
                            dark
                            max-width="300"
                        >
                            <v-card-title class="text-h6">
                             {{log.event}}
                            </v-card-title>
                            <v-card-text  class="accent pt-2">
                            {{log.comment}}
                             <div class="text-caption font-weight-bold mt-2">
                                {{log.fechaCreacion}}
                            </div>
                            </v-card-text>

                        </v-card>
                        </v-timeline-item>
                </v-timeline>
                </div>
            </v-card>


        </v-col>
    </v-row>
    <v-row v-if="$vuetify.breakpoint.smAndDown">
        <v-col cols="12" >
                        <v-card style="height:100%; overflow:hidden" >
                <v-card-title > Bitácora de Requerimientos </v-card-title>
                <div class="secondary" style="height:100%;max-height:90vh;overflowY:scroll" >
                    <v-timeline dense align-top style="height:100%">
                        <v-timeline-item v-for="(log,index) in logs" :key="index" color="warning" class="mb-4 pr-6" >                            
                        <v-card
                            color="primary"
                            dark
                            max-width="300"
                        >
                            <v-card-title class="text-h6">
                             {{log.event}}
                            </v-card-title>
                            <v-card-text  class="accent pt-2">
                            {{log.comment}}
                            </v-card-text>
                        </v-card>
                        </v-timeline-item>
                </v-timeline>
                </div>
            </v-card>


        </v-col>
    </v-row>
    
    </v-container>

    </div>


</template>

<script>
import resolveRequerimiento from "@/networking/requerimientos/resolve.requerimiento"

export default {
    layout:"admin",

    data:()=>({
       dialog:false,
       comment:""
    }),
    computed:{
        requerimiento(){
            return this.$store.state.requerimientos.list.find(x=>x.code === this.$route.params.id)
        },
        logs(){
            const _requerimiento = this.$store.state.requerimientos.list.find(x=>x.code === this.$route.params.id)
            const clone = [..._requerimiento.logs ]
            clone.sort((a,b)=>this.$dayjs(b.fechaCreacion).diff(a.fechaCreacion))
            return clone
    },
        breadcrumbs(){
            
            return [
                {text:'requerimientos',disabled:false,href:"/admin/requerimientos"},
                {text:this.requerimiento.code,disabled:true}
            ]
        }
    },
    methods:{
        reset(){
            this.comment = ""
        },
        closeDialog(){
            this.reset()
            this.dialog = false
        },
        async resolve(){
            try {
                const requerimiento = await resolveRequerimiento.bind(this)({requerimiento_code:this.requerimiento.code,comment:this.comment})
                this.$store.commit("requerimientos/spliceById",requerimiento)
            } catch (error) {
                this.$swal({
                icon:"error",
                title: 'Error',
                text: error
                })
            }finally{
                this.reset()
                this.dialog = false
            }
        },

    }
}
</script>

<style>

</style>