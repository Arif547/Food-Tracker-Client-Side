import React, { useEffect, useState } from 'react';
import ExpiredCard from './ExpiredCard';

const ExpiredFoods = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch('https://food-tracker-server-zeta.vercel.app/foods/expired')
            .then(res => res.json())
            .then(data => setFoods(data));
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-10 px-5 lg:py-28 md:py-20">
            <h2 className="text-5xl font-bold mb-14 text-center">Expired Food Items</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {foods.map(food => (
                    <ExpiredCard key={food._id} food={food} />
                ))}
            </div>
        </div>
    );
};

export default ExpiredFoods;
