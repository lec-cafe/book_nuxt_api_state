<template>
  <section>
    <h2>Open New Issue</h2>
    <div>
      <form>
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" v-model="form.title">
        </div>
        <div class="form-group">
          <label>Body</label>
          <textarea class="form-control" v-model="form.body"/>
        </div>
        <a class="btn btn-primary" tabindex="" @click="submit">Submit</a>
      </form>
    </div>
  </section>
</template>

<script>

export default {
  data(){
    return {
      form: {
        title: "",
        body: ""
      }
    }
  },
  computed: {
    fullname(){
      return `${this.$route.params.owner}/${this.$route.params.repos}`
    }
  },
  methods:{
    async submit(){
      await this.$store.dispatch("postIssues",{
        ...this.$route.params,
        issue: this.form
      })
      this.$router.push(`/repos/${this.fullname}`)
    }
  }
}
</script>
