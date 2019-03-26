import { call, put, delay } from 'redux-saga/effects'
import API from '../Services/Api'
import {
  fetchStockItemDetails,
  getStockSearchList,
  updateStockItem,
  wipeStockSearchList,
} from '../Redux/StockRedux'

export function* getStockSearchListSaga(action) {
  try {
    yield delay(500)

    const { search } = action

    const payload = yield call(API.searchEngine, {
      apikey: '5ZXUVVOXJ5S4ECMC',
      function: 'SYMBOL_SEARCH',
      keywords: search,
    })

    let searchListResponse = null

    if (payload['bestMatches']) {
      searchListResponse = payload.bestMatches.map(bestMatch => {
        for (let oldProps in bestMatch) {
          let newProps = oldProps.slice(3)
          if (newProps === 'type') {
            newProps = 'companyType'
          }
          bestMatch = renameProp(oldProps, newProps, bestMatch)
        }

        return bestMatch
      })
    }

    yield put(getStockSearchList.Success({ searchList: searchListResponse }))
  } catch (error) {
    console.log('error', error)
  }
}

export function* fetchStockItemDetailsSaga(action) {
  try {
    const {
      item: { name, symbol },
    } = action

    const preparedName = prepareCompanyName(name)

    // fetching logo
    const logoPayload = yield call(API.logo, {
      query: preparedName,
    })

    console.log(logoPayload)

    // checking if logo is available to update item
    if (logoPayload.length > 0) {
      yield put(updateStockItem({ symbol: symbol, logo: logoPayload[0].logo }))
    }

    // fetching stock details
    const stockEndpointPayload = yield call(API.stockEndpoint, {
      symbol: symbol,
      apikey: '5ZXUVVOXJ5S4ECMC',
      function: 'GLOBAL_QUOTE',
    })

    let stock = null

    // checking if stock endpoint payload has values
    // changing weird key naming
    if (stockEndpointPayload['Global Quote']) {
      stock = stockEndpointPayload['Global Quote']
      for (let oldProps in stock) {
        let newProps = oldProps.slice(4)
        stock = renameProp(oldProps, newProps, stock)
      }
    }

    if (stock) {
      console.log(stock)
      yield put(updateStockItem({ ...stock }))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* addStockItemSaga(action) {
  try {
    yield put(wipeStockSearchList())
    const { item } = action
    yield put(fetchStockItemDetails({ item }))
  } catch (error) {
    console.log('error', error)
  }
}

const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
  [newProp]: old,
  ...others,
})

const prepareCompanyName = name => {
  const sufixes = ['Inc.', 'L.P.']

  for (let sufix of sufixes) {
    const sufixIndex = name.indexOf(sufix)

    if (sufixIndex !== -1) {
      return name.slice(0, sufixIndex - 1)
    }
  }

  return name
}
