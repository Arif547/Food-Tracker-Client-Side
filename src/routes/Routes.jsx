import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Root';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Fridge from '../pages/Fridge';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import AddFood from '../pages/AddFood';
import PrivateRoute from '../provider/PrivateRoute';
import MyItems from '../pages/MyItems';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: '/',
                Component: Home,
            },
            {
                path: '/Fridge',
                Component: Fridge,
            },
            {
                path: 'add-food',
                element: <PrivateRoute>
                    <AddFood></AddFood>
                </PrivateRoute>,
            },

            {
                path: 'my-items',
                element: <PrivateRoute>
                    <MyItems></MyItems>
                </PrivateRoute>,
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            }
        ]

    },


]);

