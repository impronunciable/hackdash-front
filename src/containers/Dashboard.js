
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import { connect } from 'preact-redux'
import { fetchInitialData } from '../actions'
import ProjectCard from '../components/ProjectCard.js'

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch, matches } = this.props
    dispatch(fetchInitialData('dashboard', matches.dashboardId))
  }

  render({ projects, dashboard }) {
    if(!dashboard) return ('')
    return (
      <div>
        <div style={styles.hero}>
          <h1>{dashboard.title}</h1>
        </div>
        <div style={styles.projects}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} domain={dashboard.domain} />
          ))}
        </div>
      </div>
    )
  }
}

const styles = {
  hero: {
    textAlign: 'center'
  },
  projects: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
}

const mapStateToProps = ({ projects, dashboard }) => ({ projects, dashboard })
export default connect(mapStateToProps)(Dashboard)
