
export function getIpAddress(headers: Headers): string | null {
  // Try various headers to get the real IP address
  const forwarded = headers.get('x-forwarded-for')
  const realIp = headers.get('x-real-ip')
  
  // Handle x-forwarded-for header which might contain multiple IPs
  const forwardedIps = forwarded?.split(',').map(ip => ip.trim())
  
  // Return the first available IP address
  return forwardedIps?.[0] || realIp || null
}