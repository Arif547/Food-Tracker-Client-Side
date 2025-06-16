import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard'; // Assuming your FoodCard is reusable

const NearExpiryFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFoods = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://food-tracker-server-zeta.vercel.app/foods/near-expiry');
                const data = await res.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching foods:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);



    return (
        <div className='max-w-7xl mx-auto py-10 px-5 lg:py-28 md:py-20'>
            <h2 className="text-5xl font-bold mb-14 text-center">Nearly Expiry Foods (Next 5 Days)</h2>
            {loading ? (
                <div className='text-center'><span className="loading loading-spinner loading-xl"></span></div>

            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {foods.slice(0, 6).map(food => (
                        <FoodCard key={food._id} food={food} isNearlyExpired />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NearExpiryFoods;
