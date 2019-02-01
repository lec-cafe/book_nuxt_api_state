export const state = () => {
  return {
    issues: [],
    repos: []
  }
}

export const mutations = {
  SET_REPOS (state, repos) {
    state.repos = repos
  },
  SET_ISSUES (state, issues) {
    state.issues = issues
  }
}

export const actions = {
  async fetchRepos (ctx) {
    const url = "/user/repos"
    const {data} = await this.$axios.get(url)
    console.log(data)
    ctx.commit("SET_REPOS", data)
  },
  async fetchIssues (ctx,{owner,repos}) {
    const url = `/repos/${owner}/${repos}/issues`
    const {data} = await this.$axios.get(url)
    console.log(data)
    ctx.commit("SET_ISSUES", data)
  },
  async postIssues (ctx,{owner,repos,issue}) {
    const url = `/repos/${owner}/${repos}/issues`
    await this.$axios.post(url,issue)
  }
}
