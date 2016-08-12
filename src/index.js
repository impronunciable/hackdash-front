
import { h, render } from 'preact'
import { Provider } from 'preact-redux'
import App from './components/App'
import configStore from './store'

const store = configStore(__state__)

const root = document.getElementById('root')
render(
  <Provider store={store}>
    <App client={true} />
  </Provider>, root, root.lastChild)
