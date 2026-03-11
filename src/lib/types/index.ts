export type UserRole = 'admin' | 'client';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  photoURL?: string;
  address?: string;
  emergencyContact?: string;
  joinDate: string;
  isActive: boolean;
  trainerId?: string;
  membershipPlanId?: string;
  membershipStart?: string;
  membershipExpiry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  isPopular?: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  planId: string;
  planName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  method?: 'cash' | 'card' | 'upi' | 'bank_transfer';
  invoiceNumber: string;
  dueDate: string;
  paidDate?: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  userId: string;
  userName: string;
  checkIn: string;
  checkOut?: string;
  date: string;
  method: 'qr' | 'manual';
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  experience: number;
  photoURL?: string;
  bio: string;
  assignedMembers: string[];
  isActive: boolean;
  createdAt: string;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  trainerId: string;
  title: string;
  exercises: Exercise[];
  dayOfWeek: string;
  notes?: string;
  createdAt: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  restTime?: number;
  notes?: string;
}

export interface DietPlan {
  id: string;
  userId: string;
  trainerId: string;
  title: string;
  meals: Meal[];
  totalCalories: number;
  notes?: string;
  createdAt: string;
}

export interface Meal {
  name: string;
  time: string;
  items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  source: 'website' | 'referral' | 'walk-in';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}
