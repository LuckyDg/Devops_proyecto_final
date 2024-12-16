import { User } from "@/app/types/user"

interface GetUsersResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

export async function getUsers(page = 0, limit = 10): Promise<GetUsersResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users?page=${page}&limit=${limit}`)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
}

