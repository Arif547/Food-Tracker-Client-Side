import React from 'react';
import { Outlet } from 'react-router';
import Header from './layout/Header';
import Footer from './layout/Footer';

const Root = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;