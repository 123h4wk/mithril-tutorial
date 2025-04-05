import o from 'ospec'
import m from 'mithril'
import mq from 'mithril-query'
import UserRepositoryInMemory from '../../src/repositories/UserRepositoryInMemory.js'
import UserService from '../../src/services/UserService.js'
import UserRegister from '../../src/views/UserRegister.js'
import Application from '../../src/Application.js'
import { nextTick } from '../helper.js'

o.spec('UserRegister', () => {
  let app
  let userRepository
  let userService

  o.beforeEach(() => {
    app = new Application()
    userRepository = new UserRepositoryInMemory()
    userService = new UserService(userRepository)
    app.setService('user', userService)
  })

  o('入力されていないフィールドに対して、エラーメッセージが表示されること', async () => {
    const out = mq(UserRegister, { app })
    out.trigger('form', 'submit')
    await nextTick(out)

    o(out.contains('メールアドレスは必須項目')).equals(true)
    o(out.contains('ユーザー名は必須項目')).equals(true)
    o(out.contains('パスワードは必須項目')).equals(true)
  })

  o('新規ユーザーが登録でき、ログイン画面へ遷移すること', async () => {
    m.route.set = o.spy()

    const out = mq(UserRegister, { app })
    out.setValue('#email', 'mail@example.com')
    out.setValue('#name', 'new-user')
    out.setValue('#password', 'password')
    out.trigger('form', 'submit')
    await nextTick(out)

    const user = await userRepository.findByEmail('mail@example.com')
    o(user.name).equals('new-user')
    o(user.password).equals('password')
    o(m.route.set.args[0]).equals('/login')
  })
})
