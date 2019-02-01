<template>
  <section>
    <a tabindex="" class="btn btn-light" @click="login">Login with Github</a>
  </section>
</template>

<script>

export default {
  data(){
    return {}
  },
  methods:{
    login(){
      this.$auth.loginWith('github')
    }
  }
}
</script>
