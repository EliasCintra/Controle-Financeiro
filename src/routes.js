import { Navigate, useRoutes } from "react-router-dom";
import LayoutDashboard from "./pages/dashboard/DashboardLayout";
import LayoutError from "./pages/error/ErrorLayout";

export default function Router(){

    const routes = useRoutes([
        {
            path: '/',
            children: [
                { element: <Navigate to="/dashboard"/>, index: true},
                { path: "dashboard", element: <LayoutDashboard/>},
                { path: "error", element: <LayoutError/>},
                { path: "*", element: <LayoutError/>},
            ]
        },
    ])

    return routes;
}