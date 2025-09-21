import { createBrowserRouter } from "react-router-dom";
import CartaPage from "../pages/landing/CartaPage";
import MainPage from "../pages/landing/MainPage";
import Chicken from "../components/landing/carta/Chicken";

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
            }
        ]
    }
]);

export default routes;