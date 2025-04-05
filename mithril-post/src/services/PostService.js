import Post from '../models/Post.js'
import PostCollection from '../models/PostCollection.js'

export default class PostService {
  #postRepository

  constructor (postRepository) {
    this.#postRepository = postRepository
  }

  async fetchCollection () {
    const postRawDataList = await this.#postRepository.findAll()
    return PostCollection.from(postRawDataList)
  }

  async fetchById (postId) {
    const rawData = await this.#postRepository.findById(postId)
    return rawData ? Post.from(rawData) : null
  }

  async create ({ title, body, author }) {
    return await this.#postRepository.store({
      title,
      body,
      author
    })
  }

  async update ({ id, title, body }) {
    await this.#postRepository.update({ id, title, body })
  }

  async removeById (postId) {
    await this.#postRepository.removeById(postId)
  }
}
