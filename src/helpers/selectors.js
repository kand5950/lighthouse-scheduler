export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find((element) => element.name === day);

  if (!dayObj) {
    return [];
  }

  const appointmentIds = dayObj.appointments;
  const appointmentsInfoForDay = [];

  for (const id in state.appointments) {
    if (appointmentIds.includes(Number(id))) {
      appointmentsInfoForDay.push(state.appointments[id]);
    }
  }
  return appointmentsInfoForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;

  for (const id in state.interviewers) {
    if (Number(id) === interviewerId) {
      return {
        student: interview.student,
        interviewer: state.interviewers[id],
      };
    }
  }
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find((element) => element.name === day);

  if (!dayObj) {
    return [];
  }

  const interviewIds = dayObj.interviewers;
  const interviewsInfoForDay = [];

  for (const id in state.interviewers) {
    if (interviewIds.includes(Number(id))) {
      interviewsInfoForDay.push(state.interviewers[id]);
    }
  }
  return interviewsInfoForDay;
}
