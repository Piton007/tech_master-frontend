<template>
    <v-form ref="form">
        <v-row style="margin-top:0">
            <v-col cols="10">
                <v-select no-data-text="No existe datos" :rules="[v=> !!v || '*Campo obligatorio']" v-model="service" :items="services" label="Servicio"></v-select>
            </v-col>
            <v-col cols="2">
                <div style="display:flex;flex-direction:column;justify-content:center;height:100%">
                    <v-dialog v-model="newServiceDialog"       
                        persistent      
                        width="500"
                        min-width="350">
                        <template v-slot:activator="{on,attrs}">
                            <v-btn fab dark color="info" x-small v-bind="attrs" v-on="on">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>Agregar Servicio</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-form ref="serviceForm">
                                    <v-text-field label="Servicio" :rules="[v=> !!v || '*Campo obligatorio']" v-model="newService" />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="newServiceDialog=false"
                                >
                                    Cerrar
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="addService"
                                >
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-col>
        </v-row>
        <v-row style="margin-top:0" v-if="!!service">
            <v-col cols="10">
                <v-select no-data-text="No existe datos" v-model="category" :rules="[v=> !!v || '*Campo obligatorio']"  :items="categories" label="Categoría" ></v-select>
            </v-col>
            <v-col cols="2">
                <div style="display:flex;flex-direction:column;justify-content:center;height:100%">
                    <v-dialog v-model="newCategoryDialog"
                        persistent      
                        width="500"
                        min-width="350">
                        <template v-slot:activator="{on,attrs}">
                            <v-btn fab dark color="info" x-small v-bind="attrs" v-on="on">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>Agregar Categoría</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-form ref="categoryForm">
                                    <v-text-field label="Categoría" :rules="[v=> !!v || '*Campo obligatorio']" v-model="newCategory" />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="newCategoryDialog=false"
                                >
                                    Cerrar
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="addCategory"
                                >
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>                        
                </div>
            </v-col>
        </v-row>
        <v-row style="margin-top:0" v-if="!!category">
            <v-col cols="10">
                <v-select no-data-text="No existe datos" v-model="subCategory"  :items="subcategories" label="SubCategoría" ></v-select>
            </v-col>
            <v-col cols="2">
                <div style="display:flex;flex-direction:column;justify-content:center;height:100%">
                    <v-dialog v-model="newSubCategoryDialog"
                        persistent      
                        width="500"
                        min-width="350">
                        <template v-slot:activator="{on,attrs}">
                            <v-btn fab dark color="info" x-small v-bind="attrs" v-on="on">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>Agregar SubCategoría</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-form ref="subCategoryForm">
                                    <v-text-field label="SubCategoría" :rules="[v=> !!v || '*Campo obligatorio']" v-model="newSubCategory" />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="newSubCategoryDialog=false"
                                >
                                    Cerrar
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="addSubCategory"
                                >
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>                        
                </div>
            </v-col>
        </v-row>
        <v-select :rules="[v=> !!v || '*Campo obligatorio']" no-data-text="No existe datos" v-model="priority" :items="priorities" item-text="text" item-value="id" label="Impacto"></v-select>
        <v-text-field v-if="!!priority" :value="sla + ' h'" label="Tiempo de atención estimado" readonly></v-text-field>
    </v-form>
</template>

<script>
export default {
    props:{
        categoryId:{
            type: Number,
            default:-1
        }
    },
    created(){
        if(this.categoryId == -1) return
        this.fetchCategory()
    },

    data:()=>({
        newServiceDialog:false,
        newCategoryDialog:false,
        newSubCategoryDialog:false,
        newSubCategory:"",
        newService:"",
        newCategory:"",
        priority: "",
        category:"",
        service:"",
        subCategory:"",
        serviceItems:[],
        categoryItems:[],
        subCategoryItems:[],
    }),
    methods:{
        fetchCategory(){
            const category = this.$store.getters['categories/findById'](this.categoryId)
            this.priority = category.priority.id
            this.service = category.service
            this.category = category.category
            this.subCategory = category.subCategory
        },
        submit(){
            return {
                service:this.service,
                category:this.category,
                subCategory:this.subCategory,
                priority_id:this.priority
            }
        },
        reset(){
            this.$refs.form.reset()
        },
        validate(){
            return this.$refs.form.validate() 
        },
        addService(){
            if (!this.$refs.serviceForm.validate()) return
            this.serviceItems.push(addItem(this.newService))
            this.service = this.newService
            this.newServiceDialog = false
        },
        addCategory(){
            if(!this.$refs.categoryForm.validate()) return
            this.categoryItems.push(addItem(this.newCategory))
            this.category = this.newCategory
            this.newCategoryDialog = false            
        },
        addSubCategory(){
            if(!this.$refs.subCategoryForm.validate()) return
            this.subCategoryItems.push(addItem(this.newSubCategory))
            this.subCategory = this.newSubCategory
            this.newSubCategoryDialog = false
        }
    },
    watch:{
        newSubCategoryDialog(){
            if (!this.$refs.subCategoryForm) return
            this.$refs.subCategoryForm.reset()
        },
        newCategoryDialog(){
            if(!this.$refs.categoryForm) return
            this.$refs.categoryForm.reset()
        },
        newServiceDialog(){
            if(!this.$refs.serviceForm) return
            this.$refs.serviceForm.reset()
        },
        categoryId(){
            this.fetchCategory()
        }
    },
        computed:{
        services(){
            const services = this.$store.getters["categories/getServices"]().concat(...this.serviceItems)
            return services
        },
        categories(){
            if(!this.service) return []
            return this.$store.getters["categories/getCategories"](this.service).concat(...this.categoryItems)

        },
        subcategories(){
            if (!this.category) return []
            return this.$store.getters["categories/getSubcategories"]({service:this.service,category:this.category}).concat(...this.subCategoryItems)
        },
        priorities(){
            return this.$store.getters["priorities/getAll"]().map(x=>({
                text:x.label,
                value:x.valor,
                sla:x.sla,
                id:x.id
            }))
        },
        sla(){
            return this.$store.getters["priorities/getAll"]().find(x=>x.id === this.priority).sla
        }
    }
}
function addItem(value) {
    return {
        text:value,
        value,
        categories:[]
    }

}
</script>

<style>

</style>