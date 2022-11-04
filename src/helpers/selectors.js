export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(element => element.name === day);
  return dayObj;
}