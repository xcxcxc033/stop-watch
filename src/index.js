import React from 'react';
import ReactDOM from 'react-dom';
import {} from './index.css';


export default class StopWatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sec: 0,
      milsec: 0,
      interval: null,
      ifStart: true,
      txtSec : []
    };

    this.start = this.start.bind(this);
    this.timeRun = this.timeRun.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.getTime = this.getTime.bind(this);

  }

  start(){
    this.setState({ifStart: false, interval: setInterval(this.timeRun, 10) });
  }

  reset(){
    this.setState({ ifStart: true, milsec: 0, sec: 0,  txtSec: []});
    clearInterval(this.state.interval);
  }

  stop(){
    this.setState({ ifStart: true });
    clearInterval(this.state.interval);
  }

  timeRun(){
    if(this.state.milsec <= 99){
      this.setState({milsec:this.state.milsec + 1});
    }else{
      this.setState({ sec: this.state.sec + 1, milsec: 0});
    }
  }

  getTime(){
    if(this.state.milsec <= 9){
      this.setState({
        txtSec: this.state.txtSec.concat([this.state.sec + "'0" + this.state.milsec + "'' "])
      })
    }else{
      this.setState({
        txtSec: this.state.txtSec.concat([this.state.sec + "'" + this.state.milsec + "'' "])
      })
    }

  }

  render() {
    return (
      <div className = "main">
        <div id = "showTime">
          <span id="sec">{this.state.sec}</span>
          <span>s</span>
          <span id="milsec">{this.state.milsec}</span>
        </div>

        <div className="watch">
          {this.state.ifStart === true
            ? <input type="button" className="btn btn-dark" onClick= { this.start } id="start" value="Start" />
            : <input type="button" className="btn btn-dark" onClick= { this.stop } id="stop" value="Stop" />
          }
          <input type="button" className="btn btn-dark" onClick={ this.reset } id="reset" value="Reset" />
          <input type="button" className="btn btn-dark" onClick={ this.getTime } id="getTime" value="Get Time" />

        </div>

        <div id = "content">
          <ul className="list-group">
            {
              this.state.txtSec.map((number, i) => <li key = {i}><strong>Lap {i}</strong> {number}</li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}



ReactDOM.render(<StopWatch />, document.getElementById('root'));
