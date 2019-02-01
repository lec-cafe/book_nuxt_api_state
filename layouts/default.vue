<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container">
        <router-link class="navbar-brand" to="/">Navbar</router-link>
      </div>
    </nav>
    <div class="container">
      <div class="text-right" v-if="$auth.user">
        <a tabindex="" @click="logout">logout</a>
      </div>
      <nuxt />
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    async mounted(){
      await this.$store.dispatch("fetchIssues")
    },
    methods:{
      async logout(){
        await this.$auth.logout()
        this.$router.push("/login")
      }
    }
  }
</script>

<style>
  .container{
    max-width: 640px;
  }
</style>
