import { User } from '../types/auth';

export function isUserOrAdmin(user: User | null) {
  return user?.accountType === 'admin' || user?.accountType === 'user';
}

export function isAdmin(user: User | null) {
  return user?.accountType === 'admin';
}
