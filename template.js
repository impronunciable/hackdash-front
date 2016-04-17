
import render from 'preact-render-to-string'

export default (rootComponent, initialState) =>
  `
  <!doctype html>
  <html>
    <head>
      <title>HackDash</title>
    </head>
    <body>
      <div id="root">${render(rootComponent)}</div>
      <script>window.__state__ = ${JSON.stringify(initialState)};</script>
      <script src="/frontend.js"></script>
    </body>
  </html>`
