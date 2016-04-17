
import PreactRouter from 'preact-router'

export default class Router extends PreactRouter {
  constructor(props) {
    super(props)
    super.componentWillMount()
  }

  getInitialState() {
    const state = super.getInitialState()
    state.url = state.url || this.props.url
    return state
  }
}
