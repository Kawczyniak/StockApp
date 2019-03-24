import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { SELECT_LIST_ID } from '../Redux/ShoppingRedux'

/* ------------- Sagas ------------- */
import { selectListSaga } from './ShoppingSaga'

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([
    takeLatest(SELECT_LIST_ID, selectListSaga),
  ])
}
