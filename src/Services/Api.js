import axios from 'axios'
import StockSelector from '../Redux/StockRedux'

const api = axios.create({
  baseURL: 'https://www.alphavantage.co',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

// api.interceptors.request.use(request => {
//   console.log('Request', request)
//   return request
// })

api.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})

const runApi = async ({ method = 'get', body, path }) => {
  const { data, statusText, status } = await api[method](`${path}`, body)

  if (statusText === "OK") {
    return data
  }
  const toReturn = { status, data }
  throw toReturn
}

// Stock API

const searchEngine = ({ search }) =>
  runApi({
    path: `query?apikey=5ZXUVVOXJ5S4ECMC&function=SYMBOL_SEARCH&keywords=${search}`,
  })

// Helpers

const parseGetParams = params =>
  Object.keys(params).reduce(
    (pValue, cValue) => `${pValue}${pValue.length > 1 ? '&' : ''}${cValue}=${params[cValue]}`,
    '?',
  )

export default {
  searchEngine,
}
