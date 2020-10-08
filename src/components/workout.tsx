import * as React from "react";
import { Link } from "react-router-dom";
import CurrentWorkout from "./common/currentWorkout";
import WorkoutList from "./workoutList";
import NextWorkout from "./common/nextWorkout";

export interface WorkoutProps {
  type: string;
  time: number;
  intensity: string;
}

export interface WorkoutState {
  workout: object;
  nextWorkout: object;
  paused: boolean;
}

class Workout extends React.Component<WorkoutProps, WorkoutState> {
  workouts: Array<object> = this.getWorkouts();

  componentWillMount() {
    const workout = this.workouts[0];
    const nextWorkout = this.workouts[1];
    this.setState({ workout, nextWorkout });
  }

  getWorkouts(): Array<Object> {
    let workouts = require("../workouts.json");
    if (this.props.type === "full") {
      let tempWorkouts: Array<Object> = [];
      for (let workout in workouts) {
        tempWorkouts = [...tempWorkouts, ...workouts[workout]];
      }
      workouts = tempWorkouts;
    } else {
      workouts = workouts[this.props.type];
    }
    workouts = this.randomizeWorkouts(workouts);
    return workouts;
  }

  calculateTimeInterval(time: number): number {
    let workoutTime = time / 4;
    return workoutTime;
  }

  randomizeWorkouts(workouts: Array<Object>): Array<Object> {
    for (let i = workouts.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      let temp = workouts[i];
      workouts[i] = workouts[j];
      workouts[j] = temp;
    }

    // I'm only returning the first four since we only want 4 workouts always.
    return workouts.slice(0, 4);
  }

  handleClick = () => {
    let paused = !this.state.paused;
    this.setState({ paused });
  };

  handleWorkoutFinished = () => {
    this.workouts.splice(0, 1);
    let workout = this.state.nextWorkout;
    let nextWorkout = this.workouts[1]
      ? this.workouts[1]
      : { "Last workout!": "" };
    if (this.workouts.length === 0) {
      workout = { "All done!": "" };
      this.setState({ paused: true });
    }
    this.setState({ workout, nextWorkout });
  };

  render() {
    const { workout, nextWorkout, paused } = this.state;
    const time = this.calculateTimeInterval(this.props.time * 60);

    return (
      <div className="workout">
        <CurrentWorkout
          workout={Object.keys(workout)[0]}
          svgPath={Object.values(workout)[0]}
        />
        <NextWorkout workout={Object.keys(nextWorkout)[0]} />
        <WorkoutList
          intensity={this.props.intensity}
          paused={paused}
          time={time}
          onWorkoutFinished={this.handleWorkoutFinished}
        />
        <Link className="btn btn-link" to="/select">
          <h2>Back</h2>
        </Link>
        <button className="btn btn-button" onClick={this.handleClick}>
          {this.state.paused ? "Go" : "Pause"}
        </button>
      </div>
    );
  }
}

export default Workout;
