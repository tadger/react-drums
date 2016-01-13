import React, { Component } from 'react';
import classNames from 'classnames';

import '../css/switch.less';

class Switch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }


  handleClick() {
    this.toggle(this.props.callback);
  }


  toggle(callback) {
    this.setState({ active: !this.state.active }, () => {
      callback({
        index: this.props.index,
        bar: this.props.bar,
        active: this.state.active
      });
    });
  }


  render() {
    var switchClass = classNames({
      'switch': true,
      'on': this.state.active,
      'off': !this.state.active,
      'sw-color-1': this.props.bar === 0,
      'sw-color-2': this.props.bar === 1,
      'sw-color-3': this.props.bar === 2,
      'sw-color-4': this.props.bar === 3
    });

    return (
      <div className={switchClass} onClick={this.handleClick.bind(this)}>
        <div></div>
      </div>
    );
  }

}

Switch.propTypes = {
  index: React.PropTypes.number.isRequired,
  bar: React.PropTypes.number.isRequired,
  callback: React.PropTypes.func
};

export default Switch;
