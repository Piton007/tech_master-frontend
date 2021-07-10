<template>
  <section class="container">
    <v-text-field label="Título" v-model="titulo"  placeholder="Escriba el título del blog" outlined ></v-text-field>
        <quill-editor 
    ref="editor"
    v-model="content"
    :options="editorOption"
            @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
    
  />
  <div class="mt-8">
     <slot v-bind:content="content">
        
    </slot>
  </div>
  </section>

</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor as QuillEditor } from 'vue-quill-editor'


export default {
    components:{
        QuillEditor
    },
    props:{
        title:{
            type:String,
            default:""
        },
        data:{
            type:String,
            default:""
        }
    },
     created(){
        if(!this.data || !this.title) return
        this.content = this.data
        this.titulo = this.title
     },
    data:()=>({
        titulo:"",
        content: '',
        editorOption: {
          placeholder:"Comience la historia...",  
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          }
        }
    }),
    methods: {
      reset(){
        this.titulo = ""
        this.content = ""
      },
      validate(){
        const errors = []
        if (!this.titulo)
            errors.push("El título es obligatorio!")
        if (!this.content)
            errors.push("El contentido es obligatorio!")
        if (errors.length > 0) {
            this.$swal({
                    icon:"error",
                    title:"Error al crear blog",
                    text:errors.join("\n")
                })
            return false
        }
        return true
      },
      getContent(){
          return {
              valid:this.validate(),
              title:this.titulo,
              content:this.content
          }
      },    
      onEditorBlur(editor) {
        
      },
      onEditorFocus(editor) {
       
      },
      onEditorReady(editor) {
        
      }
    },

}
</script>

<style>

</style>