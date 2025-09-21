import { createBrowserRouter } from "react-router-dom";
import CartaPage from "../pages/landing/CartaPage";
import MainPage from "../pages/landing/MainPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <div>Error</div>,
        children: [
            {
                path: "carta",
                element: <CartaPage />,
            }
        ]
    }
]);

export default routes;