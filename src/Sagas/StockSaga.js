import { call, put, delay } from 'redux-saga/effects'
import API from '../Services/Api'
import { getStockSearchList } from '../Redux/StockRedux'

export function* getStockSearchListSaga(action) {
  try {
    yield delay(500)

    const { search } = action

    const payload = yield call(API.searchEngine, { search })

    let searchListResponse = null

    if (payload['bestMatches']) {
      searchListResponse = payload.bestMatches.map(bestMatch => {
        for (let oldProps in bestMatch) {
          const newProps = oldProps.slice(3)
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

const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
  [newProp]: old,
  ...others,
})
