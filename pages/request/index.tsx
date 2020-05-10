import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Component, Prop } from 'vue-property-decorator'
import { State, User } from '../../types/store'
import { GET_USER } from '../../store/constants'
import './index.scss'

@Component({
  name: 'Request',
  computed: mapState<State>({
    users: (state: State) => state.users
  }),
  methods: mapActions([GET_USER])
})
export default class Counter extends Vue {

  private users!: User[]

  [GET_USER]: () => void

  render(h: Vue.CreateElement): Vue.VNode {
    return (
      <div>
        <div>
          <h1>
            { !!this.users.length ? this.users[0].username : 'No user available'}
          </h1>
          <h2>
            <a class='link' onClick={() => this[GET_USER]()}>Get users!</a>
          </h2>
        </div>
      </div>
    )
  }
}
