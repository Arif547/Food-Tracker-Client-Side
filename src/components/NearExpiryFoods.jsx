import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard'; // Assuming your FoodCard is reusable

const NearExpiryFoods = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/foods/near-expiry')
            .then(res => res.json())
            .then(data => setFoods(data));
    }, []);

    return (
        <div className='max-w-7xl mx-auto py-10 px-5 lg:py-28 md:py-20'>
            <h2 className="text-3xl font-bold mb-14 text-center">Nearly Expiry Foods (Next 5 Days)</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {foods.slice(0, 6).map(food => (
                    <FoodCard key={food._id} food={food} isNearlyExpired/>
                ))}
            </div>
        </div>
    );
};

export default NearExpiryFoods;
