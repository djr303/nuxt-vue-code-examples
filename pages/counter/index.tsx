import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Component, Prop } from 'vue-property-decorator'
import { State } from '../../types/store'
import { INCREMENT } from '../../store/constants'

@Component({
  name: 'Counter',
  computed: mapState<State>({
    counter: (state: State) => state.counter
  }),
  methods: mapActions([INCREMENT])
})
export default class Counter extends Vue {

  @Prop() readonly counter!: number

  [INCREMENT]: () => void

  render(h: Vue.CreateElement): Vue.VNode {
    return (
      <div>
        <div>
          <h1>
            This is the current count {this.counter}
          </h1>
          <h2>
            <a onClick={() => this[INCREMENT]()}>Increase the count click here</a>
          </h2>
        </div>
      </div>
    )
  }
}
