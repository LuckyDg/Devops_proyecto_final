import { User } from "@/app/types/user";

export async function registerUser(formData: FormData): Promise<User> {
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const url = `${apiUrl}/auth/register`;
  console.log('Constructed URL for registerUser:', url); 

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  return response.json();
}
