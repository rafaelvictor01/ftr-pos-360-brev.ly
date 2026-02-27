import notFoundImage from "../../assets/404.svg"

export function NotFound() {
  return (
    <div className="max-w-290 w-full h-fit flex flex-col gap-12 items-center text-center bg-gray-100 rounded-lg px-10 py-24 md:px-24 md:py-32">
      <img
        src={notFoundImage}
        className="h-36 md:h-42.5"
        alt="Imagem de página não encontrada"
      />

      <h1 className="text-xl text-gray-600">Link não encontrado</h1>

      <p className="text-md text-gray-500">
        O link que você está tentando acessar não existe, foi removido ou é uma
        URL inválida. Saiba mais em{" "}
        <a href="/" className="text-blue-base underline">
          brev.ly
        </a>
        .
      </p>
    </div>
  )
}
