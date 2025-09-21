import { Outlet } from "react-router-dom"
import Header from "../../router/Header"

const MainPage = () => {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default MainPage