export async function getOriginalUrl(shortCode: string) {
  const response = await fetch(`https://api.com/urls/${shortCode}`)

  if (!response.ok) {
    throw new Response("Not Found", { status: 404 })
  }

  return response.json()
}
