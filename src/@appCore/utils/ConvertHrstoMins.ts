export const minsToHrs = (ifHrs) => {
  const hours = parseInt(ifHrs, 10);
  const minutes = hours * 60;
  return minutes;
};
