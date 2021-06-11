import colors from 'vuetify/es5/util/colors'
import {config} from "dotenv"

require('dayjs/locale/es')

config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TechMaster',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/main.scss",
    "filepond/dist/filepond.min.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
      '~/plugins/axios'
    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/dayjs',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
    'cookie-universal-nuxt',
    ['cookie-universal-nuxt', { alias: 'cookies' }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.API_HOST,
    
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#1b98e0",
          accent: colors.grey.darken3,
          secondary: "#d5d5d5",
          info: colors.teal.lighten1,
          warning: "#ffc145",
          error: "#ff6666",
          success: "#42e2b8"
        },
        light:{
          primary: "#1b98e0",
          accent: colors.grey.darken3,
          secondary: "#ffffff",
          info: colors.teal.lighten1,
          warning: "#ffc145",
          error: "#ff6666",
          success: "#42e2b8"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
