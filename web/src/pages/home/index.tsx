import { ListLinksCard } from "./list-links-card"
import { NewLink } from "./new-link-card"
import logo from "../../assets/logo.svg"

export function HomePage() {
  return (
    <div className="w-full md:max-w-490 md:w-[calc(100vw - 1.5rem)] md:mt-25 flex flex-col items-center md:items-start gap-16">
      <img src={logo} className="h-12" alt="Logo da Brev.Ly" />

      <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-10">
        <NewLink />

        <ListLinksCard />
      </div>
    </div>
  )
}
