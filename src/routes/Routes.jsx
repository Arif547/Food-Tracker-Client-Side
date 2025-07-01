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
import FoodsDetails from '../pages/FoodsDetails';
import ExpiredFoodsPage from '../pages/ExpiredFoodsPage';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: '/',
                loader: () => fetch('https://food-tracker-server-zeta.vercel.app/foods'),
                Component: Home,
            },
            {
                path: '/Fridge',
                loader: () => fetch('https://food-tracker-server-zeta.vercel.app/foods'),
                Component: Fridge,
            },
            {
                path: '/expired-foods',
                loader: () => fetch('https://food-tracker-server-zeta.vercel.app/expired'),
                Component: ExpiredFoodsPage,
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
                path: '/food-details/:id',
                loader: ({ params }) => fetch(`https://food-tracker-server-zeta.vercel.app/foods/${params.id}`),
                element: <PrivateRoute>
                    <FoodsDetails></FoodsDetails>
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

