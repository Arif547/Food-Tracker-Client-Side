import React from 'react';
import Banner from '../components/Banner';

import NearExpiryFoods from '../components/NearExpiryFoods';
import ExpiredFoods from '../components/ExpiredFoods';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <NearExpiryFoods></NearExpiryFoods>
            <ExpiredFoods></ExpiredFoods>
        </div>
    );
};

export default Home;