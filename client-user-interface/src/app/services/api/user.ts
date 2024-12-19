import { User } from "@/app/types/user"

interface GetUsersResponse {
  users: User[] 
  total: number 
  page: number 
  limit: number
}

export async function getUsers(page = 0, limit = 10): Promise<GetUsersResponse> {
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const url = `${apiUrl}/auth/users?page=${page}&limit=${limit}`;
  console.log('Constructed URL for getUsers:', url);
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

export async function deleteUser(id: string): Promise<void> {
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const url = `${apiUrl}/auth/users/${id}`;
  console.log('Constructed URL for deleteUser:', url);

  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}