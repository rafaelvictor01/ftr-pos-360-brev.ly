import logo from "../../assets/logo.svg"
import { Button } from "../../components/button"

export function HomePage() {
  return (
    <div className="w-full md:max-w-490 md:w-[calc(100vw - 1.5rem)] md:mt-25 flex flex-col items-center md:items-start gap-16">
      <img
        src={logo}
        className="h-12"
        alt="Logo do sistema com o nome 'brev.ly'"
      />

      <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-10">
        <>
          <Button variant="primary">Botão Primário</Button>
        </>

        <>a</>
      </div>
    </div>
  )
}
