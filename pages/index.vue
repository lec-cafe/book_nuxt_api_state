<template>
  <section>
    <h2>Repositories</h2>
    <div>
      <div class="list-group list-group-flush">
        <router-link :to="`/repos/${repo.full_name}`" class="list-group-item list-group-item-action" v-for="(repo,index) in repos" :key="index">
          <div class="">{{repo.full_name}}</div>
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
    repos(){
      return this.$store.state.repos
    }
  },
}
</script>
