import m from 'mithril'

export default function PostList () {
  let postService
  let postCollection
  let loading = false

  return {
    oninit: async (vnode) => {
      postService = vnode.attrs.app.getService('post')
      loading = true
      postCollection = await postService.fetchCollection()
      loading = false
      m.redraw()
    },
    view: () => {
      if (loading) {
        return m('p', {}, '読み込み中...')
      }
      return [
        m('h1', {}, '記事一覧'),
        m('div', {}, [
          m(m.route.Link, { href: '/posts/new' }, '記事作成'),
          postCollection.isEmpty()
            ? m('article', {}, '記事が投稿されていません。')
            : postCollection.items.map(post =>
              m('article', {}, [
                m(m.route.Link, {
                  href: `/posts/${post.id}`
                }, m('h2', {}, post.title)),
                m('small', {}, `投稿者: ${post.author.name}`)
              ])
            )
        ])
      ]
    }
  }
}
