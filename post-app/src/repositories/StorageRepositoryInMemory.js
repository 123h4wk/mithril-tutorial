export default class StorageRepositoryInMemory {
  #data = new Map()

  async retrieve (key) {
    return this.#data.get(key)
  }

  async store (key, value) {
    this.#data.set(key, value)
  }

  async destroy (key) {
    this.#data.delete(key)
  }
}
