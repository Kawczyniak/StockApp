import { createReducer } from 'reduxsauce'
import { createAsyncType, createAsyncAction, createSyncAction } from '../Services/ReduxFunctions'

/* ------------- Action Types ------------- */
// Async (Attempt, Success, Failure)
export const GET_STOCK_SEARCH_LIST = createAsyncType('stock/GET_STOCK_SEARCH_LIST')

// Sync
export const ADD_STOCK_ITEM = 'stock/ADD_STOCK_ITEM'
export const REMOVE_STOCK_ITEM = 'stock/ADD_STOCK_ITEM'

/* ------------- Action Creators ------------- */
// Async (Attempt, Success, Failure)
export const getStockSearchList = createAsyncAction(GET_STOCK_SEARCH_LIST)

// Sync
export const addStockItem = createAsyncAction(ADD_STOCK_ITEM)
export const removeStockItem = createAsyncAction(REMOVE_STOCK_ITEM)

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  AVKey: '5ZXUVVOXJ5S4ECMC',
  searchList: null,
  stockList: [],
}

/* ------------- Selectors ------------- */
const searchList = state => state.stock.searchList

const stockList = state => state.stock.stockList

const avkey = () => ({
  apikey: INITIAL_STATE.AVKey,
})

export const StockSelector = {
  searchList,
  avkey,
  stockList,
}

/* ------------- Reducers ------------- */
const getStockSearchListReducer = (state = INITIAL_STATE, { searchList }) => {
  return {
    ...state,
    searchList,
  }
}

const addStockItemReducer = (state = INITIAL_STATE, { searchList }) => {
  return {
    ...state,
    searchList,
  }
}

const removeStockItemReducer = (state = INITIAL_STATE, { searchList }) => {
  return {
    ...state,
    searchList,
  }
}

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  [GET_STOCK_SEARCH_LIST.SUCCESS]: getStockSearchListReducer,
  [ADD_STOCK_ITEM]: addStockItemReducer,
  [REMOVE_STOCK_ITEM]: removeStockItemReducer,
})
