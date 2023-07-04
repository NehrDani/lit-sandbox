import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import './lit-dropdown'

@customElement('lit-app')
export class LitApp extends LitElement {
  @state()
  active: string | undefined

  static styles = css`
    :host {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    ul {
      list-style: none;
      padding: 8px 0;
      margin: 0;
      background-color: #eaddff;
      border-radius: 8px;
      border: 1px solid #21005d;
    }
    li {
      box-sizing: border-box;
    }
    a {
      display: flex;
      padding: 4px 8px;
      white-space: nowrap;
      text-decoration: none;
      color: #21005d;
    }
    a:hover {
      background-color: #ffffff;
      color: #6750a4;
    }
    a.active {
      background-color: #6750a4;
      color: #ffffff;
    }
    hr {
      border-top: 1px solid #21005d;
    }
  `

  render() {
    return html`<span>Selected: ${this.active}</span>
      <lit-dropdown title="My dropdown" position="right">
        <ul>
          <li>
            <a
              href="#"
              data-value="a"
              class=${classMap({ active: this.active === 'a' })}
              @click=${this.onSelect}
              >Item A</a
            >
          </li>
          <li>
            <a
              href="#"
              data-value="b"
              class=${classMap({ active: this.active === 'b' })}
              @click=${this.onSelect}
              >Item B</a
            >
          </li>
          <li>
            <hr />
          </li>
          <li>
            <a
              href="#"
              data-value="c"
              class=${classMap({ active: this.active === 'c' })}
              @click=${this.onSelect}
              >Item C</a
            >
          </li>
        </ul>
      </lit-dropdown>`
  }

  onSelect(e: MouseEvent) {
    const value = (e.target as HTMLLinkElement).dataset.value
    this.active = value
  }
}
