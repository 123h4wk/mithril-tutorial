import User from './User.js'

export default class Post {
  static from (data) {
    const post = new Post()
    post.id = data.id
    post.title = data.title
    post.body = data.body
    post.created = new Date(data.created)
    post.updated = new Date(data.updated)
    post.author = new User()
    post.author.id = data.author.id
    post.author.name = data.author.name
    post.author.email = data.author.email
    return post
  }

  constructor () {
    this.id = null
    this.title = ''
    this.body = ''
    this.created = new Date()
    this.updated = new Date()
    this.author = null
  }

  createdBy (user) {
    return this.author?.id === user.id
  }
}
