import Header from "../../router/Header"
import { Outlet } from "react-router-dom"

const MainPage = () => {
  return (
    <div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
    </div>
  )
}

export default MainPage