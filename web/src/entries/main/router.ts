import { createBrowserRouter } from "react-router"

import RootLayout from "@components/layouts/RootLayout"
import Home from "@pages/Home"
import NotFound from "@pages/NotFound"
import Theme from "@pages/Theme"

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: Home },
      { path: "/theme", Component: Theme },
      { path: "*", Component: NotFound },
    ],
  },
])

export default router
