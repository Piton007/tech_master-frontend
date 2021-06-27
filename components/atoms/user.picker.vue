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
            type:Boolean,
            default:false,
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
            if (this.assign)
                users = users.filter(x=>x.rol.toLocaleLowerCase() === 'admin' || x.rol.toLocaleLowerCase() === 'técnico')            
            
            return users.map((x)=>(             
               { text:`${x.firstName} ${x.lastName}`,
                value: x.id}))
        },
    }
}
</script>

<style>

</style>