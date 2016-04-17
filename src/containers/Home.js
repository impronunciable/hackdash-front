
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import { connect } from 'react-redux'
import { fetchInitialData } from '../actions'

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchInitialData('home'))
  }

  render({ dashboards }) {
    return (
      <div>
        <h1>HackDash</h1>
        <ul>
          {dashboards.map((dashboard, i) => (
            <li key={i}>
              <Link href={`/dashboards/${dashboard.domain}`}>{dashboard.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ dashboards }) => ({ dashboards })
export default connect(mapStateToProps)(Home)
