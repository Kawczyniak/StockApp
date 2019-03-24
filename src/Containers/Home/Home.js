import React, { Component } from 'react'
import SearchInput from '../../Components/SearchInput/SearchInput'
import './Home.scss'

class Home extends Component {
  render() {
    return (
      <div className={'home-container'}>
        <div className={'input-container'}>
          <SearchInput/>
        </div>
        <div>
          List
        </div>
      </div>
    )
  }
}

export default Home
