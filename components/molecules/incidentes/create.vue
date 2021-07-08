<template>
  <v-dialog
    width="500"
    v-model="dialog"
    persistent
    min-width="350"
  >
    <template v-slot:activator="{on,attrs}">
        <v-btn fab dark color="primary" v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </template>
    <v-card>
        <v-card-title>Crear incidente</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-form ref="form" style="padding-top:0.5rem">
                <v-row>
                    <v-col cols="12">
                        <user-picker :assign="['voluntario','maestro']" v-model="affected"></user-picker>

                    </v-col> 
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-select no-data-text="No existe datos" v-model="service" :rules="[v=> !!v || '*Campo obligatorio']"  :items="$store.getters['categories/getServices']()" label="Servicio" ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-select v-if="!!service" no-data-text="No existe datos" v-model="category" :rules="[v=> !!v || '*Campo obligatorio']"  :items="$store.getters['categories/getCategories'](service)" label="Categoría" ></v-select>
                    </v-col>
                </v-row>
                <v-row v-if="!!category">
                    <v-col cols="12">
                        <v-select  no-data-text="No existe datos" v-model="subcategory"  :items="$store.getters['categories/getSubcategories']({service,category})" label="Subcategoria"></v-select>
                    </v-col>
                </v-row>
 
                <v-row v-if="!!actualCategory">
                    <v-col cols="12">
                        <template >
                            <v-text-field readonly :value="actualCategory.priority.label" label="Prioridad"></v-text-field>
                            <v-text-field readonly :value="actualCategory.priority.sla + 'h'" label="Tiempo estimado"></v-text-field>
                        </template>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea rows="2" :rules="[v=> !!v || '*Campo obligatorio']" v-model="description" label="Descripción"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <uploader ref="files"/>   
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dialog=false"> Cerrar</v-btn>
            <v-btn text color="primary" @click="submit"> Crear</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Uploader from "@/components/atoms/uploader"
import UserPicker from "@/components/atoms/user.picker"
export default {
    components:{
        Uploader,
        UserPicker
    },
    data:()=>({
        service:"",
        category:"",
        affected:"",
        subcategory:"",
        dialog:false,
        description:""
    }),
    watch:{
        dialog(){
            if(!this.$refs.form || !this.$refs.form) return 
            this.$refs.form.reset()
            this.$refs.files.reset()
        }
    },
     computed:{
        
        actualCategory(){
            return this.$store.getters["categories/findByOne"]({service:this.service,category:this.category,subcategory:this.subcategory})
        }
    },
    methods:{
        async submit(){

            if(!this.$refs.form.validate()) return
            try {
                await this.$store.dispatch("incidentes/create",{
                    category_id:this.actualCategory.id,
                    affected_id:this.affected,
                    description:this.description,
                    documents: this.$refs.files.getURLS()
                })
            } catch (error) {
                
            }
            this.dialog = false
        }
    },
   
}
</script>

<style>

</style>