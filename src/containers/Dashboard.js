
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import { connect } from 'react-redux'
import { fetchInitialData } from '../actions'

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch, matches } = this.props
    dispatch(fetchInitialData('dashboard', matches.dashboardId))
  }

  render({ projects }) {
    return (
      <div>
        <h1>Dashboard</h1>
        <Link href='/'>Home</Link>
        <ul>
        {projects.map((project, i) => (
          <li key={i}>{project.title}</li>
        ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ projects }) => ({ projects })
export default connect(mapStateToProps)(Dashboard)
