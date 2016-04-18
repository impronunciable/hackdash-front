
import { h } from 'preact'
import Router from '../Router'
import { Route } from 'preact-router'
import Header from '../containers/Header'
import Home from '../containers/Home'
import Dashboard from '../containers/Dashboard'
import CreateDashboard from '../containers/CreateDashboard'

export default ({ url, client = false }) => (
  <div style={styles.body}>
    <Header />
    <Router url={url} client={client}>
      <Home path="/" />
      <CreateDashboard path="/dashboards/create" />
      <Dashboard path="/dashboards/:dashboardId" />
    </Router>
  </div>
)

const styles = {
  body: {
    fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif;`
  }
}
