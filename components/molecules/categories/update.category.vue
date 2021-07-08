<template>
  <v-dialog v-model="dialog"
      persistent      
      width="500"
      min-width="350"
      >
    </template>
    <v-card>
        <v-card-title>Actualizar categoría</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <category-form ref="form" :categoryId="categoryId"></category-form>
        </v-card-text>
        <v-card-actions >
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
              @click="create"
          >
              Crear
          </v-btn>
        </v-card-actions>
    </v-card>

  </v-dialog>

</template>

<script>
import CategoryForm from "@/components/molecules/categories/category.picker"

export default {
    props:{
        categoryId:{
            type:Number,
            default:null
        }
    },
    components:{
        CategoryForm
    },
    data:()=>({
        dialog:false,
    }),
    methods:{
        async update(){
            if (!this.$refs.form.validate()) return
            try {
                await this.$store.dispatch("categories/update",
                    this.$refs.form.submit()

                )
                this.$swal({
                    icon:"success",
                    title:"Actualización de categoría",
                    text:"Se ha actualizado una categoria"

                }) 
            } catch (error) {
                
            }finally{
                this.dialog = false
            }
            
        },

    },
   

}

</script>
