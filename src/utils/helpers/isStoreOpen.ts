const isStoreOpen = (startTime, endTime) => {
  if (
    startTime !== null &&
    endTime !== null &&
    startTime &&
    endTime &&
    startTime !== "null" &&
    endTime !== "null"
  ) {
    console.log(startTime, "STORE_TIME___", startTime != null);

    // Get the current time
    const currentTime = new Date();

    // Parse the start time
    const start: any = new Date();
    const [startHour, startMinute] = startTime.split(":").map(Number);
    start.setHours(startHour, startMinute, 0);

    // Parse the end time
    const end: any = new Date();
    const [endHour, endMinute] = endTime.split(":").map(Number);
    end.setHours(endHour, endMinute, 0);

    // Calculate the difference in hours
    const timeDifference = (end - start) / (1000 * 60 * 60);
    console.log(end, "ENDDDD", timeDifference);
    // Check if the end time is on the next day
    if (end < start) {
      return currentTime >= start || currentTime <= end ? "Open" : "Closed";
    } else if (timeDifference > 23.5 || timeDifference == 0) {
      return "24hr";
    } else {
      // Check if the current time is between startTime and endTime
      return currentTime >= start && currentTime <= end ? "Open" : "Closed";
    }
  } else {
    return startTime != null &&
      endTime != null &&
      startTime != "null" &&
      endTime != "null"
      ? "Closed"
      : "off_day";
  }
};

export default isStoreOpen;
