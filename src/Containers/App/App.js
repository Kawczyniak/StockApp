import React, { Component } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import history from '../../Services/history'
import { PersistGate } from 'redux-persist/integration/react'
import StoreConfiguration from '../../Redux/StoreConfiguration'
import rootSaga from '../../Sagas'
import rootReducers from '../../Redux'
import Home from '../Home/Home'

const { store, persistor } = StoreConfiguration(rootReducers, rootSaga)

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <>
              <Switch>
                {/*{Routes.map((route, index) => (*/}
                {/*<Route*/}
                {/*key={route.path}*/}
                {/*path={route.path}*/}
                {/*exact={route.exact}*/}
                {/*render={props => (*/}
                {/*<Layout component={route.component} route={route} renderProps={props} />*/}
                {/*)}*/}
                {/*/>*/}
                {/*))}*/}
                <Route path="/" component={Home} />
                <Route path="*" component={NotFound} />
              </Switch>
            </>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
