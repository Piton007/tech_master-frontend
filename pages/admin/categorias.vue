<template>
    <div>
        <categories/>
        <div style="float:right" class="my-3 mr-2">

            <add-category/>
        </div>
    </div>
</template>

<script>
import AddCategory from "@/components/molecules/categories/add.category.vue"
import Categories from "@/components/molecules/categories/data.table.vue"

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
        AddCategory
    }
}
</script>

<style>

</style>