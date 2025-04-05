import m from 'mithril'

export default function PostForm () {
  let currentUser
  let postService
  let postId
  let loading = false
  let inputTitle = ''
  let inputBody = ''

  async function handleSubmit (e) {
    e.preventDefault()
    if (postId) {
      await postService.update({
        id: postId,
        title: inputTitle,
        body: inputBody
      })
    } else {
      postId = await postService.create({
        title: inputTitle,
        body: inputBody,
        author: currentUser
      })
    }
    m.route.set(`/posts/${postId}`)
  }

  return {
    oninit: async (vnode) => {
      postId = vnode.attrs.id
      currentUser = vnode.attrs.app.getState('currentUser')
      postService = vnode.attrs.app.getService('post')

      if (postId == null) {
        return
      }

      loading = true
      const post = await postService.fetchById(postId)
      inputTitle = post.title
      inputBody = post.body
      loading = false
      m.redraw()
    },
    view: (vnode) => {
      if (loading) {
        return m('p', {}, '読み込み中...')
      } else {
        return [
          m('h1', {}, postId ? '記事編集' : '記事作成'),
          m('form', { onsubmit: handleSubmit }, [
            m('fieldset', { disabled: loading }, [
              m('div', {}, [
                m('label', { for: 'post-title' }, 'タイトル'),
                m('input', {
                  id: 'post-title',
                  type: 'text',
                  value: inputTitle,
                  onchange: (e) => { inputTitle = e.target.value }
                })
              ]),
              m('div', {}, [
                m('label', { for: 'post-body' }, '本文'),
                m('textarea', {
                  id: 'post-body',
                  rows: 20,
                  value: inputBody,
                  onchange: (e) => { inputBody = e.target.value }
                })
              ]),
              m('div', {}, [
                m('button', { type: 'submit' }, postId ? '更新' : '作成')
              ])
            ])
          ]),
          m('menu', {}, [
            postId && m('li', {}, [
              m(m.route.Link, { href: `/posts/${postId}` }, '記事詳細')
            ]),
            m('li', {}, [
              m(m.route.Link, { href: '/posts' }, '記事一覧')
            ])
          ])
        ]
      }
    }
  }
}
