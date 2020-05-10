import { State } from '../types/store'

const state = (): State => ({
  counter: 0,
  users: []
})

export default state