import z from "zod"

export const formSchema_newLink = z
  .object({
    originalLink: z
      .string()
      .min(1, "Informe uma url válida.")
      .refine((value) => {
        try {
          new URL(value)

          return true
        } catch {
          return /^(www\.)[\w-]+\.[a-z]{2,}(\.[a-z]{2,})?(\/[^\s]*)?$/i.test(
            value,
          )
        }
      }, "Informe uma url válida."),
    shortenedLink: z
      .string()
      .min(1, "Informe uma url minúscula e sem espaço/caractere especial.")
      .regex(
        /^[a-z0-9-]+$/,
        "Informe uma url minúscula e sem espaço/caractere especial.",
      ),
  })
  .required()

export type FormSchemaNewLinkTP = z.infer<typeof formSchema_newLink>
