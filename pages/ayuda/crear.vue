<template>
  <client-only>
      <create-blog/>
  </client-only>
</template>

<script>
import CreateBlog from "@/components/molecules/blog/crear.vue"

export default {
    components:{
        CreateBlog
    },
    layout:'admin'
}
</script>

<style>

</style>