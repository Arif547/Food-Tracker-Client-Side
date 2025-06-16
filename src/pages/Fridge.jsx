import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard from '../components/FoodCard';

const Fridge = () => {
    const initialFood = useLoaderData();
    const [foods, setFoods] = useState(initialFood);
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        const fetchFoods = async () => {
            setLoading(true);
            let url = 'https://food-tracker-server-zeta.vercel.app/foods';
            if (category !== 'all') {
                url = `https://food-tracker-server-zeta.vercel.app/foods/category/${category}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching foods:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, [category]);

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


                <form class="max-w-md mx-auto mb-10">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>


                {loading ? (
                    <div className='text-center'><span className="loading loading-spinner loading-xl"></span></div>
                    
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {foods.map(food => (
                            <FoodCard
                                key={food._id}
                                foods={foods}
                                setFoods={setFoods}
                                food={food}
                            />
                        ))}
                    </div>
                )}


            </div>
        </div>
    );
};

export default Fridge;