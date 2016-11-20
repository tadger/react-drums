import React, { PropTypes, Component } from 'react'
import { fill } from 'lodash'

import Switch from './Switch'

import '../css/channel.less'

class Channel extends Component {

  constructor(props) {
    super(props)

    const { bars, beats, label } = props

    const steps = fill(Array(bars), null).map(x => {
      return fill(Array(beats), false)
    })

    this.state = {
      label: label,
      steps: steps
    }
  }

  shouldComponentUpdate({ label }) {
    if (label !== this.state.label) {
      this.setState({ label })
      return true
    }

    return false
  }

  // formats steps into Dilla note notation
  mapSteps() {
    const noteMapper = (mapped, bar, i) => {
      const steps = bar.forEach((isActive, j) => {
        if (isActive) {
          const stepVal = 96 / bar.length * j + 1
          const tick = stepVal < 10 ? `0${ stepVal }` : stepVal
          mapped.push([`1.${ i + 1 }.${ stepVal }`])
        }
      })
      return mapped
    }

    return this.state.steps.reduce(noteMapper, [])
  }

  setStep = step => {
    const { steps, label } = this.state

    steps[step.bar][step.index] = step.isActive
    this.setState({ steps }, () => {
      const channel = {
        id: label,
        notes: this.mapSteps()
      }

      this.props.saveFunc(channel)
    })
  }

  render() {
    const switches = this.state.steps.map((bar, i) => (
      bar.map((step, j) => (
        <Switch
          key={bar.length * i + j}
          index={j}
          bar={i}
          onClick={this.setStep} />
      ))
    ))

    return (
      <div className="channel">
        <h2>{this.props.label}</h2>
        {switches}
      </div>
    )
  }

}

Channel.propTypes = {
  saveFunc: PropTypes.func.isRequired,
  label: PropTypes.string,
  beats: PropTypes.number.isRequired,
  bars: PropTypes.number.isRequired
}

export default Channel
