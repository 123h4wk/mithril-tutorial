import o from 'ospec'
import m from 'mithril'
import mq from 'mithril-query'
import PostRepositoryInMemory from '../../src/repositories/PostRepositoryInMemory.js'
import PostService from '../../src/services/PostService.js'
import PostForm from '../../src/views/PostForm.js'
import Application from '../../src/Application.js'
import { createCurrentUser, nextTick } from '../helper.js'

o.spec('PostForm', () => {
  o('記事が作成され、記事詳細画面へ遷移すること', async () => {
    m.route.set = o.spy()
    const app = new Application()
    const postRepository = new PostRepositoryInMemory()
    const postService = new PostService(postRepository)
    app.setService('post', postService)
    app.setState('currentUser', createCurrentUser())

    const out = mq(PostForm, { app })
    out.setValue('#post-title', '新規作成するタイトル')
    out.setValue('#post-body', '新規作成する本文')
    out.trigger('form', 'submit')
    await nextTick(out)

    const post = (await postService.fetchCollection()).items[0]
    o(post.title).equals('新規作成するタイトル')`入力した値でタイトルが作成されていること`
    o(post.body).equals('新規作成する本文')`入力した値で本文が作成されていること`
    o(m.route.set.args[0]).equals(`/posts/${post.id}`)`詳細画面へ遷移すること`
  })

  o('記事が更新され、記事詳細画面へ遷移すること', async () => {
    m.route.set = o.spy()
    const app = new Application()
    const postRepository = new PostRepositoryInMemory()
    const id = await postRepository.store({
      title: '保存済みタイトル',
      body: '保存済み本文',
      author: {
        name: 'test-user',
        email: 'test@example.com'
      }
    })
    const postService = new PostService(postRepository)
    app.setService('post', postService)
    app.setState('currentUser', createCurrentUser())

    const out = mq(PostForm, { app, id })
    await nextTick(out)
    out.setValue('#post-body', '保存済みタイトル更新')
    out.trigger('form', 'submit')
    await nextTick(out)

    const post = (await postService.fetchCollection()).items[0]
    o(post.title).equals('保存済みタイトル')
    o(post.body).equals('保存済みタイトル更新')
    o(m.route.set.args[0]).equals(`/posts/${post.id}`)
  })
})
