<template>
    <div>
        <categories/>
        <div>
            <div style="float:right" >
                <add-category/>
            </div>
             <export  class="my-3 mr-2"
            style="float:right"   />
        </div>

    </div>
</template>

<script>
import AddCategory from "@/components/molecules/categories/add.category.vue"
import Categories from "@/components/molecules/categories/data.table.vue"
import Export from "@/components/export.categorias.excel"

export default {
    layout:"admin",
    async fetch({store}){
        await Promise.all(
            [
                store.dispatch("priorities/fetchAll"),
                store.dispatch("categories/fetchAll")
            ]
        )
    },
    components:{
        Categories,
        Export,
        AddCategory
    }
}
</script>

<style>

</style>