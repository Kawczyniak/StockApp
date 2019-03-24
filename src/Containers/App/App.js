import React, { Component } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Provider store={this.store}>
        <Router history={history}>
          <>
            <Switch>
              {Routes.map((route, index) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  render={props => (
                    <Layout component={route.component} route={route} renderProps={props} />
                  )}
                />
              ))}
              <Route path="*" component={NotFound} />
            </Switch>
          </>
        </Router>
      </Provider>
    )
  }
}

export default App
