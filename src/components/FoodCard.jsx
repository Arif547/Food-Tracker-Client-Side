import React from 'react';
import { Link } from 'react-router';
import * as motion from "motion/react-client"

const FoodCard = ({ food, isNearlyExpired }) => {
    const isExpired = new Date(food.ExpiryDate) < new Date();
    return (
        <div>
            <div
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >

                <div className='absolute mt-4 ml-4'>
                    {isExpired && (
                        <span className="inline-block bg-red-100 text-red-600 px-3 py-2 text-1xl rounded-full mb-2">
                            ❌ Expired
                        </span>
                    )}
                </div>

                <img
                    src={food.image || "https://via.placeholder.com/400x250"}
                    alt={food.title}
                    className="w-full h-48 object-cover"
                />


                <div className="p-5">

                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{food.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">Category: {food.Category}</p>
                    <p className="text-sm text-gray-500 mb-2">Quantity: {food.Quantity}</p>
                    <p className="text-sm text-gray-500 mb-2">Expiry date: {food.ExpiryDate}</p>
                    <div>
                        {isNearlyExpired && (
                            <span className="inline-block bg-red-100 text-red-600 px-2 py-1 text-xs rounded-full mb-2">
                                ⚠️ Expires Soon
                            </span>
                        )}
                    </div>

                    {/* <Link
                        to={`/food-details/${food._id}`}
                        className="inline-block btn btn-primary text-white px-4 py-2  text-sm"
                    >
                        View Details
                    </Link> */}
                    <motion.button whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}>
                        <Link
                            to={`/food-details/${food._id}`}
                            className="inline-block btn btn-primary hover:btn-secondary text-white px-4 py-2  text-sm"
                        >
                            View Details
                        </Link>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;