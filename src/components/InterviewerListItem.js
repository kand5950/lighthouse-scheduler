import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const interviewerClass = classNames('interviewers__item', 
  {'interviewers__item--selected' : props.selected});

  const formatSpots = (props) => {
    const spots = props.selected ? props.name : "";
    return spots;
  }


  return (
    <li onClick={() => props.setInterviewer(props.id)} 
    className={interviewerClass}>
  <img
    className={"interviewers__item-image"}
    src={props.avatar}
    alt={props.name}
  />
  {formatSpots(props)}
</li>
  );
}