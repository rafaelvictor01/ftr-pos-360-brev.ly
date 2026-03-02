import {
  DownloadSimpleIcon,
  LinkBreakIcon,
  LinkIcon,
} from "@phosphor-icons/react"
import * as ScrollArea from "@radix-ui/react-scroll-area"

import { Button } from "../../../components/button"
import { EmptyBanner } from "../../../components/empty-banner"
import { Spinner } from "../../../components/spinner"

const listOfLinksIsRefetching = false
const isDownloadingCSV = false
const listOfLinksIsEmpty = false
const listOfLinksIsError = false
const quantityOfLinks = 10
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listOfLinks: any[] = []

export function ListLinksCard() {
  function handleExportCSV() {
    console.log("Export CSV...")
  }

  return (
    <div className="relative max-w-190 w-full md:max-w-290 md:min-w-190 h-fit flex flex-col flex-1 gap-8 md:gap-10 bg-gray-100 rounded-lg p-12 md:p-16">
      {listOfLinksIsRefetching && (
        <div className="absolute top-0 left-0 h-1 w-full animate-border bg-size-[100px_auto] md:bg-size-[200px_auto] bg-no-repeat bg-linear-to-r from-blue-base to-blue-base" />
      )}

      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg text-gray-600">Meus links</h2>

        <Button
          variant="secondary"
          icon={DownloadSimpleIcon}
          onClick={handleExportCSV}
          isLoading={isDownloadingCSV}
          disabled={isDownloadingCSV}
        >
          Baixar CSV
        </Button>
      </div>

      <div className="border-t border-gray-200">
        {listOfLinksIsError ? (
          <EmptyBanner
            icon={<LinkBreakIcon size="2rem" color="var(--color-danger)" />}
            description="Erro ao carregar os links cadastrados"
          />
        ) : !listOfLinks ? (
          <EmptyBanner icon={<Spinner />} description="Carregando links..." />
        ) : listOfLinksIsEmpty ? (
          <EmptyBanner
            icon={<LinkIcon size="2rem" color="var(--color-gray-400)" />}
            description="Ainda não existem links cadastrados"
          />
        ) : (
          <ScrollArea.Root type="auto" className="w-full">
            <ScrollArea.Viewport
              className="overflow-hidden"
              style={{
                maxHeight: "calc(100vh - 21rem)",
                minHeight: quantityOfLinks < 4 ? "fit-content" : "14.125rem",
              }}
            >
              <div className="md:w-full flex flex-col gap-3 md:gap-4">
                {/* {listOfLinks.pages.map(({ page, data }) =>
                  data.map((link, index) => {
                    const isFirstLink = index === 0 && page === 1

                    return (
                      <Link
                        key={link.id}
                        isFirstLink={isFirstLink}
                        info={link}
                      />
                    )
                  }),
                )} */}
              </div>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              orientation="vertical"
              className="flex w-4 -mr-7 bg-gray-200 rounded-full transition-colors duration-150 ease-out"
            >
              <ScrollArea.Thumb className="flex-1 rounded-full bg-blue-base hover:bg-blue-dark" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        )}
      </div>
    </div>
  )
}
