# Nuxt.js を使ったアプリケーション開発

Nuxt.js は Vue.js のアプリケーションフレームワークです。

Vue.js で本格的なアプリケーションを作成する際に必要となる VueRouter/Vuex を同梱し、
複数人でのアプリケーション開発をより円滑に進めるための規約を提供してくれています。


今回は、サンプルアプリケーションとして、Github APIを利用した Issue 管理ツールを作成します。
サンプルアプリケーションの制作を通じて、 Nuxt.js でのアプリケーション開発の基礎から、
Nuxt.js アプリケーションでの REST APIの発行、 Vuex Store によるデータ管理の手法、を学んでいきましょう。

## 準備

まずは、Nuxt.js の開発環境を構築しましょう。

Nuxt.js でアプリケーション開発を始めるためには、まず npx コマンドを利用して、
アプリケーションの雛形を作成します。

```
$ npx create-nuxt-app my_issue_app
```

ファイルが展開されたら、作成されたフォルダ内に移動して `npm run dev` コマンドを実行すれば、
開発用のWebサーバが立ち上がります。

### ページの準備

今回は、Github APIを利用した Issue 管理ツール を作成します。

簡単に Issue 一覧のページと Issue 個別画面のページを作成してみましょう。

CSSの記述を簡単にするために 今回は Twitter Booststrap を利用します。

`nuxt.config.js` の `head.link` セクションに Bootstrap の CDN を追加します。


```js
module.exports = {
  // ...
  head: {
    // ...
    link: [
      { rel: 'stylesheet', href: "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" }
    ]
  },
}
```

次にフォルトのスタイルを消去するために、レイアウトファイルを調整します。

`style` 要素の中身を削除して以下のような形で `layouts/defautl.vue`を編集しましょう。

```vue
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container">
        <a class="navbar-brand" href="/">Navbar</a>
      </div>
    </nav>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<style>
  .container{
    max-width: 640px;
  }
</style>
```

レイアウトの準備ができたら、Issue 一覧のページを作成します。
`pages/index.vue` を以下のような形で作成してみましょう。

変数 `issues` に定義した配列のデータを `v-for` でループして表示しています。

```vue
<template>
  <section>
    <h2>Issues</h2>
    <div class="text-right mb-3">
      <router-link class="btn btn-outline-primary" to="/new">Open New Issue</router-link>
    </div>
    <div>
      <div class="list-group list-group-flush">
        <router-link :to="`/issue/${issue.number}`" class="list-group-item list-group-item-action" v-for="(issue,index) in issues" :key="index">
          <div class="">#{{issue.number}} {{issue.title}}</div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data(){
    return {
      issues: [
        {number: "1", title: "Cras justo odio"},
        {number: "2", title: "Dapibus ac facilisis in"},
        {number: "3", title: "Morbi leo risus"},
        {number: "4", title: "Porta ac consectetur ac"},
        {number: "5", title: "Vestibulum at eros"},
      ]
    }
  }
}
</script>
```

一覧からの遷移先として、Issue 詳細のページも作成しておきましょう。

`pages/issue/_id/index.vue` を作成して以下の内容を記述します。

変数 `issue` に定義したデータでテンプレートにデータを描画しています。

```vue
<template>
  <section>
    <h2 class="mb-3">#{{issue.number}} {{issue.title}}</h2>
    <div class="text-right mb-5">
      <a :href="issue.html_url">Open Github</a>
    </div>
    <div class="mb-5">{{issue.body}}</div>
    <router-link class="btn btn-outline-primary" to="/">back</router-link>
  </section>
</template>

<script>

export default {
  data(){
    return {
      issue: {
        number: "1",
        title: "Cras justo odio",
        html_url: "https://github.com/lec-cafe/book_nuxt_api_state/issues/1",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa nihil pariatur repudiandae soluta voluptas! Aperiam asperiores atque corporis ex hic illum in incidunt iure minus non obcaecati provident quam, voluptatum?"
      },
    }
  }
}
</script>
```

Issue 新規作成のページも作成しておきましょう。

`pages/new/index.vue` を作成して、以下の内容を記述します。

変数 `form` のデータを 各フォームにバインドしています。 

```vue
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
  methods:{
    submit(){
      console.log(this.form)
      this.$router.push("/")
    }
  }
}
</script>
```

画面を作成して一覧の動きが確認できたら準備は完了です！ 

次は、実際に REST API を発行して、アプリケーションとして動作できるように実装してみましょう。
