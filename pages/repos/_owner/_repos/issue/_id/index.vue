<template>
  <section >
    <no-ssr>
      <div v-if="issue">
        <h2 class="mb-3">#{{issue.number}} {{issue.title}}</h2>
        <div class="text-right mb-5">
          <a :href="issue.html_url">Open Github</a>
        </div>
        <div class="mb-5">{{issue.body}}</div>
        <router-link class="btn btn-outline-primary" :to="`/repos/${fullname}`">back</router-link>
      </div>
    </no-ssr>
  </section>
</template>

<script>

export default {
  data(){
    return {}
  },
  computed: {
    fullname(){
      return `${this.$route.params.owner}/${this.$route.params.repos}`
    },
    issue(){
      for(let issue of this.$store.state.issues){
        if(this.$route.params.id == issue.number){
          return issue
        }
      }
      return null
    }
  },
  created(){
    if(!this.issue){
      this.$router.push("/")
    }
  }
}
</script>
