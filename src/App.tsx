import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import WorkoutSelector from "./components/workoutSelector";
import Workout from "./components/workout";
import "./App.css";

export interface AppProps {}

export interface AppState {
  time: number;
  type: string;
  intensity: string;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    time: 4,
    type: "core",
    intensity: "light",
  };

  handleTimeChange(e: any) {
    const time: number = e.target.value;
    this.setState({ time });
  }

  handleTypeChange(e: any) {
    const type: string = e.target.value;
    this.setState({ type });
  }

  handleIntensityChange(e: any) {
    const intensity: string = e.target.value;
    this.setState({ intensity });
  }

  render() {
    return (
      <div className="main">
        <h1 className="title">WORKOUT</h1>
        <Switch>
          <Route
            path="/workout"
            component={() => (
              <Workout
                time={this.state.time}
                type={this.state.type}
                intensity={this.state.intensity}
              />
            )}
          />
          <Route
            path="/select"
            component={() => (
              <WorkoutSelector
                onTimeChange={(event) => this.handleTimeChange(event)}
                onTypeChange={(event) => this.handleTypeChange(event)}
                onIntensityChange={(event) => this.handleIntensityChange(event)}
                time={this.state.time}
                type={this.state.type}
                intensity={this.state.intensity}
              />
            )}
          />
          <Redirect from="/" exact to="/select" />
        </Switch>
      </div>
    );
  }
}

export default App;
