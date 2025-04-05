export default class UserRepository {
  static #STORAGE_KEY = 'user-data'

  async #retrieveRawDataList () {
    const data = window.localStorage.getItem(UserRepository.#STORAGE_KEY)
    return data ? JSON.parse(data) : []
  }

  async #storeUserRawData (userRawData) {
    const userData = await this.#retrieveRawDataList()
    userData.push(userRawData)
    window.localStorage.setItem(UserRepository.#STORAGE_KEY, JSON.stringify(userData))
  }

  async findById (userId) {
    const userDataList = await this.#retrieveRawDataList()
    return userDataList.find(it => it.id === userId)
  }

  async findByEmail (email) {
    const userDataList = await this.#retrieveRawDataList()
    return userDataList.find(it => it.email === email)
  }

  async store ({ email, name, password }) {
    await this.#storeUserRawData({
      id: globalThis.crypto.randomUUID(),
      email,
      name,
      password
    })
  }
}
