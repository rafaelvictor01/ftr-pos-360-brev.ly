import { CopyIcon, TrashIcon } from "@phosphor-icons/react"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { useState } from "react"

import { Button } from "../../../components/button"
import { IconButton } from "../../../components/button-icon"
import { Snackbar } from "../../../components/snackbar"
import type { ShortenedLinkSchemaDTO } from "../../../types/shortened-link"
import { httpClient } from "../../../utils/http-client"

interface ILinkProps {
  isFirstLink?: boolean
  isLoading?: boolean
  linkData?: ShortenedLinkSchemaDTO
  handleRemoveSuccess: () => void
}

export function LinkItem(props: ILinkProps) {
  const [linkCopied, setLinkCopied] = useState(false)

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletionError, setDeletionError] = useState(false)

  function handleCopyShortenedLink(): void {
    if (!props.linkData) return

    const link = `${window.location.origin}/r/${props.linkData?.shortenedLink}`
    navigator.clipboard.writeText(link)

    setLinkCopied(true)
  }

  async function handleDeleteLink(): Promise<void> {
    setIsDeleting(true)

    await httpClient
      .delete(`/shortened-links/${props.linkData?.id}`)
      .then((c) => {
        if (c.status) props.handleRemoveSuccess()
      })
      .catch(() => {
        setDeletionError(true)
      })
      .finally(() => {
        setIsDeleting(false)
      })
    setOpenDeleteDialog(false)
  }

  return (
    <>
      <div
        className="flex flex-row gap-8 md:gap-10 items-center border-t border-gray-200 pt-3 md:pt-4"
        style={{ borderTopWidth: props.isFirstLink ? "0px" : "1px" }}
      >
        <div className="flex flex-col flex-1 gap-2 overflow-hidden">
          {props.isLoading ? (
            <div className="h-9 w-2/4 bg-gray-300 rounded animate-pulse" />
          ) : (
            <a
              href={`/r/${props.linkData?.shortenedLink}`}
              target="_blank"
              rel="noreferrer"
              className="text-md text-blue-base truncate"
            >
              brev.ly/r/{props.linkData?.shortenedLink}
            </a>
          )}

          {props.isLoading ? (
            <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse" />
          ) : (
            <p className="text-sm text-gray-500 truncate">
              {props.linkData?.originalLink}
            </p>
          )}
        </div>

        {props.isLoading ? (
          <div className="h-8 w-27 bg-gray-300 rounded animate-pulse" />
        ) : (
          <p className="text-sm text-gray-500 whitespace-nowrap">
            {props.linkData?.quantityAccesses ?? 0} acessos
          </p>
        )}

        <div className="flex flex-row gap-2 items-center">
          {props.isLoading ? (
            <>
              <div className="h-16 w-16 bg-gray-300 rounded animate-pulse" />{" "}
              <div className="h-16 w-16 bg-gray-300 rounded animate-pulse" />
            </>
          ) : (
            <>
              <IconButton icon={CopyIcon} onClick={handleCopyShortenedLink} />

              <AlertDialog.Root
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
              >
                <AlertDialog.Overlay className="fixed inset-0 bg-gray-600/30 z-2" />

                <AlertDialog.Trigger asChild>
                  <IconButton icon={TrashIcon} />
                </AlertDialog.Trigger>

                <AlertDialog.Content className="w-150 z-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg shadow-gray-400 p-8 rounded-lg">
                  <AlertDialog.Title className="text-lg text-gray-600 mb-4">
                    Apagar link
                  </AlertDialog.Title>

                  <AlertDialog.Description className="text-sm text-gray-600 mb-12">
                    Você realmente quer apagar o link{" "}
                    {props.linkData?.shortenedLink}?
                  </AlertDialog.Description>

                  <div className="flex flex-row gap-4 justify-end">
                    <AlertDialog.Cancel asChild>
                      <Button
                        variant="secondary"
                        style={{ padding: "0.5rem 1.25rem" }}
                      >
                        Cancelar
                      </Button>
                    </AlertDialog.Cancel>

                    <Button
                      onClick={handleDeleteLink}
                      isLoading={isDeleting}
                      disabled={isDeleting}
                      style={{
                        width: "fit-content",
                        padding: "0.5rem 1.25rem",
                        borderRadius: "4px",
                      }}
                    >
                      Apagar
                    </Button>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </>
          )}
        </div>
      </div>

      <div className="fixed z-3">
        <Snackbar
          type="information"
          title="Link copiado com sucesso"
          description={`O link ${props.linkData ? props.linkData?.shortenedLink : "-"} foi copiado para a área de transferência`}
          duration={3000}
          open={linkCopied}
          onOpenChange={setLinkCopied}
        />

        <Snackbar
          type="error"
          title="Erro ao deletar"
          description="Por favor, tente novamente mais tarde."
          open={deletionError}
          onOpenChange={setDeletionError}
        />
      </div>
    </>
  )
}
