import React, { Component, PropTypes } from 'react'
import { range } from 'lodash'

import '../css/ticker.less'

const Ticker = ({ tickCount, index }) => {
  const ticks = range(tickCount).map(tick => (
    <li key={tick} className={tick === index ? 'on' : ''}></li>
  ))

  return <ul className="ticker">{ticks}</ul>
}

Ticker.propTypes = {
  tickCount: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
}

export default Ticker
