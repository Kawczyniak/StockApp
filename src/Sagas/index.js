import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { ADD_STOCK_ITEM, FETCH_STOCK_ITEM_DETAILS, GET_STOCK_SEARCH_LIST } from '../Redux/StockRedux'

/* ------------- Sagas ------------- */
import { getStockSearchListSaga, addStockItemSaga, fetchStockItemDetailsSaga } from './StockSaga'

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([
    takeLatest(GET_STOCK_SEARCH_LIST.ATTEMPT, getStockSearchListSaga),
    takeLatest(ADD_STOCK_ITEM, addStockItemSaga),
    takeLatest(FETCH_STOCK_ITEM_DETAILS, fetchStockItemDetailsSaga),
  ])
}
