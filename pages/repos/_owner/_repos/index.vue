<template>
  <section>
    <h2>Issues</h2>
    <p class="text-muted">{{fullname}}</p>
    <div class="text-right mb-3">
      <router-link class="btn btn-outline-primary" :to="`/repos/${fullname}/new`">Open New Issue</router-link>
    </div>
    <div>
      <div class="list-group list-group-flush">
        <router-link :to="`/repos/${fullname}/issue/${issue.number}`" class="list-group-item list-group-item-action" v-for="(issue,index) in issues" :key="index">
          <div class="">#{{issue.number}} {{issue.title}}</div>
        </router-link>
      </div>
    </div>
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
    issues(){
      return this.$store.state.issues
    }
  },
  mounted(){
    this.$store.dispatch("fetchIssues",this.$route.params)
  }
}
</script>
