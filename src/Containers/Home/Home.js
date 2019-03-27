import React, { Component } from 'react'
import SearchInput from '../../Components/SearchInput/SearchInput'
import './Home.scss'
import { StockSelector } from '../../Redux/StockRedux'
import { connect } from 'react-redux'
import Card from '../../Components/Card/Card'

class Home extends Component {
  render() {
    const { stockList } = this.props

    return (
      <div className={'home-container'}>
        <h1 className={'title'}>Stock company tracker</h1>
        <SearchInput />
        {stockList && (
          <div className={'home-stock-card-list'}>
            {stockList.map(stock => (
              <Card key={stock.symbol} stock={stock} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stockList: StockSelector.stockList(state),
})

export default connect(mapStateToProps)(Home)
