import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import '../css/switch.less'

class Switch extends Component {
  state = {
    isActive: false
  }

  constructor(props) {
    super(props)
  }

  toggle = callback => {
    this.setState({ isActive: !this.state.isActive }, () => {
      callback({
        index: this.props.index,
        bar: this.props.bar,
        isActive: this.state.isActive
      })
    })
  }


  render() {
    const { isActive } = this.state
    const { bar, onClick } = this.props

    const switchClass = classNames({
      'switch': true,
      'on': isActive,
      'off': !isActive,
      'sw-color-1': bar === 0,
      'sw-color-2': bar === 1,
      'sw-color-3': bar === 2,
      'sw-color-4': bar === 3
    })

    return (
      <div
        className={switchClass}
        onClick={() => { this.toggle(onClick) }}>
        <div></div>
      </div>
    )
  }

}

Switch.propTypes = {
  index: PropTypes.number.isRequired,
  bar: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Switch
