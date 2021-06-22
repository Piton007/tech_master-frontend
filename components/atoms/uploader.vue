<template>
    <div>
    <div class="mb-3"> Agregar archivos</div>

    <file-pond
    :files="files"
    ref="pond"
    :disabled="fileDisabled"
    label-idle="Arrastra archivo aquí o haz un click/toque"
    labelFileProcessingAborted="Subida cancelada"
    labelTapToRetry="Click/toque para volver a intentar"
    labelFileProcessing="Subiendo"
    labelTapToCancel="Cancelar"
    labelFileProcessingComplete="Archivo subido"
    :instant-upload="true"
    :allow-revert="false"
    allowRemove
    labelButtonRemoveItem="Eliminar"
    allow-multiple="true" 
    max-files="3"
    :server="fileServer"
    labelFileTypeNotAllowed="Tipo de archivo no permitido"
    maxTotalFileSize="5MB"
    labelMaxTotalFileSizeExceeded="Archivo es muy pesado"
    labelMaxTotalFileSize="Máximo 5MB"
    @init="handleFilePondInit"
    @processfile="handleProcessfile"
    >

    </file-pond>
    <div class="text-center">   
         <v-btn  @click="deleteAllFiles" x-small color="error">
            <v-icon >mdi-trash-can-outline</v-icon>
            Eliminar
        </v-btn>
    </div>
    <p  class="mt-2 red--text"> *Adjunte archivos para atenderlo mas rápido</p>
    
    </div>

</template>

<script>
import {upload,remove} from "@/utils/s3"
import FilePond from "@/utils/upload.documents"


export default {
    components:{
        FilePond
    },
    data:()=>({
        files:[],
        fileDisabled:false,
        fileServer: {}
    }),
    methods:{
        reset(){
            this.files = []
        },
        getURLS(){
            return !this.files.length ? this.files : this.files.map(x=>x.serverId)
        },
        handleFilePondInit () {
        this.fileServer = {
            process: (fieldName, file, metadata, load, error, progress, abort) => {
            upload(file, (err, data) => {
                if (err) {
                error('Ha ocurrido un error al subir el archivo')
                return
                }
                load(data.Key)
            })
            },
        }
        },
        handleProcessfile (error, file) { 
        if (error) {
            return
        }
        this.files.push(file)
        },
        deleteAllFiles(){
            this.files.forEach(x=>{
                remove(x.serverId,(error,data)=>{
                    if (error) console.log(error) 
                })
            })
            this.$refs.pond.removeFiles()
            this.files = []
        },
    }
}
</script>

<style>

</style>