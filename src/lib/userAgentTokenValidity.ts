export async function userAgentTokenValidity() {
    try {
      const response = await fetch("/api/validate-token", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      if (!response.ok) {
        return false;
      }
  
      const data = await response.json();
      return data.valid;
    } catch (error) {
      return false;
    }
  }