import * as React from "react";
import WorkoutItem from "./common/workoutItem";

export interface WorkoutListProps {
  time: number;
  onWorkoutFinished: any;
  paused: boolean;
  intensity: string;
}

export interface WorkoutListState {
  currentTimer: number;
}

class WorkoutList extends React.Component<WorkoutListProps, WorkoutListState> {
  state = {
    currentTimer: this.calculateTimers(false),
  };

  timers: Array<number> = [0, 1, 2, 3, 4, 5];
  currentTimers: Array<number> = [...this.timers];

  intervalTimer = setInterval(() => {
    this.calculateIntervalTimer();
  }, 1000);

  clearedInterval = false;

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  timerFinished(): void {
    this.currentTimers.splice(0, 1);
    if (this.currentTimers.length === 0) {
      this.props.onWorkoutFinished();
      this.currentTimers = [...this.timers];
    }
  }

  calculateTimers(rest: boolean): number {
    let time = this.props.time / 6;
    const intensity = {
      light: -0.2,
      medium: 0.2,
      high: 0.8,
    };
    let intensityValue = intensity[this.props.intensity];

    if (!rest) {
      time += Math.round(time * intensityValue);
    } else {
      time -= Math.round(time * intensityValue);
    }
    return time;
  }

  showingCountdown(rest: boolean, index: number): number {
    return this.currentTimers[0] === index
      ? this.state.currentTimer
      : this.currentTimers[0] < index
      ? this.calculateTimers(rest)
      : 0;
  }

  calculateIntervalTimer = () => {
    let newTime = this.state.currentTimer;
    newTime--;
    if (newTime <= 0) {
      this.timerFinished();
      this.setState({
        currentTimer: this.calculateTimers(this.currentTimers.length % 2 !== 0),
      });
      return;
    }
    this.setState({ currentTimer: newTime });
  };

  render() {
    if (this.props.paused) {
      clearInterval(this.intervalTimer);
      this.clearedInterval = true;
    } else if (!this.props.paused && this.clearedInterval) {
      this.clearedInterval = false;
      this.intervalTimer = setInterval(() => {
        this.calculateIntervalTimer();
      }, 1000);
    }

    return (
      <div className="workoutList">
        <WorkoutItem
          type="workout"
          active={this.currentTimers[0] <= 0}
          time={this.currentTimers[0] === 0 ? this.state.currentTimer : 0}
        />
        <WorkoutItem
          type="break"
          active={this.currentTimers[0] <= 1}
          time={this.showingCountdown(true, 1)}
        />
        <WorkoutItem
          type="workout"
          active={this.currentTimers[0] <= 2}
          time={this.showingCountdown(false, 2)}
        />
        <WorkoutItem
          type="break"
          active={this.currentTimers[0] <= 3}
          time={this.showingCountdown(true, 3)}
        />
        <WorkoutItem
          type="workout"
          active={this.currentTimers[0] <= 4}
          time={this.showingCountdown(false, 4)}
        />
        <WorkoutItem
          type="break"
          active={this.currentTimers[0] <= 5}
          time={this.showingCountdown(true, 5)}
        />
      </div>
    );
  }
}

export default WorkoutList;
