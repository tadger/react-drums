import React, { Component } from 'react';

import '../css/toggle.less';

const Toggle = ({ id, callback }) => (
  <div className={id + '-class'}>
    <input id={id} className="cmn-toggle cmn-toggle-round-flat"
      onChange={callback} type="checkbox" />
    <label htmlFor={id}></label>
  </div>
);

export default Toggle;
