
import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { Button } from 'preact-mdl'
import { fetchInitialData } from '../actions'

class CreateDashboard extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchInitialData('create-dashboard'))
  }

  render() {
    return (
      <h1>Create Dashboard</h1>
    )
  }

}

export default connect()(CreateDashboard)
