import { createBrowserRouter } from "react-router-dom";
import CartaPage from "../pages/landing/CartaPage";
import MainPage from "../pages/landing/MainPage";
import Chicken from "../components/landing/carta/Chicken";
import Burger from "../components/landing/carta/Burger";
import ScrollRouter from '../components/ScrollRouter';

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <div>Error</div>,
        children: [
            {
                path: "carta",
                element: <ScrollRouter />,
            },
            {
                path: "chicken",
                element: <ScrollRouter />
            },
            {
                path: "burger",
                element: <ScrollRouter />
            }
        ]
    }
]);

export default routes;