<template>
        <v-card v-if="!!ticket">
                <v-card-title class="card-title">
                    <div>
                        Agente trabajando: {{(!ticket.supervisedBy)? "Nadie" : ticket.supervisedBy.firstName }}  
                    </div>
                    
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> Código: </span>
                    <span>{{ticket.code}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> Usuario: </span>
                    <span>{{ticket.creator.firstName}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> DNI: </span>
                    <span>{{ticket.creator.dni}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> Estado: </span>
                    <span>{{ticket.status}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold"> Tiempo: </span>
                    <span>{{ticket.duration}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold">Fecha de creación: </span>
                    <span>{{ticket.fechaCreacion}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold">Fecha de asignación: </span>
                    <span>{{ticket.fechaAsignacion || "--:--"}}</span>
                </p>
                <p class="mb-2 mx-2">
                    <span class="font-weight-bold">Fecha de cierre: </span>
                    <span>{{ticket.fechaCierre || "--:--"}}</span>
                </p>
                <p class="mb-2 mx-2 font-weight-bold">
                    Descripción: 
                    
                </p>
                <div class="mb-2 mx-2">
                    <div v-for="(line,index) of ticket.description.split('\n')"  :key='index'>
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
                <v-card-actions>
                    <slot></slot>
                </v-card-actions>
            </v-card>
</template>

<script>
import {generateLink} from "@/utils/s3"


export default {
    props:{
        ticket:{
            type:Object,
            default:function(){
                return null
            }
        }
    },
    provide(){
        return {ticket:this.ticket}
    },
    computed:{
        documents(){
            return this.ticket.documents.map(x=>({link:generateLink(x),urn:x}))
        },
    }
}
</script>

<style>

</style>