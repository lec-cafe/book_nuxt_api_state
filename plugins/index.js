export default (ctx) => {
  if(ctx.app.$auth.user){
    return ctx.store.dispatch("fetchRepos")
  }
}
