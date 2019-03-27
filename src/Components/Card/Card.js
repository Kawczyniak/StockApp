import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Card.scss'
import { CloseButton } from '../CloseButton/CloseButton'
import { removeStockItem } from '../../Redux/StockRedux'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCloseButton: false,
    }
  }

  signValue = stringValue => {
    if (stringValue[0] === '-') {
      return false
    }
    return true
  }

  visible = (...args) => {
    for (let arg of args) {
      if (!arg) {
        return false
      }
    }
    return true
  }

  deleteItem = symbol => {
    const { removeStockItem } = this.props

    removeStockItem({ symbol })
  }

  render() {
    const {
      stock: {
        symbol,
        name,
        logo,
        region,
        marketOpen,
        marketClose,
        timezone,
        price,
        currency,
        changePercent,
        latestTradingDay,
      },
    } = this.props

    const { showCloseButton } = this.state

    return (
      <div
        className={'elevation-1dp card-container'}
        onMouseEnter={() => {
          this.setState({ showCloseButton: true })
        }}
        onMouseLeave={() => {
          this.setState({ showCloseButton: false })
        }}
      >
        <div className={'card-row'}>
          {logo && (
            <div className={'elevation-1dp logo-container margin-right'}>
              <img className={'logo'} alt="logo" src={logo} />
            </div>
          )}
          <div>
            <div className={'card-row'}>
              <div className={'name margin-right'}>{name}</div>
              <div className={'symbol'}>{symbol}</div>
            </div>
            <div className={'card-row'}>
              <div className={'margin-right'}>{region}</div>
              <div className={'margin-right'}>
                {marketOpen} - {marketClose}
              </div>
              <div>{timezone}</div>
            </div>
            {this.visible(price, currency, changePercent, latestTradingDay) && (
              <div className={'card-row'}>
                <div className={'price'}>{parseFloat(price)}</div>
                <div className={'currency'}>{currency}</div>
                <div className={`margin-right ${this.signValue(changePercent) ? 'green' : 'red'}`}>
                  {this.signValue(changePercent) && '+'}
                  {changePercent}
                </div>
                <div>{latestTradingDay}</div>
              </div>
            )}
          </div>
        </div>
        {showCloseButton && <CloseButton onClick={() => this.deleteItem(symbol)} />}
      </div>
    )
  }
}

const mapDispatchToProps = {
  removeStockItem,
}

export default connect(
  null,
  mapDispatchToProps,
)(Card)
