import React, { Component, PropTypes } from 'react'

import '../css/toggle.less'

const Toggle = ({ id, onClick }) => (
  <div className={id + '-class'}>
    <input id={id}
      className="cmn-toggle cmn-toggle-round-flat"
      onChange={onClick}
      type="checkbox" />
    <label htmlFor={id}></label>
  </div>
)

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Toggle
