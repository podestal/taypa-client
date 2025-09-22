import { createBrowserRouter } from "react-router-dom";
import CartaPage from "../pages/landing/CartaPage";
import MainPage from "../pages/landing/MainPage";
import Chicken from "../components/landing/carta/Chicken";
import Burger from "../components/landing/carta/Burger";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <div>Error</div>,
        children: [
            {
                path: "carta",
                element: <CartaPage />,
            },
            {
                path: "chicken",
                element: <Chicken />
            },
            {
                path: "burger",
                element: <Burger />
            }
        ]
    }
]);

export default routes;