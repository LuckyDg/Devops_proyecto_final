export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  profileImageUrl: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
