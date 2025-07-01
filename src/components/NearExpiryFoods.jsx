import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard'; // Assuming your FoodCard is reusable
import { Timer, CheckCircle2, Sparkles } from 'lucide-react';

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

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                    <CheckCircle2 className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-blue-400 rounded-full animate-pulse" />
            </div>

            <div className="text-center max-w-lg">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    🎉 All Fresh & Good!
                </h3>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    Great news! All your food items are fresh and won't expire in the next 5 days.
                    Your food management is on point!
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-3 rounded-full font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Perfect Food Management</span>
                </div>
            </div>
        </div>
    );

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animate-reverse animation-delay-150"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 font-medium">Loading your food inventory...</p>
        </div>
    );

    return (
        <div id='Expiring-Soon' className='max-w-7xl mx-auto py-10 px-5 lg:py-28 md:py-20'>
            {/* Header Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-6 py-3 rounded-full font-semibold mb-6">
                    <Timer className="w-5 h-5" />
                    <span>Time-Sensitive Items</span>
                </div>

                <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                    Expiring Soon
                </h2>

                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Keep track of items that need your attention in the next 5 days.
                    <span className="font-semibold text-violet-600"> Don't let good food go to waste!</span>
                </p>
            </div>

            {/* Content Section */}
            {loading ? (
                <LoadingSpinner />
            ) : foods.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {foods.length} Item{foods.length !== 1 ? 's' : ''} Need{foods.length === 1 ? 's' : ''} Attention
                            </h3>
                        </div>

                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                            <Timer className="w-4 h-4" />
                            <span>Next 5 days</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {foods.slice(0, 6).map(food => (
                            <FoodCard key={food._id} food={food} isNearlyExpired />
                        ))}
                    </div>

                    {foods.length > 6 && (
                        <div className="text-center mt-12">
                            <button className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
                                View All {foods.length} Items
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default NearExpiryFoods;