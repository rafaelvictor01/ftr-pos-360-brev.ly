import axios, { AxiosError } from "axios"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

import logoIcon from "../../assets/logo-icon.svg"
import { httpClient } from "../../utils/http-client"

type AuxTypeApiReturn = {
  originalLink: string
}

export function RedirectHandler() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const path = pathname?.slice(1)

    async function handleRedirect(ctrl?: AbortController) {
      if (!path) return

      try {
        const shortCode = path?.substring(2, path.length)

        const { data } = await httpClient.get<AuxTypeApiReturn>(
          `/shortened-links/redirect/${shortCode}`,
          { signal: ctrl?.signal },
        )

        let url = data.originalLink

        if (!/^https?:\/\//i.test(url)) url = `https://${url}`

        await httpClient.patch(
          `/shortened-links/increase-access/${shortCode}`,
          { signal: ctrl?.signal },
        )

        window.location.replace(url)
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (axios.isCancel(error) || (error as any)?.name === "CanceledError") {
          return
        }

        const err = error as AxiosError

        if (err.response?.status === 404) {
          navigate("/url/not-found", { replace: true })
          return
        }

        navigate("/url/not-found", { replace: true })
      }
    }

    const controller = new AbortController()
    handleRedirect(controller)

    return () => controller.abort()
  }, [pathname, navigate])

  return (
    <div className="max-w-290 w-full h-fit flex flex-col gap-12 items-center text-center bg-gray-100 rounded-lg px-10 py-24 md:px-24 md:py-32">
      <img src={logoIcon} alt="Logotipo do site" className="h-24" />

      <h1 className="text-xl text-gray-600">Redirecionando...</h1>

      <div className="flex flex-col gap-2">
        <p className="text-md text-gray-500">
          O link será aberto automaticamente em alguns instantes.
        </p>

        <p className="text-md text-gray-500">
          Não foi redirecionado?{" "}
          <a href="/" className="text-blue-base underline">
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  )
}
