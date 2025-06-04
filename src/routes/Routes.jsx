import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Root';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Fridge from '../pages/Fridge';

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
            }
        ]

    },


]);

