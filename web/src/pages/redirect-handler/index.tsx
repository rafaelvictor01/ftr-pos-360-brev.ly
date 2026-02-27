import { useEffect } from "react"
import { useLoaderData } from "react-router"

export function RedirectHandler() {
  const data = useLoaderData() as { originalUrl: string }

  useEffect(() => {
    window.location.href = data.originalUrl
  }, [data])

  return <p>Redirecionando...</p>
}
