import React, { Component } from 'react';
import Channel from './Channel';
import Ticker from './Ticker';
import Toggle from './Toggle';
import Slider from './Slider';
import Dilla from 'dilla';
import axios from 'axios';
import { sounds as soundNames } from '../../samples/samples';

import '../css/drum-machine.less';

const beats = 4;
const bars = 1;

class DrumMachine extends Component {

  constructor(props) {
    super(props);

    this.beats = beats;
    this.bars = bars;
    this.samples = soundNames;
    this.sounds = {};

    this.state = {
      tick: 1,
      drum: null
    };
  }


  componentWillMount() {
    // grab an audio context
    this.context = new window.AudioContext();
    this.tempo = 100;

    // Dilla options
    var options = {
      tempo: this.tempo,
      beatsPerBar: this.beats,
      loopLength: this.bars
    };

    // instantiate Dilla (timer)
    this.timer = new Dilla(this.context, options);

    // queue up requests for all samples
    var requests = this.samples.map(name => {
      var config = { name: name, responseType: 'arraybuffer' };
      return axios.get(`/samples/${name}.wav`, config);
    });

    axios.all(requests).then(this.initSounds.bind(this));
  }


  componentDidMount() {
    this.clock = document.getElementById('clock');

    this.timer.on('step', step => {
      if (step.event === 'start') this.onStart(step);
      if (step.event === 'stop') this.onStop(step);
    });

    this.timer.on('tick', tick => {
      var pos = tick.position.split('.'),
        beat = +pos[1],
        step = +pos[2];

      var t = this.beats * (beat - 1) + Math.ceil(step / (96 / this.beats));

      if (this.state.tick !== t) {
        this.setState({ tick: t });
      }

      this.clock.innerHTML = tick.position;
    });
  }


  // decode and save each sound buffer
  initSounds(responses) {
    responses.forEach((res, i) => {
      if (i === 0) {
        var firstSound = responses[0].config.name;
        this.setState({ drum: this.sounds[firstSound] })
      }

      this.context.decodeAudioData(res.data, buf => {
        this.sounds[res.config.name] = buf;
      });
    });

  }


  handleDrumChange(e) {
    this.setState({ drum: e.target.value });
  }


  handleTempoChange(e) {
    var tempo = +e.target.value;

    if (this.tempo === tempo) return;

    this.tempo = tempo;
    this.timer.setTempo(this.tempo);
  }


  onStart(step) {
    this.playSound(step.id, step.time);
  }


  onStop(step) {
    var source = step.args.source;
    var gainVolume = step.args.gain || 1;

    source.gainNode.gain.setValueAtTime(gainVolume, step.time);
    source.gainNode.gain.linearRampToValueAtTime(0, step.time + 0.01);
  }


  togglePlay() {
    this.timer[this.state.playing ? 'pause' : 'start']();
    this.setState({ playing: !this.state.playing });
  }


  saveChannel(channel) {
    this.timer.set(channel.id, channel.notes);
  }


  playSound(sound, time) {
    var play = this.context.createBufferSource();
    play.buffer = this.sounds[sound];
    play.connect(this.context.destination);
    play.start(time);
  }


  render() {
    var bars = this.props.bars,
      beats = this.props.beats,
      drums = Object.keys(this.sounds);

    var options = Object.keys(this.sounds).map((drum, i) => {
      return <option key={i} value={drum}>{drum}</option>;
    });

    return (
      <div className="machine">
        <div className="clock" id="clock">0.0.00</div>
        <Toggle id="play" callback={this.togglePlay.bind(this)} />
        <Slider min={50} max={300} step={5}
          handleChange={this.handleTempoChange.bind(this)} />
        <select value={this.state.drum} onChange={this.handleDrumChange.bind(this)}>
          {options}
        </select>
        <Ticker tickCount={16} index={this.state.tick - 1} />
        <Channel key={this.state.drum} saveFunc={this.saveChannel.bind(this)}
          label={this.state.drum} className="channel"
          beats={beats} bars={bars} />
      </div>
    );
  }
}

export default DrumMachine;
