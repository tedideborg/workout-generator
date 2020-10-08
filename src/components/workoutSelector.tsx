import React from "react";
import { Link } from "react-router-dom";

export interface WorkoutSelectorProps {
  onTimeChange: any;
  onTypeChange: any;
  onIntensityChange: any;
  time: number;
  type: string;
  intensity: string;
}

const WorkoutSelector: React.SFC<WorkoutSelectorProps> = (props) => {
  return (
    <>
      {/* <h1 id="workout">Workout Selector</h1> */}
      <div className="selection">
        <h1>I have </h1>
        <select value={props.time} onChange={props.onTimeChange}>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={14}>14</option>
          <option value={20}>20</option>
          <option value={24}>24</option>
          <option value={30}>30</option>
        </select>
        <h1>Minutes</h1>
      </div>

      <div className="selection">
        <h1>To focus on </h1>
        <select
          value={props.type}
          onChange={props.onTypeChange}
          name="area"
          id="selectArea"
        >
          <option value="upper">Upper body</option>
          <option value="core">Core</option>
          <option value="lower">Lower body</option>
          <option value="full">Full body</option>
        </select>
      </div>

      <div className="selection">
        <h1>With </h1>
        <select
          value={props.intensity}
          onChange={props.onIntensityChange}
          name="intensity"
          id="selectIntensity"
        >
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <h1>intensity</h1>
      </div>

      <Link className="btn btn-link" to="/workout">
        <h2>GO</h2>
      </Link>

      <div id="flatIcons">
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/ultimatearm"
          title="ultimatearm"
        >
          ultimatearm
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  );
};

export default WorkoutSelector;
