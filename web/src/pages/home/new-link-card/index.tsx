import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { formSchema_newLink, type FormSchemaNewLinkTP } from "./schema"
import { Button } from "../../../components/button"
import { Input } from "../../../components/input"

export function NewLink() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema_newLink),
  })

  async function handleSaveLink(formData: FormSchemaNewLinkTP): Promise<void> {
    console.log("formData", formData)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSaveLink)}
        className="max-w-190 w-full md:min-w-145 flex flex-col flex-1 gap-10 md:gap-12 bg-gray-100 rounded-lg p-12 md:p-16"
      >
        <h2 className="text-lg text-gray-600">Novo link</h2>

        <div className="flex flex-col gap-8">
          <Input
            id="input-original-link"
            label="Link Original"
            placeholder="www.exemplo.com.br"
            error={errors.originalLink?.message}
            {...register("originalLink")}
          />

          <Input
            id="input-shortened-link"
            label="Link Encurtado"
            fixedPlaceholder="brev.ly/r/"
            error={errors.shortenedLink?.message}
            {...register("shortenedLink")}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar link"}
        </Button>
      </form>
    </>
  )
}
