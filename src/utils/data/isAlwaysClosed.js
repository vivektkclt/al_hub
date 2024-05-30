const isAlwaysClosed = (workingHours) => {
  return workingHours.every(
    (day) =>
      day?.hours?.closingTime === null || day?.hours?.openingTime === null
  );
};

export default isAlwaysClosed;
