<template>
    <v-autocomplete
                 v-model="user"
                 :rules="[v=> !!v || '*Campo obligatorio']"
                 :items="users"
                 label="Usuario afectado"
    ></v-autocomplete>
</template>

<script>
export default {
    props:{
        assign:{
            type:Array,
            default:function(){
                return []
            },
        },
        value:{
            type:Number,
            default:0
        }
    },
    data:()=>({
        user:""
    }),
    watch:{
        user(){
            this.$emit('input',parseInt(this.user))
        }
    },
    computed:{
        users(){
            let users = [...this.$store.state.users.list]
            users = users.filter(x=> this.assign.some(y=>x.rol.toLocaleLowerCase() === y.toLocaleLowerCase()))            
            
            return users.map((x)=>(             
               { text:`${x.firstName} ${x.lastName}`,
                value: x.id}))
        },
    }
}
</script>

<style>

</style>