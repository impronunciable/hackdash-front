
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import { connect } from 'preact-redux'
import { fetchInitialData } from '../actions'

class Project extends Component {
  componentDidMount() {
    const { dispatch, matches } = this.props
    dispatch(fetchInitialData('project', matches.projectId))
  }

  render({ project }) {
    if(!project) return ('')
    return (
      <div>
        <div style={styles.hero}>
          <h1>{project.title}</h1>
        </div>
      </div>
    )
  }
}

const styles = {
  hero: {
    textAlign: 'center'
  }
}

const mapStateToProps = ({ project }) => ({ project })
export default connect(mapStateToProps)(Project)
