export const fetcher = async (
  url: string,
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
  body?: {},
) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}
