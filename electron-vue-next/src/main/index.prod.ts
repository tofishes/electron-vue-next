/**
  * Set `__static` path to static files in production
  * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
  */
global.__static = require('path').join(__dirname, './static').replace(/\\\\/g, '\\\\\\\\')
const { pathToFileURL } = require('url')
global.__windowUrls = new Proxy({}, {
  get(_, page) {
    return pathToFileURL(require('path').join(__dirname, `./renderer/${page.toString()}.html`)).href
  }
})
global.__preloads = new Proxy({}, {
  get(_, name) {
    return require('path').join(__dirname, `./${name.toString()}.preload.js`).replace(/\\\\/g, '\\\\\\\\')
  }
})
global.__workers = new Proxy({}, {
  get(_, name) {
    return require('path').join(__dirname, `./${name.toString()}.worker.js`).replace(/\\\\/g, '\\\\\\\\')
  }
})

// eslint-disable-next-line import/first
import './index'
