import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/landing/MainPage";
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
            },
            {
                path: "salchipapas",
                element: <ScrollRouter />
            },
            {
                path: "dessert",
                element: <ScrollRouter />
            }
        ]
    }
]);

export default routes;