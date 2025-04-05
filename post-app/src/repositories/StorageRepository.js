export default class StorageRepository {
  async retrieve (key) {
    return window.localStorage.getItem(key)
  }

  async store (key, value) {
    window.localStorage.setItem(key, value)
  }

  async destroy (key) {
    window.localStorage.removeItem(key)
  }
}
