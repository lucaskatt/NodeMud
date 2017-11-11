import * as React from 'react';
import * as io from 'socket.io-client';
import './App.css';

class App extends React.Component {
  state = {prompt: ''};
  private socket: any;

  componentDidMount() {
    this.socket = io('http://localhost:3001');

    fetch('/prompt')
      .then((res: any) => res.text())
      .then((prompt: string) => this.setState({ prompt }));
  }

  render() {
    return (
      <div className="App">
        {this.state.prompt}
      </div>
    );
  }
}

export default App;
