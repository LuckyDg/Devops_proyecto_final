import { User } from "@/app/types/user"

export async function registerUser(formData: FormData): Promise<User> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to register user')
  }

  return response.json()
}

