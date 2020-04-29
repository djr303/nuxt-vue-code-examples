import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Logo from '../components/Logo';
import HelloWorld from '../components/HelloWorld'
import './index.scss'

@Component({
  name: 'App',
  components: { Logo, HelloWorld }
})
export default class App extends Vue {
  render(h: Vue.CreateElement): Vue.VNode {
    return (
      <div class='container'>
        <div>
          <Logo />
          <h1 class='title'>
            Nuxt / Vue project architecture and code examples
          </h1>
          <HelloWorld name='Basebone' />
        </div>
      </div>
    )
  }
}
