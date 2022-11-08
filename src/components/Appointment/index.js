import React from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"

export default function Appointment(props) {

  const { interview, time, interviewers, bookInterview, id, cancelInterview } = props;

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
    .then(() => transition(SHOW));
  }
  
  const deleteHandler = () => {
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(EMPTY));

  }

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  return (
    
    <article className="appointment">
    <Header time={time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show 
      student={interview.student}
      interviewer={interview.interviewer.name}
      onDelete={deleteHandler}
      />
    )}
    {mode === CREATE && (
      <Form 
      interviewers={interviewers} 
      onCancel={back}
      onSave={save}
      />
    )}
    {mode === SAVING && 
    <Status message="Saving"/>
    }
    {mode === DELETING &&
    <Status message="Deleting"/>
    }
    </article>
    
    
  );
}