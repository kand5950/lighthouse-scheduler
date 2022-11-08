import React from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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

  const confirmHandler = () => {
    transition(CONFIRM)
  }
  
  const editHandler = () => {
    transition(EDIT)
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
      onDelete={confirmHandler}
      onEdit={editHandler}
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
    {mode === CONFIRM && (
      <Confirm 
        message="Would you like to delete?"
        onConfirm={deleteHandler}
        onCancel={back}
      />
    )}
    {mode === DELETING &&
      <Status message="Deleting"/>
    }
    {mode === EDIT && (
      <Form 
      student={interview.student}
      interviewers={interviewers} 
      onCancel={back}
      onSave={save}
      />
    )}
    

    </article>

    
    
  );
}