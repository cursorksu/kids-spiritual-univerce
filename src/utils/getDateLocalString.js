import dateFormat from 'dateformat';

export const getDateLocalString = (timestamp) => {
  const milliseconds =
    timestamp &&
    timestamp?.seconds * 1000 + Math.round(timestamp?.nanoseconds / 1e6);
  const newDate = timestamp && new Date(milliseconds);

  return timestamp && dateFormat(newDate, 'dd.mm.yyyy');
};
export const getDateObject = (timestamp) => {
  const milliseconds =
    timestamp?.seconds * 1000 + Math.round(timestamp?.nanoseconds / 1e6);
  const newDate = new Date(milliseconds);

  return newDate;
};

export const getDateToDatePicker = (timestamp) => {
	let currentTimestamp = timestamp;
	if (typeof timestamp === 'string') {
		currentTimestamp = JSON.parse(timestamp);
	}
	
	const milliseconds = currentTimestamp.seconds * 1000
	const newDate = new Date(milliseconds);
	
	if (isNaN(newDate.getTime())) {
		console.warn('Failed to create a valid date from timestamp:', timestamp);
		return null;
	}
	
	return newDate;
};
