import { State, User } from '../types/store/index'
import { INCREMENT, GET_USER } from './constants'

const mutations = {
  [INCREMENT] (state: State) {
    state.counter = state.counter + 1
  },
  [GET_USER] (state: State, users: User[]) {
    state.users = users
  }
}

export default mutations
