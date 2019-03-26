import React, { Component } from 'react'
import SearchInput from '../../Components/SearchInput/SearchInput'
import './Home.scss'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { removeStockItem, StockSelector } from '../../Redux/StockRedux'
import { connect } from 'react-redux'
import { Card } from '../../Components/Card/Card'

class Home extends Component {
  render() {
    const { stockList } = this.props

    console.log('stockList', stockList)

    return (
      <div className={'home-container'}>
        <SearchInput />
        {stockList && (
          <div className={'home-stock-card-list'}>
            {stockList.map(stock => (
              <Card stock={stock} />
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

const mapDispatchToProps = {
  removeStockItem,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
