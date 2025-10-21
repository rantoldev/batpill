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
  return map[code] || (e && e.message) || 'An unexpected error occurred. Please try again.'
}
