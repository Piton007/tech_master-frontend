<template>
    <v-timeline dense align-top style="height:100%">
            <v-timeline-item v-for="(log,index) in logs" :key="index" color="warning" class="mb-4 pr-6"  >                            
            <v-card
                color="info"
                dark
                max-width="400"
            >
                <v-card-title class="text-h6">
                 {{log.event}}
                </v-card-title>
                <v-card-text class="accent pt-2">
                    <div v-for="(text,key) in log.comment.split('\n')" :key="key">
                        {{text}}
                    </div>
                    <div class="text-caption font-weight-bold mt-2">
                        {{log.fechaCreacion}}
                    </div>
                </v-card-text>
            </v-card>
            </v-timeline-item>
    </v-timeline>
</template>

<script>
export default {
    props:{
        data:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    computed:{
        logs(){
            const clone = [...this.data]
            clone.sort((a,b)=>this.$dayjs(b.fechaCreacion).diff(a.fechaCreacion))
            return clone
        }
    }
    
}
</script>

<style>

</style>