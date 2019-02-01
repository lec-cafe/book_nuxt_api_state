const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src:"~/plugins/index.js",ssr:false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: "https://api.github.com"
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },
  auth: {
    strategies: {
      github: {
        client_id: '8c2a1c097610288ef9fa',
        client_secret: '8abc25b1b31d6afca3ded12b3a5d874f7b78f57d',
        scope: ["user","email","repo"]
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  }
}
