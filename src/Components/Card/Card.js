import React from 'react'
import './Card.scss'

export const Card = ({ stock: { symbol, name, logo } }) => (
  <div className={'elevation-1dp card-container'}>
    <div className={''}>{symbol}</div>
    <div className={''}>{name}</div>
    <div className={''}></div>
    <div className={''}>{name}</div>
    <div className={''}>{name}</div>
    {logo && <div className={'elevation-1dp logo-container'}><img className={'logo'} src={logo} /></div>}
  </div>
)
