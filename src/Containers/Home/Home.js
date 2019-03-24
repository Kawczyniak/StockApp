import React, { Component } from 'react'
import SearchInput from '../../Components/SearchInput/SearchInput'
import './Home.scss'

class Home extends Component {
  render() {
    return (
      <div className={'home-container'}>
        <SearchInput />
        <div>List</div>
      </div>
    )
  }
}

export default Home
