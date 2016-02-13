import 'materialize-css/dist/css/materialize.css';

import React from 'react';
import { render } from 'react-dom';

import Main from './components/main/main';

const App = React.createClass({
  render() {
    return <div>
      <Main />
    </div>;
  }
});

render(<App />, document.getElementById('app'));
