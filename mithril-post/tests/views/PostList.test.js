import o from 'ospec'
import mq from 'mithril-query'
import PostRepositoryInMemory from '../../src/repositories/PostRepositoryInMemory.js'
import PostService from '../../src/services/PostService.js'
import PostList from '../../src/views/PostList.js'
import Application from '../../src/Application.js'
import { nextTick } from '../helper.js'

o.spec('PostList', () => {
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
    const out = mq(PostList, { app })

    o(out.contains('読み込み中')).equals(true)
  })

  o('記事が存在しないとき、存在しない旨のメッセージが表示されること', async () => {
    const out = mq(PostList, { app })

    await nextTick(out)

    o(out.contains('記事が投稿されていません。')).equals(true)
  })

  o('記事が存在するとき、記事一覧が取得できること', async () => {
    await postRepository.store({
      title: '最初の記事',
      body: '本文',
      author: {
        name: 'テストユーザー',
        email: 'test-user@example.com'
      }
    })

    const out = mq(PostList, { app })
    await nextTick(out)

    o(out.contains('最初の記事')).equals(true)
  })
})
