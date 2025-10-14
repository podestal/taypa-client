import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/landing/MainPage";
// import ScrollRouter from '../components/ScrollRouter';
import Burger from "../components/carta/Burger";
import Chicken from "../components/carta/Chicken";
import Papas from "../components/carta/Papas";
import Desserts from "../components/carta/Desserts";
import Bebidas from "../components/carta/Bebidas";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <div>Error</div>,
        // children: [
        //     {
        //         path: "chicken",
        //         element: <ScrollRouter />
        //     },
        //     {
        //         path: "burger",
        //         element: <ScrollRouter />
        //     },
        //     {
        //         path: "salchipapas",
        //         element: <ScrollRouter />
        //     },
        //     {
        //         path: "dessert",
        //         element: <ScrollRouter />
        //     }
        // ]
        children: [
            {
                path: "burger",
                element: <Burger />
            },
            {
                path: "chicken",
                element: <Chicken />
            },
            {
                path: "papas",
                element: <Papas />
            },
            {
                path: "dessert",
                element: <Desserts />
            },
            {
                path: "bebidas",
                element: <Bebidas />
            }
        ]
    }
]);

export default routes;