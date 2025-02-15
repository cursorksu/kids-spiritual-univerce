// Format: yyyy-mm-dd
import { getDateToDatePicker } from './getDateLocalString'

export function getAge(birthDate) {
  const today = new Date();
	let preparedDate = JSON.parse(birthDate);
	
	if (!preparedDate.seconds) {
		preparedDate  = JSON.parse(preparedDate);
	}
	
	if (!preparedDate.seconds) {
		return 0
	}
	
  let age = today.getFullYear() - getDateToDatePicker(preparedDate)?.getFullYear();
  const monthDiff = today.getMonth() - getDateToDatePicker(preparedDate)?.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < getDateToDatePicker(preparedDate)?.getDate())
  ) {
    age--;
  }

  return age;
}
