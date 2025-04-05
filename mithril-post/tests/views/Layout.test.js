import o from 'ospec'
import m from 'mithril'
import mq from 'mithril-query'
import UserRepositoryInMemory from '../../src/repositories/UserRepositoryInMemory.js'
import StorageRepositoryInMemory from '../../src/repositories/StorageRepositoryInMemory.js'
import AuthService from '../../src/services/AuthService.js'
import Layout from '../../src/views/Layout.js'
import Application from '../../src/Application.js'
import { createCurrentUser, nextTick } from '../helper.js'

o.spec('Layout', () => {
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

  o('ログインしていないとき、ログインとユーザー登録が表示されること', () => {
    const out = mq(Layout, { app })

    o(out.contains('ログイン')).equals(true)
    o(out.contains('ユーザー登録')).equals(true)
  })

  o('ログインしているとき、ユーザー名とログアウトが表示されること', () => {
    app.setState('currentUser', createCurrentUser())

    const out = mq(Layout, { app })

    o(out.contains('ログインユーザー')).equals(true)
    o(out.contains('ログアウト')).equals(true)
  })

  o('ログアウトボタンを押すと、ログインユーザーがnullになり、ログイン画面へ遷移すること', async () => {
    m.route.set = o.spy()
    app.setState('currentUser', createCurrentUser())

    const out = mq(Layout, { app })
    out.click('button')
    await nextTick(out)

    o(app.getState('currentUser')).equals(null)
    o(m.route.set.args[0]).equals('/login')
  })
})
