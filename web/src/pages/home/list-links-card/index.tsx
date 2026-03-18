import { DownloadSimpleIcon } from "@phosphor-icons/react"
import { useState } from "react"

import { LinkCardContent } from "./link-card-content"
import { Button } from "../../../components/button"
import { Snackbar } from "../../../components/snackbar"
import { downloadUrl } from "../../../services/download-url"
import type { ShortenedLinkSchemaDTO } from "../../../types/shortened-link"
import { httpClient } from "../../../utils/http-client"

type ExportOutput = {
  reportUrl: string
}

interface IProps {
  isLoading?: boolean
  isError?: boolean
  linksData: ShortenedLinkSchemaDTO[]
  handleRemoveSuccess: () => void
}

export function ListLinksCard(props: IProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState(false)

  async function handleExportCSV(): Promise<void> {
    setIsDownloading(true)

    try {
      const { data } = await httpClient.get<ExportOutput>(
        "/shortened-links/export",
      )

      await downloadUrl(data.reportUrl)
    } catch {
      setDownloadError(true)
    }

    setIsDownloading(false)
  }

  return (
    <div className="relative max-w-190 w-full md:max-w-290 md:min-w-190 h-fit flex flex-col flex-1 gap-8 md:gap-10 bg-gray-100 rounded-lg p-12 md:p-16">
      {props.isLoading && (
        <div className="absolute top-0 left-0 h-1 w-full animate-border bg-size-[100px_auto] md:bg-size-[200px_auto] bg-no-repeat bg-linear-to-r from-blue-base to-blue-base" />
      )}

      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg text-gray-600">Meus links</h2>

        <Button
          variant="secondary"
          icon={DownloadSimpleIcon}
          onClick={handleExportCSV}
          isLoading={isDownloading}
          disabled={isDownloading}
        >
          Baixar CSV
        </Button>
      </div>

      <div className="border-t border-gray-200">
        <LinkCardContent {...props} />
      </div>

      <Snackbar
        type="error"
        open={downloadError}
        onOpenChange={setDownloadError}
        title="Erro ao realizar o download"
        description="Por favor, tente novamente mais tarde."
      />
    </div>
  )
}
