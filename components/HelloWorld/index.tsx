import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import './index.scss'

@Component({
  name: 'HelloWorld',
})
export default class HelloWorld extends Vue {
  @Prop({ default: 'TypeScript!'}) readonly name!: string
  message: string = 'Hello'
  render(h: Vue.CreateElement): Vue.VNode{
    return (
      <div class='message'>
        <h2>{this.message} {this.name}</h2>
      </div>
    )
  }
}
