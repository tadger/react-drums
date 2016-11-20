import React, { Component, PropTypes } from 'react'

const DrumSelect = ({ drum, drums, onChange }) => {
  const options = drums.map((drum, i) => (
    <option key={i} value={drum}>
      {drum}
    </option>
  ))

  return (
    <select onChange={onChange}>
      {options}
    </select>
  )
}

DrumSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  drum: PropTypes.string,
  drums: PropTypes.array.isRequired
}

export default DrumSelect
