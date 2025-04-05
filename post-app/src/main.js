import UserRepository from './repositories/UserRepository.js'
import StorageRepository from './repositories/StorageRepository.js'
import PostRepository from './repositories/PostRepository.js'
import UserService from './services/UserService.js'
import PostService from './services/PostService.js'
import AuthService from './services/AuthService.js'
import Application from './Application.js'

const userRepository = new UserRepository()
const storageRepository = new StorageRepository()
const postRepository = new PostRepository()

const userService = new UserService(userRepository)
const authService = new AuthService(userRepository, storageRepository)
const postService = new PostService(postRepository)

authService.detectCurrentUser().then((currentUser) => {
  const application = new Application()
  application.setService('user', userService)
  application.setService('auth', authService)
  application.setService('post', postService)
  application.setState('currentUser', currentUser)
  application.start(document.getElementById('app'))
})
