<template>
  <v-dialog v-model="dialog"
      persistent      
      width="500"
      min-width="350"
      >
    <template v-slot:activator="{on,attrs}">
        <v-btn
            fab
            color="primary"
            dark
            v-bind="attrs"
            class="my-3 mr-2"
            style="float:right"       
            v-on="on"
            >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </template>
    <v-card>
        <v-card-title>Crear categoría</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <category-form ref="form" :categoryId=2></category-form>
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
    components:{
        CategoryForm
    },
    data:()=>({
        dialog:false,
    }),
    methods:{
        async create(){
            if (!this.$refs.form.validate()) return
            try {
                await this.$store.dispatch("categories/create",
                    this.$refs.form.submit()

                )
                this.$swal({
                    icon:"success",
                    title:"Nuevo categoría",
                    text:"Se ha agregado una nueva categoria"

                }) 
            } catch (error) {
                
            }finally{
                this.dialog = false
            }
            
        },

    },
    watch:{
        dialog(){
            if(!this.$refs.form) return 
            this.$refs.form.reset()
        },

    }

}

</script>
