import React, { Component } from 'react';
import Switch from './Switch';
import _ from 'lodash';

import '../css/channel.less';

class Channel extends Component {

  constructor(props) {
    super(props);

    // build a 2d array to track the switches for each bar
    var steps = _.fill(Array(this.props.bars), 1).map(x => {
      return _.fill(Array(this.props.beats), false);
    });

    this.state = {
      label: null,
      steps: steps
    };
  }


  shouldComponentUpdate(nextProps, nextState) {
    // only rerender if the user changes the drum
    // prevents rerendering all 16 switches
    if (nextProps.label !== this.state.label) {
      this.setState({ label: nextProps.label });
      return true;
    }

    return false;
  }


  // formats steps into Dilla note notation
  mapSteps() {
    var noteMapper = (mapped, bar, i) => {
      var steps = bar.forEach((isActive, j) => {
        if (isActive) {
          var stepVal = 96 / bar.length * j + 1,
            tick = stepVal < 10 ? `0${ stepVal }` : stepVal;
          mapped.push([`1.${ i + 1 }.${ stepVal }`]);
        }
      })
      return mapped;
    }

    return this.state.steps.reduce(noteMapper, []);
  }


  // callback passed to the channel's switches
  setStep(step) {
    var steps = this.state.steps;

    steps[step.bar][step.index] = step.active;

    this.setState({ steps: steps });

    var channel = {
      id: this.state.label,
      notes: this.mapSteps()
    };

    this.props.saveFunc(channel);
  }


  render() {
    var switches = this.state.steps.map((bar, i, arr) => {
      return bar.map((step, j) => {
        return (
          <Switch key={ bar.length * i + j } index={ j } bar={ i }
            callback={this.setStep.bind(this)} />);
      });
    })

    return (
      <div className="channel">
        <h2>{this.props.label}</h2>
        { switches }
      </div>
    );
  }

}

Channel.propTypes = {
  saveFunc: React.PropTypes.func.isRequired,
  label: React.PropTypes.string,
  beats: React.PropTypes.number.isRequired,
  bars: React.PropTypes.number.isRequired
};

export default Channel;
