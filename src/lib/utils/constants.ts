export const APP_NAME = 'IronForge';

export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
} as const;

export const PAYMENT_STATUS = {
  PAID: 'paid',
  PENDING: 'pending',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
} as const;

export const INQUIRY_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  CONVERTED: 'converted',
  CLOSED: 'closed',
} as const;

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const SPECIALIZATIONS = [
  'Strength Training',
  'Cardio',
  'Yoga',
  'CrossFit',
  'Pilates',
  'Boxing',
  'Nutrition',
  'Weight Loss',
  'Muscle Building',
  'Rehabilitation',
  'HIIT',
  'Functional Training',
];
