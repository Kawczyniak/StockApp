import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import ReduxPersist from '../Config/ReduxPersist'
import { persistReducer, persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  middleware.push(thunk)

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  const store = createStore(
    persistReducer(ReduxPersist, rootReducer),
    composeWithDevTools(...enhancers),
  )

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  let persistor = persistStore(store)

  return { store, persistor}
}
