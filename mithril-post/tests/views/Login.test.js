import o from 'ospec'
import m from 'mithril'
import mq from 'mithril-query'
import UserRepositoryInMemory from '../../src/repositories/UserRepositoryInMemory.js'
import StorageRepositoryInMemory from '../../src/repositories/StorageRepositoryInMemory.js'
import AuthService from '../../src/services/AuthService.js'
import Login from '../../src/views/Login.js'
import Application from '../../src/Application.js'
import { nextTick } from '../helper.js'

function createUserData () {
  return {
    id: 'test-user',
    name: 'ユーザー名',
    email: 'user@example.com',
    password: 'password'
  }
}

o.spec('Login', () => {
  let app
  let userRepository
  let storageRepository
  let authService

  o.beforeEach(() => {
    app = new Application()
    userRepository = new UserRepositoryInMemory()
    storageRepository = new StorageRepositoryInMemory()
    authService = new AuthService(userRepository, storageRepository)
    app.setService('auth', authService)
  })

  o('ログインに失敗したとき、エラーメッセージが表示されること', async () => {
    await userRepository.store(createUserData())
    const out = mq(Login, { app })

    out.setValue('#email', 'user@example.com')
    out.setValue('#password', 'wrong-password')
    out.trigger('form', 'submit')
    await nextTick(out)

    o(out.contains('認証に失敗しました')).equals(true)
  })

  o('ログインに成功したとき、ログインユーザーに設定され記事一覧画面へ遷移すること', async () => {
    m.route.set = o.spy()
    await userRepository.store(createUserData())

    const out = mq(Login, { app })
    out.setValue('#email', 'user@example.com')
    out.setValue('#password', 'password')
    out.trigger('form', 'submit')
    await nextTick(out)

    o(app.getState('currentUser').name).equals('ユーザー名')
    o(m.route.set.args[0]).equals('/posts')
  })
})
