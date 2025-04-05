import m from 'mithril'
import PostList from './views/PostList.js'
import Layout from './views/Layout.js'
import UserRegister from './views/UserRegister.js'
import Login from './views/Login.js'
import PostDetail from './views/PostDetail.js'
import PostForm from './views/PostForm.js'

export default class Application {
  static #DEFAULT_ROUTE = '/posts'

  #services = new Map()
  #state = new Map()

  #getRoutes () {
    const privateRoute = (ViewComponent) => {
      return () => {
        if (this.getState('currentUser')) {
          return ViewComponent
        } else {
          m.route.set('/login')
          return null
        }
      }
    }
    const publicRoute = (ViewComponent) => {
      return () => ViewComponent
    }
    const withLayout = (vnode) => {
      vnode.attrs.app = this
      return m(Layout, { app: this }, vnode)
    }

    return {
      '/posts': {
        onmatch: privateRoute(PostList),
        render: withLayout
      },
      '/posts/new': {
        onmatch: privateRoute(PostForm),
        render: withLayout
      },
      '/posts/:id': { 
        onmatch: privateRoute(PostDetail),
        render: withLayout
      },
      '/posts/:id/edit': {
        onmatch: privateRoute(PostForm),
        render: withLayout
      },
      '/register': {
        onmatch: publicRoute(UserRegister),
        render: withLayout
      },
      '/login': {
        onmatch: publicRoute(Login),
        render: withLayout
      }
    }
  }

  getService (serviceKey) {
    return this.#services.get(serviceKey)
  }

  setService (serviceKey, service) {
    this.#services.set(serviceKey, service)
  }

  getState (stateKey) {
    return this.#state.get(stateKey)
  }

  setState (stateKey, value) {
    return this.#state.set(stateKey, value)
  }

  start (mountElement) {
    m.route(mountElement, Application.#DEFAULT_ROUTE, this.#getRoutes())
  }
}
