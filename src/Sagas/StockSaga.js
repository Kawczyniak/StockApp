import { call, put, delay } from 'redux-saga/effects'
import API from '../Services/Api'
import { getStockSearchList, updateLogoStockItem, wipeStockSearchList } from '../Redux/StockRedux'

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

export function* addStockItemSaga(action) {
  try {
    yield put(wipeStockSearchList())
    const { item } = action

    const preparedName = prepareCompanyName(item.name)

    const payload = yield call(API.logo, {
      query: preparedName,
    })

    console.log(payload)

    if (payload) {
      yield put(updateLogoStockItem({ symbol: item.symbol, logo: payload[0].logo }))
    }
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
