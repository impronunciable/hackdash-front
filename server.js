
import { h } from 'preact'
import express from 'express'
import configStore from './src/store'
import { Provider } from 'react-redux'
import template from './template'
import App from './src/components/App'
import { fetchInitialData } from './src/actions'

const app = express()

app.use(express.static('public'))

const render = (req, res) => {
  const rootComponent =  (
    <Provider store={req.store}>
      <App url={req.url} />
    </Provider>
  )
  const initialState = req.store.getState()
  const html = template(rootComponent, initialState)
  res.send(html)
}

const fetchData = (page, ...args) => {
  return (req, res, next) => {
    const store = req.store = configStore()
    const unsubscribe = store.subscribe(() => {
      if (store.getState().serverReady) {
        unsubscribe()
        next()
      }
    })
    const newArgs = args.map(arg => req[arg[0]][arg[1]])
    store.dispatch(fetchInitialData(page, ...newArgs))
  }
}

app.get('/', fetchData('home'), render)
app.get('/dashboards/:dashboardId', fetchData('dashboard', ['params', 'dashboardId']), render)
app.get('*', (req, res) => res.status(404).send('Not found'))

app.listen(3000)
