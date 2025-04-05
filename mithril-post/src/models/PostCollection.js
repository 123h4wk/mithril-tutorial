import Post from './Post.js'

export default class PostCollection {
  static from (data) {
    return new PostCollection(data.map(Post.from))
  }

  #items = []

  constructor (posts) {
    this.#items = posts
  }

  get items () {
    return this.#items
  }

  isEmpty () {
    return this.items.length === 0
  }
}
