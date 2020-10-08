import * as React from "react";

export interface CurrentWorkoutProps {
  workout: String;
  svgPath: any;
}

const CurrentWorkout: React.SFC<CurrentWorkoutProps> = (props) => {
  const { workout, svgPath } = props;

  return (
    <div className="currentWorkout">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="outline"
        viewBox="0 0 512 512"
        width="256"
        height="256"
        fill="#006ec2"
      >
        <path d={svgPath} />
      </svg>
      <h1>{workout.toUpperCase()}</h1>
    </div>
  );
};

export default CurrentWorkout;
