export function formatTimeToUserGMT(utcTime: string | null) {
  if (!utcTime) return "";
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getUTCDate()).padStart(2, "0");

  // Combine the current date with the given time
  const utcString = `${year}-${month}-${day}T${utcTime}Z`;


  const date = new Date(utcString);

  // Get the user's timezone offset in minutes (negative for GMT+)
  const timezoneOffsetMinutes = -date.getTimezoneOffset();

  // Convert offset to hours for GMT (e.g., GMT+5 or GMT-8)
  const offsetHours = Math.floor(timezoneOffsetMinutes / 60);
  const offsetMinutes = Math.abs(timezoneOffsetMinutes % 60);

  // Adjust the UTC time by the timezone offset
  const localTime = new Date(
    date.getTime() + timezoneOffsetMinutes * 60 * 1000,
  );

  // Format as "GMT+X" or "GMT-X"
  const gmtSign = offsetHours >= 0 ? "+" : "-";
  const gmtOffset = `GMT${gmtSign}${Math.abs(offsetHours)}${
    offsetMinutes > 0 ? `:${String(offsetMinutes).padStart(2, "0")}` : ""
  }`;

  // Format the time as HH:mm:ss
  const hours = localTime.getUTCHours().toString().padStart(2, "0");
  const minutes = localTime.getUTCMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes} (${gmtOffset})`;

  return formattedTime;
}

