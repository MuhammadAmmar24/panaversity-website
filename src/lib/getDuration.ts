export const getTimeDifference = (startTime: string | null, endTime: string | null) => {

    if (startTime === null || endTime === null) {
        return 0;
    }
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    
    // Get difference in milliseconds
    const diffMs = end.getTime() - start.getTime();
    
    // Convert to hours
    const diffHours = diffMs / (1000 * 60 * 60);
    
    return diffHours;
  };

