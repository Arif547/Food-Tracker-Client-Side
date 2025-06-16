import React, { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Loading from './components/Loading';


const Root = () => {

    const [initialLoading, setInitialLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 1000); // simulate initial app loading (e.g., fetching user or app settings)

        return () => clearTimeout(timer);
    }, []);

    const isNavigating = navigation.state === 'loading';


    return (
        <div>
            {initialLoading || isNavigating ? (
                <Loading  />
            ) : (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            )}
        </div>

    );
};

export default Root;