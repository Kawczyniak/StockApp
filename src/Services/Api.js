import axios from 'axios'
import StockSelector from '../Redux/StockRedux'

const api = axios.create({
  baseURL: 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=5ZXUVVOXJ5S4ECMC',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

api.interceptors.request.use(request => {
  console.log('Request', request)
  return request
})

api.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})

const runApi = async ({ method = 'get', body, path }) => {
  const { data, ok, status } = await api[method](`${path}`, body)

  if (ok) {
    return data
  }
  const toReturn = { status, data }
  throw toReturn
}

// const updateApiHeaders = data => {
//   api.setHeaders({
//     'Content-Type': 'application/json',
//   })
// }

// Auth API

const login = body =>
  runApi({
    method: 'post',
    path: `/auth/`,
    body,
  })

// Helpers

const parseGetParams = params =>
  Object.keys(params).reduce(
    (pValue, cValue) => `${pValue}${pValue.length > 1 ? '&' : ''}${cValue}=${params[cValue]}`,
    '?',
  )

export default {

}
