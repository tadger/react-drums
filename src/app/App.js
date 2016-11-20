import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'

import DrumMachine from './components/DrumMachine'

const BEATS = 4
const BARS = 4

class App {
  render(element) {

    if (element) {
      ReactDOM.render(<DrumMachine beats={BEATS} bars={BARS} />, element)
      return
    }
  }

}

export default App
