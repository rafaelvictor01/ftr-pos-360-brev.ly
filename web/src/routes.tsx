import { createBrowserRouter } from "react-router"

import { MainLayout } from "./layouts"
import { checkOriginalUrlLoader } from "./loaders/check-original-url-loader"
import { HomePage } from "./pages/home"
import { NotFound } from "./pages/not-found"
import { RedirectHandler } from "./pages/redirect-handler"

export const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/r/:shortCode",
        loader: checkOriginalUrlLoader,
        element: <RedirectHandler />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
])
