import * as React from 'react';
import * as io from 'socket.io-client';
import './App.css';

class App extends React.Component {
  public state: any;

  private socket: any;
  private inputTextField: HTMLInputElement | null;
  private textLog: HTMLElement | null;

  constructor(props: any) {
    super(props);
    this.state = {inputText: '', displayedText: []};
  }

  public componentDidMount() {
    this.socket = io('http://localhost:3001');
    if (this.socket) {

    }
  }

  public render() {
    return (
      <div className="App">
        <div
          className="textLog"
          ref={input => this.textLog = input}
        >
          {this.state.displayedText.map((line: string) =>
            <div className="textDiv">
              {line}
            </div>
          )}
        </div>
        <form
          name="input"
          id="textForm"
          onSubmit={(event) => { return this.handleSubmit(event); }}
        >
          <input
            name="textInput"
            type="text"
            value={this.state.inputText}
            id="textInput"
            onChange={({target}: {target: HTMLInputElement}) => this.handleTextChange(target)}
            ref={input => this.inputTextField = input}
          />
          <input
            name="submitText"
            type="submit"
            id="submitText"
            value="Send"
          />
        </form>
      </div>
    );
  }

  private handleTextChange(target: HTMLInputElement): void {
      this.setState({inputText: target.value});
  }

  private handleSubmit(event: any): boolean {
    event.preventDefault();
    if (!this.state.inputText) {
      return false;
    }
    this.addText(this.state.inputText);
    this.resetInput();
    return false;
  }

  private resetInput() {
    this.state.inputText = '';
    if (this.inputTextField) {
      this.inputTextField.value = '';
    }
  }

  private addText(text: string) {
    this.setState({displayedText: [...this.state.displayedText, text]});
  }
}

export default App;
