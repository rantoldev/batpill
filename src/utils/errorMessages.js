export function authErrorMessage(e) {
  const code = e && e.code ? e.code : null
  const map = {
    'auth/email-already-in-use': 'That email is already registered. Try logging in or use a different email.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/wrong-password': "Login details you entered aren't correct!",
    'auth/user-not-found': "Login details you entered aren't correct!",
    'auth/weak-password': 'Password is too weak. Try at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/invalid-password': "Login details you entered aren't correct!",
    default: null
  }
  if (map[code]) return map[code]
  // If Firebase returned a verbose message, strip known prefixes and return the core message
  if (e && e.message) {
    // remove leading 'Firebase: ' and content in parentheses like (auth/...)
    let m = e.message.replace(/^Firebase:\s*/i, '')
    m = m.replace(/\(auth\/[^)]+\)/i, '')
    m = m.replace(/\s*:\s*/g, ': ')
    m = m.trim()
    // Avoid returning raw error codes; present a friendly fallback
    if (m && m.length > 0) return m
  }
  return 'An unexpected error occurred. Please try again.'
}
