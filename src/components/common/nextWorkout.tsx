import * as React from "react";

export interface NextWorkoutProps {
  workout: string;
}

const NextWorkout: React.SFC<NextWorkoutProps> = (props) => {
  return (
    <div className="nextWorkout">
      <p>Next workout</p>
      <h2>{props.workout}</h2>
    </div>
  );
};

export default NextWorkout;
