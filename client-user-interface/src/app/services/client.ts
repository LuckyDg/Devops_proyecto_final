export const fetchClient = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error('Error al realizar la petición');
  }

  return res.json();
};
