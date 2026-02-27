import { Outlet } from "react-router"

export function MainLayout() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center p-10 bg-gray-200">
      <Outlet />
    </main>
  )
}
