import m from 'mithril'

export default function Layout () {
  let app
  let authService

  async function logout () {
    await authService.logout()
    app.setState('currentUser', null)
    m.route.set('/login')
  }

  return {
    oninit: (vnode) => {
      app = vnode.attrs.app
      authService = app.getService('auth')
    },
    view: (vnode) => {
      const currentUser = app.getState('currentUser')

      return m('main', {}, [
        m('aside', {}, currentUser
          ? [
              m('p', {}, `${currentUser.name}(${currentUser.email})`),
              m('button', {
                type: 'button',
                onclick: logout
              }, 'ログアウト')
            ]
          : [
              m('p', {}, [
                m(m.route.Link, { href: '/login' }, 'ログイン'),
                m('span', {}, 'または'),
                m(m.route.Link, { href: '/register' }, 'ユーザー登録')
              ])
            ]),
        vnode.children
      ])
    }
  }
}
