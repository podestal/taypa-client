import Header from "../../router/Header"
import { Outlet } from "react-router-dom"

const MainPage = () => {
  return (
    <div className="h-screen flex flex-col w-full overflow-x-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
    </div>
  )
}

export default MainPage