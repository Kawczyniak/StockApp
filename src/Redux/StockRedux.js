import { createReducer } from 'reduxsauce'
import { createAsyncType, createAsyncAction, createSyncAction } from '../Services/ReduxFunctions'

/* ------------- Action Types ------------- */
export const GET_STOCK_SEARCH_LIST = 'stock/GET_STOCK_SEARCH_LIST'

/* ------------- Action Creators ------------- */
export const getStockSearchList = createAsyncAction(GET_STOCK_SEARCH_LIST)

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  AVKey: '5ZXUVVOXJ5S4ECMC',
  searchList: null
}

/* ------------- Selectors ------------- */
const searchList = (state) => ({
  searchList: state.stock.searchList
})

const avkey = () => ({
  apikey: INITIAL_STATE.AVKey
})

export const StockSelector = {
  searchList,
  avkey,
}

/* ------------- Reducers ------------- */
const getStockSearchListReducer = (state = INITIAL_STATE, { name, quantity, unit }) => {
  console.log()
  return {
    ...state,
  }
}


/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  [GET_STOCK_SEARCH_LIST]: getStockSearchListReducer,
})
