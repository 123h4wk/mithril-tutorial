import m from 'mithril'

export default class PostRepositoryHttp {
  static #BASE_URL = 'http://localhost:3000'

  async findAll () {
    return await m.request({
      method: 'GET',
      url: `${PostRepositoryHttp.#BASE_URL}/posts`
    })
  }

  async findById (postId) {
    return await m.request({
      method: 'GET',
      url: `${PostRepositoryHttp.#BASE_URL}/posts/${postId}`
    })
  }

  async store ({ title, body, author }) {
    const id = globalThis.crypto.randomUUID()

    await m.request({
      method: 'POST',
      url: `${PostRepositoryHttp.#BASE_URL}/posts`,
      body: { id, title, body, author }
    })

    return id
  }

  async update ({ id, title, body }) {
    await m.request({
      method: 'PATCH',
      url: `${PostRepositoryHttp.#BASE_URL}/posts/${id}`,
      body: {
        title,
        body
      }
    })
  }

  async removeById (postId) {
    await m.request({
      method: 'DELETE',
      url: `${PostRepositoryHttp.#BASE_URL}/posts/${postId}`
    })
  }
}
