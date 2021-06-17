<template>

  <v-app class="accent-bg" >
    <v-navigation-drawer
      v-model="drawer"
      class="primary-gradient"
      dark
      clipped
      app     
    >
      <v-list >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
     clipped-left
      app
      dark
      class="app-bar"
      
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <img   src="/logo.png" width="110"/>
    <div class="nav-bar-user text-h6">Hola {{$store.getters['user/getName']()}}</div>
      
    </v-app-bar>
    <client-only>
    <v-main  >
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    </client-only>

  </v-app>
  

</template>

<script>
import {getNavOptions} from "@/utils/rol"

export default {
  middleware:"check.auth.rol",
  data () {
    return {
      clipped: false,
      drawer: true,
      items: [],
      miniVariant: false,
      title: 'Helpdesk'
    }
  },
  mounted(){
    this.initMenu()
  },
  methods:{
    initMenu(){
      this.items = getNavOptions(this.$store.state.user.rol)
    }
  }
}
</script>
