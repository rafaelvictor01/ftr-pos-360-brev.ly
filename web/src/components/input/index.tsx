import { WarningIcon } from "@phosphor-icons/react"
import { type ComponentProps, useEffect, useState } from "react"
import { tv } from "tailwind-variants"

import { getTextWidth } from "../../utils/get-text-width"

const labelVariants = tv({
  base: "text-xs text-gray-500 uppercase focus:font-bold peer-focus:font-bold",
  variants: {
    intent: {
      default: "peer-focus:text-blue-base",
      error: "peer-focus:text-danger",
    },
  },
  defaultVariants: {
    intent: "default",
  },
})

const inputVariants = tv({
  base: "peer z-1 text-md text-gray-600 font-normal border border-gray-300 caret-blue-base rounded-lg py-7 placeholder:text-gray-400",
  variants: {
    intent: {
      default: "focus:outline-blue-base",
      error: "focus:outline-danger",
    },
  },
  defaultVariants: {
    intent: "default",
  },
})

type InputProps = ComponentProps<"input"> & {
  id: string
  label: string
  fixedPlaceholder?: string
  error?: string
}

export function Input(props: InputProps) {
  const [fixedPlaceholderWidth, setFixedPlaceholderWidth] = useState(0)

  useEffect(() => {
    document.fonts.ready.then(() => {
      const width = props.fixedPlaceholder
        ? getTextWidth(props.fixedPlaceholder, "14px Open Sans")
        : 0

      setFixedPlaceholderWidth(width)
    })
  }, [props.fixedPlaceholder])

  const intent = props.error ? "error" : "default"

  const hasError = Boolean(props.error)
  const errorId = hasError ? `${props.id}-error` : undefined

  return (
    <div className="relative max-w-176 w-full flex flex-col-reverse gap-4">
      {props.error && (
        <div className="flex flex-row items-center gap-4">
          <WarningIcon size="1rem" color="var(--color-danger)" />

          <span id={errorId} className="text-sm text-gray-500">
            {props.error}
          </span>
        </div>
      )}

      <input
        type={props.type ?? "text"}
        aria-invalid={hasError}
        aria-describedby={errorId}
        className={inputVariants({ intent })}
        style={{
          paddingLeft: `calc(${fixedPlaceholderWidth / 16}rem + 1rem)`,
          paddingRight: "1rem",
        }}
        {...props}
      />

      {props.fixedPlaceholder && (
        <span
          data-testid={`${props.id}-fixed-placeholder`}
          className="absolute top-18.5 left-8.5 text-md text-gray-400 font-normal z-1 pointer-events-none"
        >
          {props.fixedPlaceholder}
        </span>
      )}

      <label htmlFor={props.id} className={labelVariants({ intent })}>
        {props.label}
      </label>
    </div>
  )
}
