import React, { Component } from 'react'
import './Card.scss'
import { CloseButton } from '../CloseButton/CloseButton'

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

  toggleCloseButton = e => {
    this.setState((prevState) => ({showCloseButton: !prevState.showCloseButton}))
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
      <div className={'elevation-1dp card-container'} onMouseEnter={this.toggleCloseButton} onMouseLeave={this.toggleCloseButton}>
        <div className={'card-row'}>
          {logo && (
            <div className={'elevation-1dp logo-container margin-right'}>
              <img className={'logo'} src={logo} />
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
        {showCloseButton && <CloseButton />}
      </div>
    )
  }
}

export default Card
