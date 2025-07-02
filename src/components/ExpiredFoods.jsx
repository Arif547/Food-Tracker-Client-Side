import React, { useEffect, useState } from 'react';
import ExpiredCard from './ExpiredCard';
import { AlertTriangle, CheckCircle2, RefreshCw, Trash2, Archive } from 'lucide-react';
import { Link } from 'react-router';

const ExpiredFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpiredFoods = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('https://food-tracker-server-zeta.vercel.app/foods/expired');
                if (!res.ok) throw new Error('Failed to fetch expired foods');
                const data = await res.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching expired foods:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpiredFoods();
    }, []);

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                    <CheckCircle2 className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-2xl">🎉</span>
                </div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            <div className="text-center max-w-lg">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Excellent Food Management! 🌟
                </h3>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    Great news! You have no expired food items. Your food tracking and consumption habits are outstanding!
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-3 rounded-full font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Zero Food Waste</span>
                </div>
            </div>
        </div>
    );

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-rose-600 rounded-full animate-spin animate-reverse animation-delay-150"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 font-medium">Checking for expired items...</p>
        </div>
    );

    const ErrorState = () => (
        <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Expired Items</h3>
            <p className="text-gray-600 mb-6 text-center max-w-md">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
                <RefreshCw className="w-4 h-4" />
                Try Again
            </button>
        </div>
    );

    const StatsBar = () => {
        if (foods.length === 0) return null;

        const totalExpired = foods.length;
        const recentlyExpired = foods.filter(food => {
            const expiredDays = Math.ceil((new Date() - new Date(food.ExpiryDate)) / (1000 * 60 * 60 * 24));
            return expiredDays <= 7;
        }).length;

        return (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="font-semibold text-gray-800">{totalExpired} Total Expired</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="font-medium text-gray-600">{recentlyExpired} Recently Expired</span>
                        </div>
                    </div>

                    {/* <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200 text-sm">
                            <Archive className="w-4 h-4" />
                            Archive All
                        </button>
                        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200 text-sm">
                            <Trash2 className="w-4 h-4" />
                            Clear All
                        </button>
                    </div> */}
                </div>
            </div>
        );
    };

    if (error) {
        return (
            <div className="max-w-7xl mx-auto py-10 px-5 lg:py-28 md:py-20">
                <ErrorState />
            </div>
        );
    }

    return (
        <section className="bg-gray-50 lg:py-[120px] py-[80px]">
            <div className="max-w-7xl mx-auto py-10 px-5">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-100 to-rose-100 text-red-700 px-6 py-3 rounded-full font-semibold mb-6">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Expired Items</span>
                    </div>

                    {/* <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent"> */}
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                        Expired Foods
                    </h2>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Items that have passed their expiry date and require attention.
                        <span className="font-semibold text-red-600"> Please dispose of these safely.</span>
                    </p>
                </div>

                {/* Content Section */}
                {loading ? (
                    <LoadingSpinner />
                ) : foods.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <StatsBar />

                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-rose-500 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {foods.length} Expired Item{foods.length !== 1 ? 's' : ''}
                                </h3>
                            </div>

                            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-red-50 border border-red-200 px-4 py-2 rounded-full">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <span>Requires Disposal</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {foods.slice(0, 6).map(food => (
                                <ExpiredCard key={food._id} food={food} />
                            ))}
                        </div>

                        {/* Bottom Actions */}
                        <div className="text-center mt-12 pt-8 border-t border-gray-200">
                            {/* <p className="text-gray-600 mb-4">Need help with proper food disposal?</p> */}
                            <Link to='/expired-foods' className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
                                View All Expired Foods
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ExpiredFoods;