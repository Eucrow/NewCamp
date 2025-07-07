// This function is used to fix the date and time format
// removing the Z at the end of the string, which means UTC,
// and it is not supported by the input type datetime-local.
export const fixDateTime = dateTime => {
  if (dateTime) {
    const fixedDateTime = dateTime.replace("Z", "");
    return fixedDateTime;
  } else {
    return "";
  }
};
