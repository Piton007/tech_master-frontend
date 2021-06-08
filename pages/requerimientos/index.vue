<template>
    <div >
        <v-data-table

        :headers="headers"
        :items="$store.getters['requerimientos/getRequerimientos']()"
        :items-per-page="5"
        :search="search"
        :header-props="{
        'sort-by-text':'Filtros'
        }"
        no-data-text="No hay requerimientos disponibles"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Requerimientos</v-toolbar-title>
                <v-spacer></v-spacer>
            <v-dialog
            v-model="dialog"
            max-width="500px"
            >
                <v-card>
                    <v-card-title>
                    <span class="text-h5">Crear requerimiento</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                    <v-container>
                        <v-form ref="form">
                        <v-row>
                        <v-col
                            cols="12"

                        >
                            <v-select
                            :items="servicioOptions"
                            v-model="servicio"
                            label="Tipo de servicio"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            v-if="servicio === 'Crear usuario'"

                        >
                            <v-select
                            :rules="[v => !!v || '*Campo obligatorio']"
                            :items="tipoUsuarioOptions"
                            v-model="tipoUsuario"
                            label="Tipo de usuario"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            v-if="servicio === 'Crear usuario'"
                        >
                            <v-text-field
                                
                                v-model="email"
                                :rules="[v=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Ingresa un e-mail válido']"
                                label="Email"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            v-if="servicio === 'Crear usuario'"
                        >
                        <v-text-field
                            
                            v-model="dni"
                            :rules="[v=> /^[0-9]{8}$/.test(v) || 'Ingresa un dni válido', v=> !!v || '*Campo obligatorio']"
                            label="DNI"
                        >
                        </v-text-field>
                        </v-col>
                        <v-col
                            cols="12"

                        >
                            <v-textarea
                            rows="2"
                            v-model="description"
                            label="Descripción"
                            ></v-textarea>
                        </v-col>
                        </v-row>
                        </v-form>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog=false"
                    >
                        Cerrar
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                        Guardar
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>

                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                ></v-text-field>
            </v-toolbar>
        </template>
        <template v-slot:item.categories="{item}">
            <div>Creación de usuario</div>
        </template>
        <template v-slot:item.responsable="{item}">
            <div v-if="!!item.responsable">{{item.responsable}}</div>
            <v-btn v-else small> Asignar </v-btn>
        </template>
        <template v-slot:item.supervisedBy="{item}">
            <div v-if="!!item.supervisedBy">{{item.supervisedBy.firstName}}</div>
            <div v-else> Nadie </div>
        </template>
        <template v-slot:item.ver="{item}">
            <v-icon @click.stop="clickRow(item)"> mdi-eye</v-icon>    
        </template>
    </v-data-table>
    <div>
        <v-btn
            fab
            color="primary"
            dark
            class="my-3 mr-2"
            style="float:right"       
            @click="dialog=true"
                >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>

      </div>
</template>

<script>
import createRequerimientos from "@/networking/requerimientos/create.requerimientos.js"
import getAllRequerimientos from "@/networking/requerimientos/get.all.requerimientos"


export default {
    layout:"client",
    async fetch(){
        try {
            const requerimientos = await getAllRequerimientos.bind(this.$axios)(this.$cookies)
            this.$store.commit("requerimientos/set",requerimientos)
        } catch (e) {
            console.log(e)
                                      this.$swal({
                icon:"error",
                title: 'Error',
                text: e
                })    
        } 
        
    },
    data:()=>({
        dialog:false,
        search:"",
        headers:[
            {
                text:"Código",
                align:"start",
                sortable:true,
                value:'code'
            },
            {
                text:"Fecha de registro",
                align:"start",
                sortable:true,
                value:'fechaCreacion'
            },
            {
                text:"Detalle",
                value:'categories',
                sortable:false,
            },
            {
                text:"Reportador por",
                value:"creator.dni",
                sortable:false,
            },
            {
                text:"Estado",
                value:"status",
                sortable:true,
            },
            {
                text:"Prioridad",
                align:"center",
                value:"creator.priority",
                sortable:true,
            },
            {
                text:"Responsable",
                value:"supervisedBy",
                align:"center",
                sortable:false,
            },
            {
                text:"Ver más",
                value:"ver",
                align:"center",
                sortable:false,
            }
        ],
        items: [

        ],
        servicioOptions:[
            {text:"Crear usuario", value:"Crear usuario"}
        ],
        tipoUsuarioOptions:[{text:"Maestro",value:"Maestro"},
        {text:"Voluntario", value:"Voluntario"}],
        servicio:"",
        dni:"",
        email:"",
        description:"",
        tipoUsuario:""
    }),
    methods:{
        clickRow(item,data){
            this.$router.push({path:"/requerimientos/"+item.code})
        },
        reset(){
            this.servicio = ""
            this.description = ""
            this.dni = ""
            this.email = ""
            this.tipoUsuario = ""
            this.dialog = false
        },
        async save(){
            if(!this.$refs.form.validate()) return 
            try {
                const description = `
                
                DNI:${this.dni}
                Email: ${this.email}
                Tipo Usuario: ${this.tipoUsuario}

                ${this.description}
                `
                const requerimientos = await createRequerimientos.bind(this)({
                description:description,
                categories: [this.servicio,this.tipoUsuario,this.dni,this.email]                
                })
                this.$store.commit("requerimientos/add",requerimientos)
            } catch (error) {
                console.log(error.message)
                this.$swal({
                icon:"error",
                title: 'Error',
                text: error
                })
            }finally {
                this.reset()
            }

        }
    }
}
</script>

<style>

</style>