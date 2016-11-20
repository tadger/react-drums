import React, { Component, PropTypes } from 'react'

const Slider = ({ min, max, step, onChange }) => (
  <input type="range"
    defaultValue="100"
    min={min}
    max={max}
    step={step}
    onChange={onChange} />
)

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Slider
