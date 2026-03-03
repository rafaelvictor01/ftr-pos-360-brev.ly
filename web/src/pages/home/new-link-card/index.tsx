import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosError } from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { formSchema_newLink, type FormSchemaNewLinkTP } from "./schema"
import { Button } from "../../../components/button"
import { Input } from "../../../components/input"
import { Snackbar } from "../../../components/snackbar"
import type { ApiErrorReturn } from "../../../types/api-error-return"
import { httpClient } from "../../../utils/http-client"

interface IProps {
  handleCreateSuccess: () => void
}

export function NewLink(props: IProps) {
  const [openToastError, setOpenToastError] = useState(false)
  const [errorCreatingNewLink, setErrorCreatingNewLink] = useState({
    title: "",
    description: "",
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema_newLink),
  })

  async function handleSaveLink(formData: FormSchemaNewLinkTP): Promise<void> {
    try {
      await httpClient.post("/shortened-links", formData)

      reset()
      props.handleCreateSuccess()
    } catch (error) {
      const err = error as AxiosError

      let description = "Por favor, tente novamente mais tarde."

      const errorData = err.response?.data as ApiErrorReturn

      if (
        err.status === 400 &&
        errorData?.message === "Shortened link already exists"
      ) {
        description = "Esse link encurtado já existe."
      }

      setErrorCreatingNewLink({ title: "Erro no cadastro", description })
      setOpenToastError(true)
    }
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
            label="Link Original"
            id="input-original-link"
            {...register("originalLink")}
            placeholder="www.exemplo.com.br"
            error={errors.originalLink?.message}
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

      <Snackbar
        type="error"
        open={openToastError}
        onOpenChange={setOpenToastError}
        title={errorCreatingNewLink.title}
        description={errorCreatingNewLink.description}
      />
    </>
  )
}
