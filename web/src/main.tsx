import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { AppWrapper } from "./app-wrapper"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
