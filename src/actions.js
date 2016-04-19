
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
  return Promise.all([
    request(`https://hackdash.org/api/v2/dashboards/${dashboardId}`),
    request(`https://hackdash.org/api/v2/${dashboardId}/projects`)
  ])
  .then(res => dispatch(receiveDashboard(dashboardId, {dashboard: res[0].data, projects: res[1].data})))
  .then(() => dispatch(serverReady()))
}

function requestDashboard(dashboardId) {
  return {
    type: 'REQUEST_DASHBOARD',
    dashboardId
  }
}

function receiveDashboard(dashboardId, { dashboard, projects }) {
  return {
    type: 'RECEIVE_DASHBOARD',
    dashboardId,
    projects,
    dashboard
  }
}

export const fetchProject = (projectId) => dispatch => {
  dispatch(requestProject(projectId))
  return request(`https://hackdash.org/api/v2/projects/${projectId}`)
    .then(res => dispatch(receiveProject(projectId, res.data)))
    .then(() => dispatch(serverReady()))
}

function requestProject(projectId) {
  return {
    type: 'REQUEST_PROJECT',
    projectId
  }
}

function receiveProject(projectId, project) {
  return {
    type: 'RECEIVE_PROJECT',
    projectId,
    project
  }
}

function serverReady() {
  return {
    type: 'SERVER_READY',
    serverReady: true
  }
}

function requestDashboards(search) {
  return {
    type: 'REQUEST_DASHBOARDS',
    search
  }
}

function receiveDashboards(search, dashboards) {
  return {
    type: 'RECEIVE_DASHBOARDS',
    dashboards,
    search
  }
}

export const fetchDashboards = (search = '') => dispatch => {
  dispatch(requestDashboards(search))
  return request(`https://hackdash.org/api/v2/dashboards?q=${search}`)
    .then(res => dispatch(receiveDashboards(search, res.data)))
    .then(() => dispatch(serverReady()))
}

const instantDispatch = dispatch => dispatch(serverReady())

const fetchInitial = {
  dashboard: fetchDashboard,
  home: fetchDashboards,
  project: fetchProject
}
