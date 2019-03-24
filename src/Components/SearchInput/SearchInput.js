import React, { Component } from 'react'
import { Input, ListGroup, ListGroupItem } from 'reactstrap'
import './SearchInput.scss'
import { StockSelector, getStockSearchList } from '../../Redux/StockRedux'
import connect from 'react-redux/es/connect/connect'

class SearchInput extends Component {
  onChange = e => {
    console.log(e.target.value)
  }

  render() {
    const { searchList } = this.props

    console.log('searchList', searchList)

    return (
      <div className={'search-input-container'}>
        <Input onChange={this.onChange} />
        {searchList && (
          <ListGroup className={'search-input-list'}>
            searchList.map(element => <ListGroupItem>Cras justo odio</ListGroupItem>)
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
  getStockSearchList: getStockSearchList.Attempt
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInput)
