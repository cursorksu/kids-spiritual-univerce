export const getDateFromTimeStep = (timeStep) => {
  const date = timeStep.toDate();
  return date.toLocaleDateString();
};

export const getTimeStepFromString = (string) => {
  const [day, month, year] = string.split('.');
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  const seconds = Math.floor(date.getTime() / 1000);

  return {
    seconds: seconds,
    nanoseconds: 0,
  };
};
