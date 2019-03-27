import React from 'react'
import './CloseButton.scss'

export const CloseButton = ({ onClick }) => (
  <div
    className={'close-container'}
    onClick={onClick}
  >
    <div className={'leftright'} />
    <div className={'rightleft'} />
  </div>
)
