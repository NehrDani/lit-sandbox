import { LitElement, PropertyValueMap, PropertyValues, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

type Position = 'right' | 'left' | 'top' | 'bottom'

@customElement('lit-dropdown')
export class LitDropdown extends LitElement {
  @state()
  visible = false
  @property()
  title = 'dropdown'
  @property()
  position: Position = 'right'

  static styles = css`
    :host {
      position: relative;
    }
    div {
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }
    div.visible {
      opacity: 1;
      visibility: visible;
    }
    button {
      display: flex;
      align-items: center;
      border: none;
      border-radius: 8px;
      background-color: #6750a4;
      color: #ffffff;
      padding: 8 16;
      font-size: 16px;
    }
    button::after {
      content: '';
      margin-left: 4px;
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-bottom: 0;
      border-left: 0.3em solid transparent;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('click', this.onClickOutside)
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this.onClickOutside)
  }

  render() {
    const position = this.getPosition()

    return html`
      <button @click=${this.toggle}>${this.title}</button>
      <div
        class=${classMap({ visible: this.visible })}
        style=${styleMap(position)}
      >
        <slot @click=${this.toggle}></slot>
      </div>
    `
  }

  toggle() {
    this.visible = !this.visible
  }

  onClickOutside = (e: MouseEvent) => {
    if (!e.composedPath().includes(this)) {
      this.visible = false
    }
  }

  getPosition() {
    const container = this.getBoundingClientRect()
    const element = this.shadowRoot
      ?.querySelector('div')
      ?.getBoundingClientRect()

    if (this.position === 'left') {
      return { top: 0, left: `-${element?.width ?? 0}px` }
    }
    if (this.position === 'top') {
      return { top: `-${element?.height ?? 0}px`, left: 0 }
    }
    if (this.position === 'bottom') {
      return { top: `${container.height}px`, left: 0 }
    }
    return { top: 0, left: `${container.width}px` }
  }
}
