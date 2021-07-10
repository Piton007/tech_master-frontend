<template>
  <div>
      <v-row>
          <v-col>
            <v-text-field label="Buscar" prepend-icon="mdi-search-web" v-model="search"></v-text-field>
          </v-col>
      </v-row>
  <div style="max-height:80vh;overflow-y:scroll;overflow-x:hidden;padding:10px 5px">
      <v-row v-for="b in blogs" :key="b.id" >
        <v-col>
            <v-card @click="view(b.id)">
                <v-card-title>
                    <div class="text-h5">
                        {{b.title}}
                    </div>
                </v-card-title>
            <v-card-text>
                <div class=" text-subtitle-1">
                    Fecha de actualización: {{b.fechaActualizacion}}
                </div>
            </v-card-text>
         
            </v-card>
        </v-col>
      </v-row>
  </div >
  <div style="float:right" class="mt-2" v-if="$store.state.user.rol === 'admin'">
    <v-btn  fab color="primary" dark @click="goTo">
              <v-icon> mdi-plus</v-icon>
    </v-btn>
  </div>

  </div>
</template>

<script>
import RichTextEditor from "@/components/molecules/blog/editar.vue"
export default {
    layout:'admin',
    async fetch(){
        try {
            this.$store.dispatch("blogs/fetchAll")
        } catch (error) {
        }
    },
    components:{
        RichTextEditor
    },
    data:()=>({
        search:""
    }),
    methods:{
        goTo(){
            this.$router.push({path:"/ayuda/crear/"})
        },
        view(id){
            this.$router.push({path:"/ayuda/"+id})
        }
    },
    computed:{
        blogs(){
            const blogs = this.$store.getters["blogs/getAll"]()
            if (!this.search)
                return blogs
            return blogs.filter(x=>x.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
        }
    }
}
</script>

<style>

</style>