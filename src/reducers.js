
import { combineReducers } from 'redux'

function projects (state = [], action) {
  switch(action.type) {
    case 'REQUEST_DASHBOARD':
      return []
    case 'RECEIVE_DASHBOARD':
      return [...action.projects]
      break
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
      break
    default:
      return state
  }
}

function serverReady (state = false, action) {
  switch(action.type) {
    case 'SERVER_READY':
      return true
      break
    default:
      return state
  }
}

export default combineReducers({
  projects,
  dashboards,
  serverReady
})
