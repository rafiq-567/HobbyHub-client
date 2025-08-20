import {
  createBrowserRouter,
 
} from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import Login from "../pages/LogIn";
import Register from "../pages/Register";
import MyGroups from "../pages/MyGroups";
import CreateGroup from "../pages/CreateGroup";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import GroupDetails from "../pages/GroupDetails";
import UpdateGroup from "../pages/UpdateGroup";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            path: "/",
            Component: Home
        },
        {
            path: "/groups",
            Component: AllGroups
        },
        {
            path: "/createGroup",
            element: <PrivateRoute>
                <CreateGroup></CreateGroup>
            </PrivateRoute>
        },
        {
            path: "/MyGroups",
            element: <PrivateRoute>
                <MyGroups></MyGroups>
            </PrivateRoute>
        },
        {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path: "/UpdateGroup/:id",
                
                Component: UpdateGroup
            },
            {
                path: "/group/:id",
                 element: <PrivateRoute>
                <GroupDetails></GroupDetails>
            </PrivateRoute>
            },
    ]
  },
  {
        path: "/auth",
        element: <h1>Authentication Layout</h1>
    },
    {
        path: "/*",
        element: <h1>Error-404</h1>
    },
]);
