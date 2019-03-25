import axios from 'axios'
import StockSelector from '../Redux/StockRedux'

const api = axios.create({
  baseURL: 'https://www.alphavantage.co',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

const apiLogo = axios.create({
  baseURL: 'https://autocomplete.clearbit.com/v1/companies',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

api.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})

apiLogo.interceptors.response.use(response => {
  console.log('Response logoApi:', response)
  return response
})

const runApi = async ({ method = 'get', body, path }) => {
  const { data, statusText, status } = await api[method](`${path}`, body)

  if (statusText === 'OK') {
    return data
  }
  const toReturn = { status, data }
  throw toReturn
}

const runLogoApi = async ({ method = 'get', body, path }) => {
  const { data, statusText, status } = await apiLogo[method](`${path}`, body)

  if (statusText === 'OK') {
    return data
  }
  const toReturn = { status, data }
  throw toReturn
}

// Stock API

const searchEngine = params =>
  runApi({
    path: `query${parseGetParams(params)}`,
  })

const logo = params =>
  runLogoApi({
    path: `suggest${parseGetParams(params)}`,
  })

// Helpers

const parseGetParams = params =>
  Object.keys(params).reduce(
    (pValue, cValue) => `${pValue}${pValue.length > 1 ? '&' : ''}${cValue}=${params[cValue]}`,
    '?',
  )

export default {
  logo,
  searchEngine,
}
