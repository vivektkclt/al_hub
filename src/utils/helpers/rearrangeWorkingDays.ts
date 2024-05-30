const reArrangeDays = (obj) => {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date().getDay(); // Get the current day of the week (0-6, where 0 is Sunday)

  const rearrangedObj = {};

  for (let i = today; i < daysOfWeek.length; i++) {
    rearrangedObj[daysOfWeek[i]] = obj[daysOfWeek[i]];
  }

  for (let i = 0; i < today; i++) {
    rearrangedObj[daysOfWeek[i]] = obj[daysOfWeek[i]];
  }
  const arr = Object.keys(rearrangedObj).map((key) => ({
    day: key.charAt(0).toUpperCase() + key.slice(1),
    hours: obj[key],
  }));
  return arr;
};

export default reArrangeDays;
