export const fetchClient = async (url: string, options: RequestInit = {}) => {
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL); 
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const fullUrl = `${apiUrl}${url}`;
  console.log('Constructed URL for fetchClient:', fullUrl); 
  
  const res = await fetch(fullUrl, {
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