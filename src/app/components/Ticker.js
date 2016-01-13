import React, { Component } from 'react';
import _ from 'lodash';

import '../css/ticker.less';

const Ticker = ({ tickCount, index }) => {
  var ticks = _.range(tickCount).map(v => {
    return <li key={v} className={v === index ? 'on' : ''}></li>;
  });

  return <ul className="ticker">{ticks}</ul>;
};

export default Ticker;
