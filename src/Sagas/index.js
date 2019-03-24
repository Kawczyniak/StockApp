import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { GET_STOCK_SEARCH_LIST } from '../Redux/StockRedux'

/* ------------- Sagas ------------- */
import { getStockSearchListSaga } from './StockSaga'

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([
    takeLatest(GET_STOCK_SEARCH_LIST.ATTEMPT, getStockSearchListSaga),
  ])
}
