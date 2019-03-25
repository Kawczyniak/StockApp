import React, { Component } from 'react'
import { Input, ListGroup, ListGroupItem } from 'reactstrap'
import './SearchInput.scss'
import {
  StockSelector,
  getStockSearchList,
  addStockItem,
  wipeStockSearchList,
} from '../../Redux/StockRedux'
import { connect } from 'react-redux'

class SearchInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }
  }

  onChange = e => {
    const { getStockSearchList } = this.props

    this.setState({ search: e.target.value }, () => {
      getStockSearchList({ search: this.state.search })
    })
  }

  onClick = item => {
    const { addStockItem } = this.props

    addStockItem({ item })
  }

  render() {
    const { searchList } = this.props
    const { search } = this.state

    return (
      <div className={'search-input-container'}>
        <Input className={'search-input'} onChange={this.onChange} value={search} />
        {searchList && (
          <ListGroup className={'search-input-list'}>
            {searchList.map(item => (
              <ListGroupItem
                key={item.symbol}
                className={'search-input-list-item'}
                onClick={() => this.onClick(item)}
              >
                <div className={'left-element'}>{item.symbol}</div>
                <div className={'right-element'}>{item.name}</div>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchList: StockSelector.searchList(state),
})

const mapDispatchToProps = {
  getStockSearchList: getStockSearchList.Attempt,
  addStockItem: addStockItem,
  wipeStockSearchList,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInput)
