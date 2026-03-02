import type { ComponentProps, ReactElement } from "react"

type EmptyStateProps = {
  icon: ReactElement
  description: string
} & ComponentProps<"div">

export function EmptyBanner(props: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 mt-16 mb-12"
      {...props}
    >
      {props.icon}

      <p className="text-xs text-gray-500 uppercase text-center">
        {props.description}
      </p>
    </div>
  )
}
