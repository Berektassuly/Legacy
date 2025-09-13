const WINDOW = 60 * 1000
const LIMIT = 10

const cache = new Map<string, { count: number; expires: number }>()

export function rateLimit(ip: string, limit: number = LIMIT, windowMs: number = WINDOW) {
  const now = Date.now()
  const entry = cache.get(ip)
  if (!entry || entry.expires < now) {
    cache.set(ip, { count: 1, expires: now + windowMs })
    return true
  }
  entry.count += 1
  if (entry.count > limit) {
    return false
  }
  return true
}
