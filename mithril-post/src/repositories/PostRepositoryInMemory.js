export default class PostRepositoryInMemory {
  #data = []

  async findAll () {
    return this.#data
  }

  async findById (postId) {
    return this.#data.find(it => it.id === postId)
  }

  async store ({ title, body, author }) {
    const id = globalThis.crypto.randomUUID()

    this.#data.push({ id, title, body, author })

    return id
  }

  async update ({ id, title, body }) {
    const targetPost = this.#data.find(it => it.id === id)
    targetPost.title = title
    targetPost.body = body
  }

  async removeById (postId) {
    const targetIndex = this.#data.findIndex(it => it.id === postId)
    this.#data.splice(targetIndex, 1)
  }
}
