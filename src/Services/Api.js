import axios from 'axios'
import { UserSelector } from '../Redux/UserRedux'

const api = axios.create({
  baseURL: '5ZXUVVOXJ5S4ECMC',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

const apiMonitor = response => console.log('monitor', response)
api.addMonitor(apiMonitor)

const multipartApi = create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 30000,
})
multipartApi.addMonitor(apiMonitor)

const runMultipartApi = async ({ method = 'post', body, path }) => {
  const { data, ok, status } = await api[method](`${path}`, body)

  if (ok) {
    return data
  }
  const toReturn = { status, data }
  throw toReturn
}

const runApi = async ({ method = 'post', body, path }) => {
  const { data, ok, status } = await api[method](`${path}`, body)

  if (ok) {
    return data
  }
  const toReturn = { status, data }
  throw toReturn
}

const updateApiHeaders = data => {
  api.setHeaders({
    'Content-Type': 'application/json',
    Authorization: `Token ${data}`,
  })

  multipartApi.setHeaders({
    'Content-Type': 'multipart/form-data',
    Authorization: `Token ${data}`,
  })
}

// Auth API

const login = body =>
  runApi({
    method: 'post',
    path: `/auth/`,
    body,
  })

const signUp = body =>
  runApi({
    method: 'post',
    path: `/user/`,
    body,
  })

const remainPassword = body =>
  runApi({
    method: 'post',
    path: `/user/new_password/`,
    body,
  })

// Project API

const getProjects = () =>
  runApi({
    method: 'get',
    path: `/project/`,
  })

const createProject = body =>
  runApi({
    method: 'post',
    path: `/create_project/`,
    body,
  })

// Permission API

const getPermissionList = () =>
  runApi({
    method: 'get',
    path: `/permission/`,
  })

// User API

const getUserListByProject = projectId =>
  runApi({
    method: 'get',
    path: `/user/${projectId}/project/`,
  })

const updateProfile = body =>
  runApi({
    method: 'put',
    path: `/user/update_user/`,
    body,
  })

// Issue API

const getBacklogIssueListByProjectId = projectId =>
  runApi({
    method: 'get',
    path: `/issue/backlog/${projectId}`,
  })

const getIssue = issueId =>
  runApi({
    method: 'get',
    path: `/issue/${issueId}`,
  })

const getCurrentSprintIssueList = projectId => {
  return runApi({
    method: 'get',
    path: `/issue/${projectId}/last_sprint/`,
  })
}

const moveToCurrentSprint = (issueId, statusId, order) => {
  return runApi({
    method: 'put',
    path: `/issue/${issueId}/move_to_last_sprint/`,
    body: {
      status: statusId,
      order: order,
    },
  })
}

const moveToBacklog = issueId => {
  return runApi({
    method: 'put',
    path: `/issue/${issueId}/move_to_backlog/`,
  })
}

const postIssue = async formData => {
  let formDataKeys = Object.keys(formData)

  const body = new FormData()

  formDataKeys.forEach(key => {
    if (formData[key]) {
      if (key !== 'images') {
        body.append(key, formData[key])
      } else {
        if (formData[key].length > 0) {
          for (let i = 0; i < formData[key].length; i++) {
            body.append(`images-${i}`, formData[key][i], formData[key][i].name)
          }
          body.append('length', formData[key].length)
        } else {
          body.append('length', 0)
        }
      }
    }
  })

  const data = await runMultipartApi({
    method: 'post',
    path: `/issue/`,
    body,
  })
  return data
}

const putIssue = async ({ issueId }, formData) => {
  let formDataKeys = Object.keys(formData)

  const body = new FormData()

  formDataKeys.forEach(key => {
    if (formData[key]) {
      if (key !== 'images') {
        body.append(key, formData[key])
      } else {
        formData[key].forEach((image, index) => body.append(`images-${index}`, image, image.name))
        body.append('length', formData[key] ? formData[key].length : 0)
      }
    }
  })

  const data = await runMultipartApi({
    method: 'put',
    path: `/issue/${issueId}/`,
    body,
  })

  return data
}

const deleteIssueImage = imageId =>
  runApi({
    method: 'delete',
    path: `/image/${imageId}/`,
  })

const changeIssueOrders = body =>
  runApi({
    method: 'put',
    path: `/issue/update_multiple_issues/`,
    body,
  })

// Comment API

const sendCommentWithAttachment = async content => {
  const { description, images, author, issue, permission } = content
  const body = new FormData()
  if (images) {
    images.forEach((image, index) => body.append(`images-${index}`, image, image.name))
  }
  body.append('length', images ? images.length : 0)
  body.append('author', author)
  body.append('description', description)
  body.append('permission', permission)
  body.append('issue', issue)

  const data = await runMultipartApi({
    method: 'post',
    path: `/comment/`,
    body,
  })

  return data
}

const deleteComment = id =>
  runApi({
    method: 'delete',
    path: `/comment/${id}/`,
  })

const projectPermissions = () =>
  runApi({
    method: 'get',
    path: `/user_permission/`,
  })

// Status API
const getStatusList = param =>
  runApi({
    method: 'get',
    path: `/status/${parseGetParams(param)}`,
  })

// Tag API
const getTagListByProjectId = param =>
  runApi({
    method: 'get',
    path: `/tag/${parseGetParams(param)}`,
  })

// Sprint API
const getSprintListByProjectId = param =>
  runApi({
    method: 'get',
    path: `/sprint/${parseGetParams(param)}`,
  })

const getIssueListBySprintId = ({ sprintId }) =>
  runApi({
    method: 'get',
    path: `/issue/sprint/${sprintId}`,
  })

// Helpers

const parseGetParams = params =>
  Object.keys(params).reduce(
    (pValue, cValue) => `${pValue}${pValue.length > 1 ? '&' : ''}${cValue}=${params[cValue]}`,
    '?',
  )

export default {
  updateApiHeaders,
  login,
  signUp,
  remainPassword,
  getProjects,
  getPermissionList,
  createProject,
  getBacklogIssueListByProjectId,
  getCurrentSprintIssueList,
  getStatusList,
  getUserListByProject,
  getTagListByProjectId,
  getIssue,
  sendCommentWithAttachment,
  deleteComment,
  putIssue,
  deleteIssueImage,
  moveToCurrentSprint,
  moveToBacklog,
  postIssue,
  projectPermissions,
  getSprintListByProjectId,
  getIssueListBySprintId,
  changeIssueOrders,
  updateProfile,
}
