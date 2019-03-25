import React, { Component } from 'react'
import SearchInput from '../../Components/SearchInput/SearchInput'
import './Home.scss'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { removeStockItem, StockSelector } from '../../Redux/StockRedux'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    const { stockList } = this.props

    console.log('stockList', stockList)

    return (
      <div className={'home-container'}>
        <SearchInput />
        {stockList && (
          <ListGroup className={'search-input-list'}>
            {stockList.map(item => (
              <ListGroupItem key={item.symbol} className={'search-input-list-item'}>
                <div className={'left-element'}>{item.symbol}</div>
                <div className={'right-element'}>{item.name}</div>
                {item.logo && <img src={item.logo} />}
              </ListGroupItem>
            ))}
          </ListGroup>
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
