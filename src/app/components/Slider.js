import React, { Component } from 'react';

const Slider = ({ value, min, max, step, handleChange }) => (
  <input type="range"
    defaultValue="100"
    min={min}
    max={max}
    step={step}
    onChange={handleChange} />
);

export default Slider;
