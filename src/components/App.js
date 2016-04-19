
import { h } from 'preact'
import { Router, Route } from 'preact-router'
import Header from '../containers/Header'
import Home from '../containers/Home'
import Dashboard from '../containers/Dashboard'
import CreateDashboard from '../containers/CreateDashboard'
import Project from '../containers/Project'

export default ({ url }) => (
  <div style={styles.body}>
    <Header />
    <Router url={url}>
      <Home path="/" />
      <CreateDashboard path="/dashboards/create" />
      <Dashboard path="/dashboards/:dashboardId" />
      <Project path="/projects/:projectId" />
    </Router>
  </div>
)

const styles = {
  body: {
    fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif;`
  }
}
