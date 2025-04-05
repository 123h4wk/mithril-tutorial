export default class User {
  static from (data) {
    const user = new User()
    user.id = data.id
    user.name = data.name
    user.email = data.email
    return user
  }

  constructor () {
    this.id = ''
    this.email = ''
    this.name = ''
  }
}
