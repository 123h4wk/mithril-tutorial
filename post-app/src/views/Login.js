import m from 'mithril'

export default function Login () {
  let app
  let authService
  let email = ''
  let password = ''
  let loading = false
  let error = ''

  async function login (e) {
    e.preventDefault()
    loading = true
    error = ''
    const currentUser = await authService.login(email, password)
    if (currentUser) {
      app.setState('currentUser', currentUser)
      m.route.set('/posts')
    } else {
      error = '認証に失敗しました。入力情報が正しいか確認してください。'
      loading = false
      m.redraw()
    }
  }

  return {
    oninit: (vnode) => {
      app = vnode.attrs.app
      authService = app.getService('auth')
    },
    view: () => {
      return [
        m('h1', {}, 'ログイン'),
        m('form', { onsubmit: login }, [
          m('fieldset', { disabled: loading }, [
            m('div', {}, [
              m('label', { for: 'email' }, 'メールアドレス'),
              m('input', {
                id: 'email',
                type: 'email',
                value: email,
                onchange: (e) => { email = e.target.value }
              })
            ]),
            m('div', {}, [
              m('label', { for: 'password' }, 'パスワード'),
              m('input', {
                id: 'password',
                type: 'password',
                value: password,
                onchange: (e) => { password = e.target.value }
              })
            ]),
            m('div', {}, [
              m('button', { type: 'submit' }, 'ログイン')
            ]),
            error && m('div', {}, [
              m('p', { style: { color: 'red' } }, error)
            ])
          ])
        ])
      ]
    }
  }
}
