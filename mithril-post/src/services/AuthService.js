import User from '../models/User.js'

export default class AuthService {
  static #CURRENT_USER_ID_KEY = 'current-user-id'

  #userRepository
  #storageRepository

  constructor (userRepository, storageRepository) {
    this.#userRepository = userRepository
    this.#storageRepository = storageRepository
  }

  async detectCurrentUser () {
    const currentUserId =
      await this.#storageRepository.retrieve(AuthService.#CURRENT_USER_ID_KEY)
    const userRawData = await this.#userRepository.findById(currentUserId)
    return userRawData ? User.from(userRawData) : null
  }

  async login (email, password) {
    const userRawData = await this.#userRepository.findByEmail(email)
    if (!userRawData || userRawData.password !== password) {
      return null
    }
    await this.#storageRepository.store(
      AuthService.#CURRENT_USER_ID_KEY,
      userRawData.id
    )
    return User.from(userRawData)
  }

  async logout () {
    await this.#storageRepository.destroy(AuthService.#CURRENT_USER_ID_KEY)
  }
}
