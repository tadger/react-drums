import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';

import DrumMachine from './components/DrumMachine';

class App {

  constructor(options) {
    this.state = options.state;
  }


  render(element) {
    var appRootElement = <DrumMachine beats={4} bars={4} state={this.state} />;

    if (element) {
      ReactDOM.render(appRootElement, element);
      return;
    }
  }

}

export default App;
