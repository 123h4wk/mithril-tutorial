export default class UserService {
  #userRepository

  constructor (userRepository) {
    this.#userRepository = userRepository
  }

  async create (email, name, password) {
    await this.#userRepository.store({
      email,
      name,
      password
    })
  }
}
