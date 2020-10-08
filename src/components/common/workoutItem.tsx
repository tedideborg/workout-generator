import * as React from "react";

export interface WorkoutItemProps {
  type: String;
  time: Number;
  active: boolean;
}

const WorkoutItem: React.SFC<WorkoutItemProps> = (props) => {
  return (
    <h2 className={props.active ? "workoutItem" : "workoutItem inactive"}>
      {props.type}
      <span className="workoutItemTimer">{props.time}</span>
    </h2>
  );
};

export default WorkoutItem;
