import React, { Component } from "react";
import { getUTCNow } from '../../utils';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  componentDidMount() {
    this.getTimeUntil(this.props.deadline);
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }
  leading0(num) {
    return num < 10 ? "0" + num : num;
  }
  getTimeUntil(deadline) {
    const time = deadline - getUTCNow();
    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      this.props.setEnded(true);
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({ days, hours, minutes, seconds });
    }
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return (
      <div className='flex justify-between'>
        <div className='flex flex-col text-center'>
          <span className={this.props.start ? 'date-time' : 'date-time'}>{this.leading0(this.state.days)}</span>
          <span className='date-text'>Days</span>
        </div>
        <div className='flex flex-col text-center'>
          <span className={this.props.start ? 'date-time' : 'date-time'}>{this.leading0(this.state.hours)}</span>
          <span className='date-text'>Hours</span>
        </div>
        <div className='flex flex-col text-center'>
          <span className={this.props.start ? 'date-time' : 'date-time'}>{this.leading0(this.state.minutes)}</span>
          <span className='date-text'>Minutes</span>
        </div>
        <div className='flex flex-col text-center'>
          <span className={this.props.start ? 'date-time' : 'date-time'}>{this.leading0(this.state.seconds)}</span>
          <span className='date-text'>Seconds</span>
        </div>
      </div>
    );
  }
}
export default Clock;
