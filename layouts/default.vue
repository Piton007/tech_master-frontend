<template>
  <v-app class="primary-gradient">
    <v-main >
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  middleware:'check.auth.rol'
}
</script>
