import type { AxiosResponse } from "axios"
import axios from "axios"
import { useEffect, useState } from "react"

import { ListLinksCard } from "./list-links-card"
import { NewLink } from "./new-link-card"
import logo from "../../assets/logo.svg"
import type { ShortenedLinkSchemaDTO } from "../../types/shortened-link"
import { httpClient } from "../../utils/http-client"

type AuxTypeApiReturn = {
  total?: number
  data: ShortenedLinkSchemaDTO[]
}

export function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const [listOfLinks, setListOfLinks] = useState<ShortenedLinkSchemaDTO[]>([])

  useEffect(() => {
    const ctrl = new AbortController()

    async function fetchLinks() {
      try {
        setIsLoading(true)
        setIsError(false)

        const response: AxiosResponse<AuxTypeApiReturn> = await httpClient.get(
          "/shortened-links",
          { signal: ctrl.signal },
        )

        if (response.status === 200 && response.data)
          setListOfLinks(response.data.data ?? [])
        else setIsError(true)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (axios.isCancel(error) || error.name === "CanceledError") return

        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLinks()

    return () => ctrl.abort()
  }, [])

  async function reFetchLinks() {
    try {
      setIsLoading(true)
      setIsError(false)

      const response: AxiosResponse<AuxTypeApiReturn> =
        await httpClient.get("/shortened-links")

      if (response.status === 200 && response.data) {
        setListOfLinks(response.data.data ?? [])
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full md:max-w-490 md:w-[calc(100vw - 1.5rem)] md:mt-25 flex flex-col items-center md:items-start gap-16">
      <img src={logo} className="h-12" alt="Logo da Brev.Ly" />

      <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-10">
        <NewLink handleCreateSuccess={reFetchLinks} />

        <ListLinksCard
          isLoading={isLoading}
          isError={isError}
          linksData={listOfLinks}
          handleRemoveSuccess={reFetchLinks}
        />
      </div>
    </div>
  )
}
