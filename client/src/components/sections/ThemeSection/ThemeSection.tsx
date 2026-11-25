import CheckboxField from "@components/composites/CheckboxField"
import RadioField from "@components/composites/RadioField"
import Button from "@components/elements/Button"

import s from "./ThemeSection.module.css"

// Temporary: scratch space for testing component theming
export default function ThemeSection() {
  return (
    <section className={s.themeSection}>
      <div className={s.content}>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>

        <hr />

        <p>
          Paragraph with <a href="#theme">a link</a>, <strong>strong</strong>, <em>emphasis</em>,{" "}
          <small>small</small>, <mark>mark</mark>, <del>deleted</del>, <ins>inserted</ins>,{" "}
          <abbr title="Abbreviation">abbr</abbr>, H<sub>2</sub>O, x<sup>2</sup>, <code>inline code</code> and{" "}
          <kbd>Ctrl</kbd>.
        </p>

        <blockquote>
          <p>Blockquote text.</p>
          <cite>Citation</cite>
        </blockquote>

        <pre>
          <code>{"const preformatted = true"}</code>
        </pre>

        <ul>
          <li>Unordered item</li>
          <li>Another item</li>
        </ul>

        <ol>
          <li>Ordered item</li>
          <li>Another item</li>
        </ol>

        <dl>
          <dt>Term</dt>
          <dd>Description</dd>
        </dl>

        <table>
          <caption>Table caption</caption>
          <thead>
            <tr>
              <th scope="col">Column A</th>
              <th scope="col">Column B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
            </tr>
          </tbody>
        </table>

        <fieldset>
          <legend>Form elements</legend>
          <label>
            Text input
            <input type="text" placeholder="Placeholder" />
          </label>
          <label>
            Select
            <select>
              <option>Option one</option>
              <option>Option two</option>
            </select>
          </label>
          <label>
            Textarea
            <textarea placeholder="Placeholder" />
          </label>
          
          <CheckboxField label="Checkbox" defaultChecked />
          <RadioField label="Radio one" name="theme-radio" value="one" defaultChecked />
          <RadioField label="Radio two" name="theme-radio" value="two" />
        </fieldset>

        <h2>Button component</h2>
        <div className={s.buttons}>
          <Button className={s.button}>Themed</Button>
          <Button className={s.button} disabled>
            Disabled
          </Button>
          <Button>Unstyled</Button>
        </div>
      </div>
    </section>
  )
}
