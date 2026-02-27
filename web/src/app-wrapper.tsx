import { RouterProvider } from "react-router"

import { routes } from "./routes"

export function AppWrapper() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}
