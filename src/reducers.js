
import { combineReducers } from 'redux'

function projects (state = [], action) {
  switch(action.type) {
    case 'REQUEST_DASHBOARD':
      return []
    case 'RECEIVE_DASHBOARD':
      return [...action.projects]
    default:
      return state
  }
}

function dashboards (state = [], action) {
  switch(action.type) {
    case 'REQUEST_DASHBOARDS':
      return []
    case 'RECEIVE_DASHBOARDS':
      return [...action.dashboards]
    default:
      return state
  }
}


function dashboard (state = {}, action) {
  switch(action.type) {
    case 'REQUEST_DASHBOARD':
      return {}
    case 'RECEIVE_DASHBOARD':
      return Object.assign({}, action.dashboard)
    default:
      return state
  }
}

function serverReady (state = false, action) {
  switch(action.type) {
    case 'SERVER_READY':
      return true
    default:
      return state
  }
}

export default combineReducers({
  projects,
  dashboards,
  dashboard,
  serverReady
})
