<template>
    <client-only>
        <view-blog :id="parseInt(this.$route.params.id)"  />
       
    </client-only>    
</template>

<script>
import ViewBlog from "@/components/molecules/blog/ver"

export default {
    layout:'admin',
    components:{
        ViewBlog
    },
}
</script>

<style>

</style>