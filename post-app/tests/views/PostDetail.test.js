import o from 'ospec'
import m from 'mithril'
import mq from 'mithril-query'
import PostRepositoryInMemory from '../../src/repositories/PostRepositoryInMemory.js'
import PostService from '../../src/services/PostService.js'
import PostDetail from '../../src/views/PostDetail.js'
import Application from '../../src/Application.js'
import { createCurrentUser, nextTick } from '../helper.js'

o.spec('PostDetail', () => {
  let app
  let postRepository
  let postService

  o.beforeEach(() => {
    app = new Application()
    postRepository = new PostRepositoryInMemory()
    postService = new PostService(postRepository)
    app.setService('post', postService)
  })

  o('初期描画時に読み込み中と表示されること', () => {
    const out = mq(PostDetail, { app, id: 'post-id' })

    o(out.contains('読み込み中')).equals(true)
  })

  o('記事詳細が表示されること', async () => {
    app.setState('currentUser', createCurrentUser())
    const id = await postRepository.store({
      title: '記事タイトル',
      body: '記事本文',
      author: {
        id: 'test-user',
        email: 'user@example.com',
        name: 'テストユーザー'
      }
    })

    const out = mq(PostDetail, { app, id })
    await nextTick(out)

    o(out.contains('記事タイトル')).equals(true)
    o(out.contains('記事本文')).equals(true)
    o(out.contains('テストユーザー')).equals(true)
  })

  o('記事が削除され、記事一覧画面へ遷移すること', async () => {
    m.route.set = o.spy()
    app.setState('currentUser', createCurrentUser())
    const id = await postRepository.store({
      title: '記事タイトル',
      body: '記事本文',
      author: {
        id: 'current-user-id',
        email: 'current-user@example.com',
        name: 'ログインユーザー'
      }
    })

    const out = mq(PostDetail, { app, id })
    await nextTick(out)
    out.click('button')
    await nextTick(out)

    o((await postRepository.findById(id)) == null).equals(true)
    o(m.route.set.args[0]).equals('/posts')
  })
})
