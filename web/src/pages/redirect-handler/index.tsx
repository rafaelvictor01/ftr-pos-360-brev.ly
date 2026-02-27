import logoIcon from "../../assets/logo-icon.svg"

export function RedirectHandler() {
  // const data = useLoaderData() as { originalUrl: string }

  // useEffect(() => {
  //   window.location.href = data.originalUrl
  // }, [data])

  return (
    <div className="max-w-290 w-full h-fit flex flex-col gap-12 items-center text-center bg-gray-100 rounded-lg px-10 py-24 md:px-24 md:py-32">
      <img src={logoIcon} alt="Logotipo do site" className="h-24" />

      <h1 className="text-xl text-gray-600">Redirecionando...</h1>

      <div className="flex flex-col gap-2">
        <p className="text-md text-gray-500">
          O link será aberto automaticamente em alguns instantes.
        </p>

        <p className="text-md text-gray-500">
          Não foi redirecionado?{" "}
          <a href="/" className="text-blue-base underline">
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  )
}
