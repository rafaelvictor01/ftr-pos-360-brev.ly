import { type IconProps } from "@phosphor-icons/react"
import { type ComponentProps, type ComponentType } from "react"

type IconButtonProps = ComponentProps<"button"> & {
  icon: ComponentType<IconProps>
}

export function IconButton(props: IconButtonProps) {
  const { icon: Icon } = props

  return (
    <button
      className="cursor-pointer transition-all duration-300 bg-gray-200 border border-gray-200 rounded-sm p-3.5 hover:not-disabled:border-blue-base disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      <Icon size="1rem" color="var(--color-gray-600)" />
    </button>
  )
}
