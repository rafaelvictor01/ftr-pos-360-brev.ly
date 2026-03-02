import { WarningCircleIcon, XIcon } from "@phosphor-icons/react"
import * as ToastRadix from "@radix-ui/react-toast"

type ToastProps = {
  type: "error" | "information"
  title: string
  description: string
  duration?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Snackbar(props: ToastProps) {
  const color = props.type === "error" ? "danger" : "blue-base"

  const textColor = props.type === "error" ? "text-danger" : "text-blue-base"
  const backgroundColor =
    props.type === "error" ? "bg-[#f1d4da]" : "bg-[#d6d8ef]"

  return (
    <ToastRadix.Provider swipeDirection="right">
      <ToastRadix.Root
        open={props.open}
        onOpenChange={props.onOpenChange}
        duration={props.duration || 5000}
        className={`max-w-[94vw] w-180 flex flex-row gap-6 items-start justify-start ${backgroundColor} p-8 rounded-lg shadow-lg shadow-gray-300`}
      >
        <WarningCircleIcon
          color={`var(--color-${color})`}
          size="1.25rem"
          weight="fill"
        />

        <div className="flex-1">
          <ToastRadix.Title className={`text-md ${textColor}`}>
            {props.title}
          </ToastRadix.Title>

          <ToastRadix.Description className={`text-sm ${textColor} mt-2`}>
            {props.description}
          </ToastRadix.Description>
        </div>

        <ToastRadix.Action
          altText="Botão para fechar a caixa de aviso"
          className={`cursor-pointer ${textColor}`}
        >
          <XIcon />
        </ToastRadix.Action>
      </ToastRadix.Root>

      <ToastRadix.Viewport className="z-3 fixed bottom-6 left-1/2 transform -translate-x-1/2 md:bottom-12 md:right-12 md:left-auto md:transform-none md:translate-x-0" />
    </ToastRadix.Provider>
  )
}
