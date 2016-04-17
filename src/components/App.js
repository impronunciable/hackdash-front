
import { h } from 'preact'
import Router from '../Router'
import { Route } from 'preact-router'
import Home from '../containers/Home'
import Dashboard from '../containers/Dashboard'

export default ({ url, client = false }) => (
  <Router url={url} client={client}>
    <Home path="/" />
    <Dashboard path="/dashboards/:dashboardId" />
  </Router>
)
