import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'Router',
})
export default class Router extends Vue {
  render(h: Vue.CreateElement): Vue.VNode {
    return (
      <div>
        <div>
          <h1>
            This is an example of a Nuxt route / URL path
          </h1>
        </div>
      </div>
    )
  }
}
