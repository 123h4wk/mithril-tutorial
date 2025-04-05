export default class UserRepositoryInMemory {
  #data = []

  async findById (userId) {
    return this.#data.find(it => it.id === userId)
  }

  async findByEmail (email) {
    return this.#data.find(it => it.email === email)
  }

  async store ({ email, name, password }) {
    this.#data.push({
      id: globalThis.crypto.randomUUID(),
      email,
      name,
      password
    })
  }
}
