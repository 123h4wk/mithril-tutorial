import m from 'mithril'

export default function UserRegister () {
  let userService
  let email = ''
  let name = ''
  let password = ''
  let loading = false
  let errors = []

  async function register (e) {
    e.preventDefault()

    errors = []

    if (email.length === 0) {
      errors.push('メールアドレスは必須項目です。')
    }

    if (name.length === 0) {
      errors.push('ユーザー名は必須項目です。')
    }

    if (password.length === 0) {
      errors.push('パスワードは必須項目です。')
    }

    if (errors.length === 0) {
      loading = true
      await userService.create(email, name, password)
      m.route.set('/login')
    }
  }

  return {
    oninit: (vnode) => {
      userService = vnode.attrs.app.getService('user')
    },
    view: () => {
      return [
        m('h1', {}, 'ユーザー登録'),
        m('form', { onsubmit: register }, [
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
              m('label', { for: 'name' }, 'ユーザー名'),
              m('input', {
                id: 'name',
                type: 'text',
                value: name,
                onchange: (e) => { name = e.target.value }
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
              m('button', { type: 'submit' }, '登録')
            ]),
            m('ul', {},
              errors.map(error =>
                m('li', { style: { color: 'red' } }, error)
              )
            )
          ])
        ])
      ]
    }
  }
}
