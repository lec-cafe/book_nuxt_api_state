module.exports = (ctx) => {
  return ctx.store.dispatch("fetchRepos")
}
