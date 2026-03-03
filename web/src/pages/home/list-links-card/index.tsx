import { LinkCardContent } from "./link-card-content"
import type { ShortenedLinkSchemaDTO } from "../../../types/shortened-link"

interface IProps {
  isLoading?: boolean
  isError?: boolean
  linksData: ShortenedLinkSchemaDTO[]
  handleRemoveSuccess: () => void
}

export function ListLinksCard(props: IProps) {
  return (
    <div className="relative max-w-190 w-full md:max-w-290 md:min-w-190 h-fit flex flex-col flex-1 gap-8 md:gap-10 bg-gray-100 rounded-lg p-12 md:p-16">
      {props.isLoading && (
        <div className="absolute top-0 left-0 h-1 w-full animate-border bg-size-[100px_auto] md:bg-size-[200px_auto] bg-no-repeat bg-linear-to-r from-blue-base to-blue-base" />
      )}

      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg text-gray-600">Meus links</h2>
      </div>

      <div className="border-t border-gray-200">
        <LinkCardContent {...props} />
      </div>
    </div>
  )
}
