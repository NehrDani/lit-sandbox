import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('lit-dropdown')
export class LitDropdown extends LitElement {
  @property({ type: Boolean })
  render() {
    return html`<div>
      <button>Click me</button>
    </div>`
  }
}
