export function isDateInFuture(dateString, filmtitle) {
  // Parse the input date string into a Date object
  const inputDate = new Date(dateString);

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    throw new Error('Invalid date format. Please use "YYYY-MM-DD".');
  }

  // Get the current date's time in milliseconds
  const currentDate = new Date();

  // Compare the input date with the current date
  // Returns true if the input date is in the future

  return inputDate.getTime() > currentDate.getTime();
}
