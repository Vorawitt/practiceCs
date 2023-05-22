import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "activities", element: <ActivityDashboard /> },
            { path: "activities/:id", element: <ActivityDetails /> },
            { path: "createActivity", element: <ActivityForm key='create'/> }, // key ใช้ในการ refresh หน้าเพจ
            { path: "manage/:id", element: <ActivityForm key='manage'/> },// key ใช้ในการ refresh หน้าเพจ ให้ไม่เหมือนกันกับ createActivity
            { path: "errors", element: <TestErrors /> },
            { path: "not-found", element: <NotFound /> },
            { path: "server-error", element: <ServerError /> },
            { path: "*", element: <Navigate replace to='/not-found' /> },
        ]
    }
]
export const router = createBrowserRouter(routes);