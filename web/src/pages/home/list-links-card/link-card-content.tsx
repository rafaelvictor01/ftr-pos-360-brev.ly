import { LinkBreakIcon, LinkIcon, Spinner } from "@phosphor-icons/react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { useMemo } from "react"

import { LinkItem } from "./link-item"
import { EmptyBanner } from "../../../components/empty-banner"
import type { ShortenedLinkSchemaDTO } from "../../../types/shortened-link"

interface IProps {
  isLoading?: boolean
  isError?: boolean
  linksData: ShortenedLinkSchemaDTO[]
  handleRemoveSuccess: () => void
}

export function LinkCardContent(props: IProps) {
  const quantityOfLinks = useMemo(
    () => props.linksData.length ?? 0,
    [props.linksData],
  )

  if (quantityOfLinks === 0) {
    return (
      <EmptyBanner
        icon={<LinkIcon size="2rem" color="var(--color-gray-400)" />}
        description="Ainda não existem links cadastrados"
      />
    )
  }

  if (props.isError) {
    return (
      <EmptyBanner
        icon={<LinkBreakIcon size="2rem" color="var(--color-danger)" />}
        description="Erro ao carregar os links cadastrados"
      />
    )
  }

  if (props.isLoading) {
    return <EmptyBanner icon={<Spinner />} description="Carregando links..." />
  }

  return (
    <ScrollArea.Root type="auto" className="w-full">
      <ScrollArea.Viewport
        className="overflow-hidden"
        style={{
          maxHeight: "calc(100vh - 21rem)",
          minHeight: quantityOfLinks < 4 ? "fit-content" : "14.125rem",
        }}
      >
        <div className="md:w-full flex flex-col gap-3 md:gap-4">
          {props.linksData.map((linkData, index) => {
            return (
              <LinkItem
                key={linkData.id}
                linkData={linkData}
                isFirstLink={index === 0}
                handleRemoveSuccess={props.handleRemoveSuccess}
              />
            )
          })}
        </div>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex w-4 -mr-7 bg-gray-200 rounded-full transition-colors duration-150 ease-out"
      >
        <ScrollArea.Thumb className="flex-1 rounded-full bg-blue-base hover:bg-blue-dark" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
