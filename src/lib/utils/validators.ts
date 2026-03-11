export function validateEmail(email: string): string | null {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? null : 'Invalid email address';
}

export function validatePhone(phone: string): string | null {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone) ? null : 'Enter valid 10-digit Indian phone number';
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain a number';
  return null;
}

export function validateRequired(value: string, fieldName = 'Field'): string | null {
  return value.trim() ? null : `${fieldName} is required`;
}

export function validateMinLength(value: string, min: number, fieldName = 'Field'): string | null {
  return value.length >= min ? null : `${fieldName} must be at least ${min} characters`;
}

export function validateMaxLength(value: string, max: number, fieldName = 'Field'): string | null {
  return value.length <= max ? null : `${fieldName} must be at most ${max} characters`;
}

export function validatePositiveNumber(value: number, fieldName = 'Value'): string | null {
  return value > 0 ? null : `${fieldName} must be a positive number`;
}
