<template>
    <div>
    <v-dialog v-model="dialog" min-width="350" max-width="500">
        <v-card >
            <v-card-title style="justify-content:space-between" >
                <div :class="(decision === 'accept') ? 'success--text' : 'error--text' ">
                    {{(decision === 'accept') ? 'Aceptar resolución' : 'Rechazar resolución'}}
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-textarea rows="2" v-model="comment" label="Comentario">

                </v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text  @click="dialog=false"> Cerrar</v-btn>
                <v-btn color="primary" text  @click="verify"> Enviar</v-btn>
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
    <v-container v-if="!$fetch.pending">
    <v-row style="flex-wrap: no-wrap" >
        <v-col  md="4" sm="12">
            <v-card>
                <v-card-title class="card-title">
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
                    <span>{{requerimiento.fechaAsignacion || "--:--"}}</span>
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
                <p v-if="documents.length > 0"  class="mb-2 mx-2 font-weight-bold">
                    Adjuntos: 
                </p>
                <div class="mb-2 mx-2">
                    <a :href="file.link" class="mb-2 mx-2" target="_blank" v-for="(file,index) in documents" :key="index">
                        {{file.urn}}
                    </a>
                </div>


                </v-card-text>
                <v-card-actions v-if="requerimiento.status ===  'Resuelto'">
                     <v-btn color="success" text @click="showDialog(true)">
                         Aceptar
                     </v-btn>
                     <v-btn color="error" text @click="showDialog(false)">
                         Rechazar
                     </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col md="8" v-if="$vuetify.breakpoint.mdAndUp" >
            <v-card style="height:100%; overflow:hidden" >
                <v-card-title class="card-title" > Bitácora de requerimiento </v-card-title>
                <div class="secondary" style="height:100%;max-height:90vh;overflowY:scroll" >
                    <v-timeline dense align-top style="height:100%">
                        <v-timeline-item v-for="(log,index) in logs" :key="index" color="warning" class="mb-4 pr-6"  >                            
                        <v-card
                            color="info"
                            dark
                            max-width="400"
                        >
                            <v-card-title class="text-h6">
                             {{log.event}}
                            </v-card-title>
                            <v-card-text class="accent pt-2">
                                <div v-for="(text,key) in log.comment.split('\n')" :key="key">
                                    {{text}}
                                </div>
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
                <v-card-title class="card-title" > Bitácora de requerimientos</v-card-title>
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
                            <v-card-text class="accent pt-2">
                                <div v-for="(text,key) in log.comment.split('\n')" :key="key">
                                    {{text}}
                                </div>
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
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Agregar Comentario
                </v-card-title>
                <v-card-text>
                <v-form ref="formComment">
                    <v-textarea outlined :rules="[(v=>!!v || '*Campo obligatorio')]" label="Descripción" placeholder="Añadir un nuevo comentario..." v-model="newComment">

                    </v-textarea>
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="submitComment" text :disabled="newCommentLoading"> Añadir</v-btn>
                </v-card-actions>
                </v-card-text>
            </v-card>

        </v-col>
    </v-row>
    </v-container>
    
    </div>


</template>

<script>
import verifyRequerimiento from "@/networking/requerimientos/verify.requerimiento"
import addComment from "@/networking/requerimientos/add.comment.requerimiento"
import {generateLink} from "@/utils/s3"

export default {
    layout:"client",
    async fetch(){
        try {
            if(!this.$store.state.requerimientos.list.length) {
            await this.$router.replace("/requerimientos")
            return 
        }
        const req = this.$store.state.requerimientos.list.find(x=>x.code === this.$route.params.id)
        if(!req)
           await this.$router.replace("/requerimientos")
        } catch (error) {
            await this.$router.replace("/requerimientos")
        }
    
    },
    data:()=>({
        dialog:false,
        decision:"",
        comment:"",
        newComment:"",
        newCommentLoading:"",
        commentLoading:false
    }),
    computed:{
        logs(){
            const _requerimiento = this.$store.state.requerimientos.list.find(x=>x.code === this.$route.params.id)
            const clone = [..._requerimiento.logs ]
            clone.sort((a,b)=>this.$dayjs(b.fechaCreacion).diff(a.fechaCreacion))
            return clone
           
        },
        requerimiento(){
            return this.$store.state.requerimientos.list.find(x=>x.code === this.$route.params.id)
        },
        documents(){
            return this.requerimiento.documents.map(x=>({link:generateLink(x),urn:x}))
        },
        breadcrumbs(){
            return [
                {text:'requerimientos',disabled:false,href:"/requerimientos"},
                {text:this.requerimiento.code,disabled:true}
            ]
        }
    },
    methods:{
        async submitComment(){
            try {
                if(!this.$refs.formComment.validate()) return
            
                this.newCommentLoading = true
                const requerimiento = await addComment.bind(this)({
                    user_id:this.$store.state.user.id,
                    requerimiento_code:this.requerimiento.code,
                    comment:this.newComment}
                    )
                this.$store.commit("requerimientos/spliceById",requerimiento)
                this.$swal({
                    icon:"success",
                    title:"Nuevo comentario",
                    text:"Se ha agregado un nuevo comentario"

                })
            } catch (error) {
                
            }finally {
            
           
                this.$refs.formComment.reset()
                this.newCommentLoading = false
                this.dialog = false
            }


            
        },
        reset(){
            this.decision = ""
            this.comment = ""
        },
        async verify(){
            try {
            const requerimiento = await verifyRequerimiento.bind(this)({
                result:this.decision,
                requerimiento_code: this.requerimiento.code,
                comment: this.comment,
            })
            this.$store.commit("requerimientos/spliceById",requerimiento)
                
            } catch (error) {
                
            }finally{
                this.reset()
                this.dialog = false
            }


            

        },
        showDialog(decision){
            this.decision = (decision) ? "accept" : "rejected" 
            this.dialog = true
        }
    }
}
</script>

<style>

</style>