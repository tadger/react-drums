import React, { Component } from 'react'
import Channel from './Channel'
import Ticker from './Ticker'
import Toggle from './Toggle'
import Slider from './Slider'
import DrumSelect from './DrumSelect'

import Dilla from 'dilla'
import axios from 'axios'
import { samples } from '../../samples/samples'

import '../css/drum-machine.less'

class DrumMachine extends Component {
  tempo = 100
  state = {
    tick: 1,
    drum: samples[0],
    sounds: {}
  }

  componentDidMount() {
    this.context = new window.AudioContext()
    this.initializeDrumMachine()

    this.clock = document.getElementById('clock')

    this.timer.on('step', step => {
      if (step.event === 'start') this.onStart(step)
      if (step.event === 'stop') this.onStop(step)
    })

    this.timer.on('tick', val => {
      const pos = val.position.split('.')
      const beat = +pos[1]
      const step = +pos[2]
      const tick = this.props.beats * (beat - 1) + Math.ceil(step / (96 / this.props.beats))

      if (this.state.tick !== tick) {
        this.setState({ tick })
      }

      this.clock.textContent = val.position
    })
  }

  initializeDrumMachine = () => {
    const requests = samples.map(name => (
      axios.get(`/samples/${name}.wav`, {
        name, responseType: 'arraybuffer'
      })
    ))

    const options = {
      tempo: this.tempo,
      beatsPerBar: this.props.beats,
      loopLength: 1
    }

    this.timer = new Dilla(this.context, options)

    axios.all(requests).then(this.initSounds)
  }

  // decode and save each sound buffer
  initSounds = responses => {
    const sounds = responses.reduce((ret, res) => {
      this.context.decodeAudioData(res.data, buf => {
        ret[res.config.name] = buf
      })

      return ret
    }, {})

    setTimeout(() => this.setState({ sounds }), 0)
  }

  handleDrumChange = e => this.setState({ drum: e.target.value })

  handleTempoChange = e => {
    const tempo = +e.target.value

    if (this.tempo === tempo) return

    this.tempo = tempo
    this.timer.setTempo(this.tempo)
  }

  onStart(step) {
    this.playSound(step.id, step.time)
  }

  onStop(step) {
    const source = step.args.source
    const gainVolume = step.args.gain || 1

    source.gainNode.gain.setValueAtTime(gainVolume, step.time)
    source.gainNode.gain.linearRampToValueAtTime(0, step.time + 0.01)
  }

  togglePlay = () => {
    this.timer[this.state.playing ? 'pause' : 'start']()
    this.setState({ playing: !this.state.playing })
  }

  saveChannel = channel => {
    this.timer.set(channel.id, channel.notes)
  }

  playSound = (sound, time) => {
    const play = this.context.createBufferSource()

    play.buffer = this.state.sounds[sound]
    play.connect(this.context.destination)
    play.start(time)
  }

  render() {
    const { drum, tick, sounds } = this.state
    const { bars, beats } = this.props

    return (
      <div className="machine">
        <div className="clock" id="clock">
          0.0.00
        </div>

        <Toggle
          id="play"
          onClick={this.togglePlay} />

        <Slider
          min={50}
          max={300}
          step={5}
          onChange={this.handleTempoChange} />

        <DrumSelect
          drums={samples}
          onChange={this.handleDrumChange} />

        <Ticker
          tickCount={16}
          index={tick - 1} />

        <Channel
          key={this.state.drum}
          saveFunc={this.saveChannel}
          label={this.state.drum} className="channel"
          beats={beats} bars={bars} />
      </div>
    )
  }
}

export default DrumMachine
