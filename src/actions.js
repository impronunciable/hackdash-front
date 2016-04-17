
import request from 'axios'

let mounted = false
export const fetchInitialData = (page, ...args) => {
  if (!mounted && typeof window !== 'undefined') {
    mounted = true
    return instantDispatch
  } else {
    return fetchInitial[page] ? fetchInitial[page](...args) : instantDispatch
  }
}

export const fetchDashboard = (dashboardId) => dispatch => {
  dispatch(requestDashboard(dashboardId))
  return request(`https://hackdash.org/api/v2/${dashboardId}/projects`)
    .then(res => dispatch(receiveDashboard(dashboardId, res.data)))
    .then(() => dispatch(serverReady()))
}

function requestDashboard(dashboardId) {
  return {
    type: 'REQUEST_DASHBOARD',
    dashboardId
  }
}

function receiveDashboard(dashboardId, projects) {
  return {
    type: 'RECEIVE_DASHBOARD',
    dashboardId,
    projects
  }
}

function serverReady() {
  return {
    type: 'SERVER_READY',
    serverReady: true
  }
}

function requestDashboards(dashboardId) {
  return {
    type: 'REQUEST_DASHBOARDS'
  }
}

function receiveDashboards(dashboards) {
  return {
    type: 'RECEIVE_DASHBOARDS',
    dashboards
  }
}

export const fetchDashboards = () => dispatch => {
  dispatch(requestDashboards())
  return request(`https://hackdash.org/api/v2/dashboards`)
    .then(res => dispatch(receiveDashboards(res.data)))
    .then(() => dispatch(serverReady()))
}

const instantDispatch = dispatch => dispatch({type: 'SERVER_READY'})

const fetchInitial = {
  dashboard: fetchDashboard,
  home: fetchDashboards
}
