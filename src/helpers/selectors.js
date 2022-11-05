export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(element => element.name === day);
  
  const results = [];

  if (!dayObj) {
    return [];
  } 

  const appointmentIds = dayObj.appointments
  const appointmentsInfoForDay = [];
  
  for (const id in state.appointments){
    if (appointmentIds.includes(Number(id))) {
      appointmentsInfoForDay.push(state.appointments[id]);
    }
    
  }
  return appointmentsInfoForDay;


}