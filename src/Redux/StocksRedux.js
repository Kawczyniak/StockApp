import { createReducer } from 'reduxsauce'
import { createAsyncType, createAsyncAction, createSyncAction } from '../Services/ReduxFunctions'
import { sortByDate } from '../Services/Helpers'

/* ------------- Action Types ------------- */
// export const ADD_ITEM_TO_LIST = 'shopping/ADD_ITEM_TO_LIST'
export const ADD_ITEM_TO_LIST = 'shopping/ADD_ITEM_TO_LIST'
export const DELETE_ITEM_FROM_LIST = 'shopping/DELETE_ITEM_FROM_LIST'
export const SELECT_LIST_ID = 'shopping/SELECT_LIST_ID'
export const CHECK_ITEM = 'shopping/CHECK_ITEM'
export const ADD_SHOPPING_LIST = 'shopping/ADD_SHOPPING_LIST'
export const DELETE_SHOPPING_LIST = 'shopping/DELETE_SHOPPING_LIST'
export const TOGGLE_ARCHIVE_SHOPPING_LIST = 'shopping/TOGGLE_ARCHIVE_SHOPPING_LIST'

/* ------------- Action Creators ------------- */
export const addItemToList = createSyncAction(ADD_ITEM_TO_LIST)
export const deleteItemFromList = createSyncAction(DELETE_ITEM_FROM_LIST)
export const selectListId = createSyncAction(SELECT_LIST_ID)
export const checkItem = createSyncAction(CHECK_ITEM)
export const addShoppingList = createSyncAction(ADD_SHOPPING_LIST)
export const deleteShoppingList = createSyncAction(DELETE_SHOPPING_LIST)
export const toggleArchiveShoppingList = createSyncAction(TOGGLE_ARCHIVE_SHOPPING_LIST)

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
  uniqueListId: 5,
  selectedListId: null,
  selectedList: null,
  shoppingListsById: {},
}

/* ------------- Selectors ------------- */
const undoneLists = ({ shopping: { shoppingListsById } }) =>
  Object.keys(shoppingListsById)
    .reduce((shoppingLists, id) => {
      if (!shoppingListsById[id].archived) {
        shoppingLists.push(shoppingListsById[id])
      }
      return shoppingLists
    }, [])
    .sort(sortByDate)

const archivedLists = ({ shopping: { shoppingListsById } }) =>
  Object.keys(shoppingListsById)
    .reduce((shoppingLists, id) => {
      if (shoppingListsById[id].archived) {
        shoppingLists.push(shoppingListsById[id])
      }
      return shoppingLists
    }, [])
    .sort(sortByDate)

const selectedShoppingList = ({ shopping: { shoppingListsById, selectedListId } }) =>
  shoppingListsById[selectedListId]

export const ShoppingSelector = {
  undoneLists,
  archivedLists,
  selectedShoppingList,
}

/* ------------- Reducers ------------- */
const addItemToListReducer = (state = INITIAL_STATE, { name, quantity, unit }) => {
  const { shoppingListsById, selectedListId } = state

  const shoppingList = shoppingListsById[selectedListId].list

  const lastId = shoppingList.reduce((prev, current) => (prev.id > current.id ? prev : current), {
    id: 0,
  }).id

  const shoppingListCopy = [
    ...shoppingList,
    { id: lastId + 1, name, quantity, unit, checked: false, archived: false },
  ]

  return {
    ...state,
    shoppingListsById: {
      ...shoppingListsById,
      [selectedListId]: {
        ...shoppingListsById[selectedListId],
        list: shoppingListCopy,
      },
    },
  }
}

const deleteItemFromListReducer = (state = INITIAL_STATE, { id }) => {
  const { shoppingListsById, selectedListId } = state

  const shoppingList = shoppingListsById[selectedListId].list

  const itemIndex = shoppingList.findIndex(element => element.id === id)

  const shoppingListCopy = [
    ...shoppingList.slice(0, itemIndex),
    ...shoppingList.slice(itemIndex + 1),
  ]

  return {
    ...state,
    shoppingListsById: {
      ...shoppingListsById,
      [selectedListId]: {
        ...shoppingListsById[selectedListId],
        list: shoppingListCopy,
      },
    },
  }
}

const selectListIdReducer = (state = INITIAL_STATE, { id }) => ({
  ...state,
  selectedListId: id,
})

const checkItemReducer = (state = INITIAL_STATE, { id }) => {
  const { shoppingListsById, selectedListId } = state

  const shoppingList = shoppingListsById[selectedListId].list

  const shoppingListCopy = shoppingList.map(element => {
    if (id !== element.id) return element
    return { ...element, checked: !element.checked }
  })

  return {
    ...state,
    shoppingListsById: {
      ...shoppingListsById,
      [selectedListId]: {
        ...shoppingListsById[selectedListId],
        list: shoppingListCopy,
      },
    },
  }
}

const addShoppingListReducer = (state = INITIAL_STATE, { name }) => {
  const { shoppingListsById, uniqueListId } = state

  const newShoppingList = {
    [uniqueListId]: {
      id: uniqueListId,
      archived: false,
      name,
      date: new Date(),
      list: [],
    },
  }

  return {
    ...state,
    uniqueListId: uniqueListId + 1,
    shoppingListsById: {
      ...shoppingListsById,
      ...newShoppingList,
    },
  }
}

const deleteShoppingListReducer = (state = INITIAL_STATE, { id }) => {
  const { shoppingListsById } = state

  const shoppingListCopy = {
    ...shoppingListsById,
  }

  delete shoppingListCopy[id]

  return {
    ...state,
    shoppingListsById: {
      ...shoppingListCopy,
    },
  }
}

const toggleArchiveShoppingListReducer = (state = INITIAL_STATE, { id }) => {
  const { shoppingListsById } = state

  const shoppingListCopy = {
    [id]: { ...shoppingListsById[id], archived: !shoppingListsById[id].archived },
  }

  return {
    ...state,
    shoppingListsById: {
      ...shoppingListsById,
      ...shoppingListCopy,
    },
  }
}

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  [ADD_ITEM_TO_LIST]: addItemToListReducer,
  [DELETE_ITEM_FROM_LIST]: deleteItemFromListReducer,
  [SELECT_LIST_ID]: selectListIdReducer,
  [CHECK_ITEM]: checkItemReducer,
  [ADD_SHOPPING_LIST]: addShoppingListReducer,
  [DELETE_SHOPPING_LIST]: deleteShoppingListReducer,
  [TOGGLE_ARCHIVE_SHOPPING_LIST]: toggleArchiveShoppingListReducer,
})
