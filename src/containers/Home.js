
import { h, Component } from 'preact'
import { connect } from 'react-redux'
import DashboardCard from '../components/DashboardCard'
import { fetchInitialData, fetchDashboards } from '../actions'
import { debounce } from '../utils'

class Home extends Component {
  constructor() {
    super()
    this.value = ''
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchInitialData('home'))
  }

  onSearchUpdate(event) {
    const { dispatch } = this.props
    const value = event.target.value
    if (value.length >= 3) {
      dispatch(fetchDashboards(value))
    } else if (this.value.length >= 3) {
      dispatch(fetchDashboards())
    }
    this.value = value
  }

  render({ dashboards }) {
    return (
      <div>
        <div style={styles.hero}>
          <h1 style={styles.hero.title}>Manage your Hackathon</h1>
          <h2 style={styles.hero.subtitle}>Organize and showcase the projects, know who is participating</h2>
          <span style={styles.search}>
            <input style={styles.search.input} onKeyUp={debounce(this.onSearchUpdate.bind(this))} placeholder='Search' />
          </span>
        </div>
        <div style={styles.dashboards}>
          {dashboards.map((dashboard, i) => (
            <DashboardCard key={i} dashboard={dashboard} />
          ))}
        </div>
      </div>
    )
  }
}

const styles = {
  hero: {
    textAlign: 'center',
    paddingTop: 50,
    fontSize: '1.2em',
    title: {
      color: '#607D8B',
      marginBottom: 0
    },
    subtitle: {
      color: '#B0BEC5',
      fontWeight: 'normal',
      marginBottom: 60
    }
  },
  search: {
    display: 'inline-block',
    height: 30,
    width: 300,
    border: '1px solid #B0BEC5',
    padding: 5,
    borderRadius: 4,
    background: '#fff',
    input: {
      height: '100%',
      width: '100%',
      border: 0,
      padding: 3,
      marginTop: -3,
      marginLeft: -3,
      fontSize: 16
    }
  },
  dashboards: {
    background: '#455A64',
    marginTop: -20,
    paddingTop: 70,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minHeight: 400
  }
}

const mapStateToProps = ({ dashboards }) => ({ dashboards })
export default connect(mapStateToProps)(Home)
