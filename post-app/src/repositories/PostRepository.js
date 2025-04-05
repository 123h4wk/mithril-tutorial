export default class PostRepository {
  static #STORAGE_KEY = 'post-data'

  async #retrievePostData () {
    const data = window.localStorage.getItem(PostRepository.#STORAGE_KEY)
    return data ? JSON.parse(data) : []
  }

  async #storePostData (postData) {
    const data = JSON.stringify(postData)
    window.localStorage.setItem(PostRepository.#STORAGE_KEY, data)
  }

  async findAll () {
    return await this.#retrievePostData()
  }

  async findById (postId) {
    const postData = await this.#retrievePostData()
    return postData.find(it => it.id === postId)
  }

  async store ({ title, body, author }) {
    const id = globalThis.crypto.randomUUID()

    const postData = await this.#retrievePostData()
    postData.push({ id, title, body, author })
    await this.#storePostData(postData)

    return id
  }

  async update ({ id, title, body }) {
    const postData = await this.#retrievePostData()
    const targetPost = postData.find(it => it.id === id)
    targetPost.title = title
    targetPost.body = body
    this.#storePostData(postData)
  }

  async removeById (postId) {
    const postData = await this.#retrievePostData()
    const targetIndex = postData.findIndex(it => it.id === postId)
    postData.splice(targetIndex, 1)
    this.#storePostData(postData)
  }
}
