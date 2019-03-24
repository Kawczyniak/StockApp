import React, { Component } from 'react'
import { Input, ListGroup, ListGroupItem } from 'reactstrap'
import './SearchInput.scss'
import { StockSelector, getStockSearchList, addStockItem } from '../../Redux/StockRedux'
import connect from 'react-redux/es/connect/connect'

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

    addStockItem(item)
  }

  render() {
    const { searchList } = this.props
    const { search } = this.state
    console.log(this.state)

    console.log('searchList', searchList)

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
  addStockItem,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInput)
