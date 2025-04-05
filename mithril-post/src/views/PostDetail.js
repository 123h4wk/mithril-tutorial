import m from 'mithril'

export default function PostDetail () {
  let postService
  let post
  let loading = false

  async function removePost () {
    loading = true
    await postService.removeById(post.id)
    m.route.set('/posts')
  }

  function nl2br (texts) {
    return texts.split('\n').map(text => {
      return [
        m('span', {}, text),
        m('br', {})
      ]
    })
  }

  return {
    oninit: async (vnode) => {
      loading = true
      postService = vnode.attrs.app.getService('post')
      post = await postService.fetchById(vnode.attrs.id)
      loading = false
      m.redraw()
    },
    view: (vnode) => {
      const currentUser = vnode.attrs.app.getState('currentUser')
      if (loading) {
        return m('p', {}, '読み込み中...')
      } else {
        return [
          m('h1', {}, post.title),
          m('p', {}, [
            nl2br(post.body)
          ]),
          m('small', {}, `投稿者: ${post.author.name}`),

          m('menu', {}, [
            post.createdBy(currentUser) && [
              m('li', {}, [
                m('button', {
                  type: 'button',
                  onclick: removePost
                }, '削除')
              ]),
              m('li', {}, m(m.route.Link, { href: `/posts/${post.id}/edit` }, '記事編集'))
            ],
            m('li', {}, [
              m(m.route.Link, { href: '/posts' }, '記事一覧')
            ])
          ])
        ]
      }
    }
  }
}
