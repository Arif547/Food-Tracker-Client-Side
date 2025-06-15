import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard from '../components/FoodCard';

const Fridge = () => {
    const initialFood = useLoaderData();
    const [foods, setFoods] = useState(initialFood);
    const [category, setCategory] = useState('all'); // Default selection




    useEffect(() => {
        const fetchFoods = async () => {
            let url = 'http://localhost:3000/foods';
            if (category !== 'all') {
                url = `http://localhost:3000/foods/category/${category}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching foods:", error);
            }
        };

        fetchFoods();
    }, [category]); // Fetch foods when category changes

    return (
        <div>
            <div className='max-w-7xl mx-auto px-5 py-10 lg:py-28 md:py-20'>
                <h2 className='text-3xl lg:text-5xl text-center font-bold mb-10'>All foods Loved by Foodies</h2>


                {/* Dropdown for selecting category */}
                <div className="text-center mb-8">
                    <h3 className='text-2xl font-medium mb-4'>Filter By category: </h3>
                    <select
                        className="p-2 border rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}

                    >
                        <option value="all">All</option>
                        {
                            [...new Set(initialFood.map(item => item.Category))].map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        {/* {
                            initialfood.map(category => <category key={category._id} category={category}></category>)
                        } */}
                        {/* <option value="all">All</option>
                        <option value="Italian">Italian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Indian">Indian</option>
                        <option value="Others">Others</option> */}
                        {/* Add more categorys as needed */}
                    </select>
                </div>


                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        foods.map(food => <FoodCard
                            key={food._id}
                            foods={foods}
                            setFoods={setFoods}
                            food={food}></FoodCard> )
                    }
                </div>

            </div>
        </div>
    );
};

export default Fridge;