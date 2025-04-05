import User from '../src/models/User.js'

export function nextTick (out, waitTime = 10) {
  return new Promise(resolve => {
    setTimeout(() => {
      out.redraw()
      resolve()
    }, waitTime)
  })
}

export function createCurrentUser () {
  const currentUser = new User()
  currentUser.id = 'current-user-id'
  currentUser.email = 'current-user@example.com'
  currentUser.name = 'ログインユーザー'

  return currentUser
}
