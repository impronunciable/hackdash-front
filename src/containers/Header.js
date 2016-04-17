
import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { Link } from 'preact-router'

class Header extends Component {
  render() {
    return (
      <div style={styles.header}>
        <Link href='/'><img style={styles.logo} src='/images/logo.png' /></Link>
        <nav style={styles.navigation}>
          <Link style={styles.navigation.link} href='/dashboards/create'>New Dashboard</Link>
        </nav>
      </div>
    )
  }
}

const styles = {
  header: {
    height: 75,
    maxWidth: 800,
    margin: '0 auto',
    paddingTop: 15
  },
  logo: {
    display: 'inline-block',
    height: 75
  },
  navigation: {
    display: 'inline-block',
    float: 'right',
    listStyle: 'none',
    paddingTop: 10,
    link: {
      background: '#546E7A',
      display: 'inline-block',
      padding: 10,
      color: '#ECEFF1',
      textDecoration: 'none',
      borderRadius: 4
    }
  }
}

export default Header
