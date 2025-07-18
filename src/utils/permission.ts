import { User } from '../types/user';

export function canCreatePost(user: User | null) {
  return user?.accountType === 'admin' || user?.accountType === 'user';
}

export function canDeletePost(user: User | null) {
  return user?.accountType === 'admin';
}
