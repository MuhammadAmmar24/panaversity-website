export function formatTime(time: string): string {
    const date = new Date(`1970-01-01T${time}Z`);
    const formattedTime = date.toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    return formattedTime;
  }  