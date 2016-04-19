
import render from 'preact-render-to-string'

export default (rootComponent, initialState) =>
  `
  <!doctype html>
  <html>
    <head>
      <title>HackDash</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>html, body { margin: 0; padding: 0; }</style>
    </head>
    <body>
      <div id="root">${render(rootComponent)}</div>
      <script>window.__state__ = ${JSON.stringify(initialState)};</script>
      <script src="/frontend.js"></script>
    </body>
  </html>`
