import React, { useEffect, useState } from 'react';
import { AlertTriangle, Clock, TrendingUp, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';

const FoodStats = () => {
    const [nearExpiryFoods, setNearExpiryFoods] = useState([]);
    const [expiredCount, setExpiredCount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animateNumbers, setAnimateNumbers] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [nearExpiryRes, expiredRes] = await Promise.all([
                    fetch('https://food-tracker-server-zeta.vercel.app/foods/near-expiry'),
                    fetch('https://food-tracker-server-zeta.vercel.app/foods/expired')
                ]);

                const nearExpiryData = await nearExpiryRes.json();
                const expiredData = await expiredRes.json();

                setNearExpiryFoods(nearExpiryData);
                setExpiredCount(expiredData);

                // Trigger number animation after data loads
                setTimeout(() => setAnimateNumbers(true), 200);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const CountUpAnimation = ({ end, duration = 2000 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!animateNumbers) return;

            let startTime;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);

                setCount(Math.floor(progress * end));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [end, duration, animateNumbers]);

        return <span>{count}</span>;
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-rose-600 rounded-full animate-spin animate-reverse animation-delay-150"></div>
            </div>
            <p className="mt-6 text-lg text-red-600 font-medium">Loading your food inventory stats...</p>
        </div>
    );

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
                    🎉 Perfect Food Management!
                </h3>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    Excellent! You have no expired or nearly expiring items.
                    Your food inventory management is outstanding!
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-3 rounded-full font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>All Items Fresh</span>
                </div>
            </div>
        </div>
    );

    const totalItems = nearExpiryFoods.length + expiredCount.length;

    return (
        <div className='max-w-7xl mx-auto py-10 px-5 lg:py-28 md:py-20'>
            {/* Header Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-100 to-rose-100 text-red-700 px-6 py-3 rounded-full font-semibold mb-6">
                    <TrendingUp className="w-5 h-5" />
                    <span>Food Inventory Overview</span>
                </div>

                <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                    Food Stats Dashboard
                </h2>

                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Monitor your food inventory with real-time insights on expiring and expired items.
                    <span className="font-semibold text-red-600"> Stay ahead of food waste!</span>
                </p>
            </div>

            {/* Content Section */}
            {loading ? (
                <LoadingSpinner />
            ) : totalItems === 0 ? (
                <EmptyState />
            ) : (
                <>
                    {/* Stats Overview Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-rose-500 rounded-full"></div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {totalItems} Item{totalItems !== 1 ? 's' : ''} Need{totalItems === 1 ? 's' : ''} Attention
                            </h3>
                        </div>

                        <div className="hidden md:flex items-center gap-2 text-sm text-red-600 bg-gradient-to-r from-red-50 to-rose-50 px-4 py-2 rounded-full border border-red-200">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Action Required</span>
                        </div>
                    </div>

                    {/* Stats Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Near Expiry Card */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-rose-100 rounded-3xl transform rotate-1 opacity-30 group-hover:rotate-2 transition-transform duration-300"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-red-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-gradient-to-r from-red-100 to-rose-100 rounded-xl">
                                                <Clock className="w-6 h-6 text-red-700" />
                                            </div>
                                            <span className="text-sm font-medium text-red-700 uppercase tracking-wide bg-gradient-to-r from-red-100 to-rose-100 px-3 py-1 rounded-full">Warning</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-red-700 mb-2">Nearly Expiring</h3>
                                        <p className="text-red-600 text-sm mb-6">Items expiring in next 5 days</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="text-6xl font-bold bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-4">
                                        <CountUpAnimation end={nearExpiryFoods.length} />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-red-600">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <span>Requires immediate attention</span>
                                    </div>
                                </div>

                                <a href='#Expiring-Soon' className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02] hover:from-red-600 hover:to-red-700">
                                    <Eye className="w-5 h-5" />
                                    View All Near Expiry Items
                                </a>
                            </div>
                        </div>

                        {/* Expired Card */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-rose-200 rounded-3xl transform -rotate-1 opacity-40 group-hover:-rotate-2 transition-transform duration-300"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-red-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-gradient-to-r from-red-100 to-rose-100 rounded-xl">
                                                <AlertTriangle className="w-6 h-6 text-red-700" />
                                            </div>
                                            <span className="text-sm font-medium text-red-700 uppercase tracking-wide bg-gradient-to-r from-red-100 to-rose-100 px-3 py-1 rounded-full">Critical</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-red-700 mb-2">Expired Items</h3>
                                        <p className="text-red-600 text-sm mb-6">Past expiration date</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="text-6xl font-bold bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-4">
                                        <CountUpAnimation end={expiredCount.length} />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-red-600">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <span>Disposal required</span>
                                    </div>
                                </div>

                                <Link to='/expired-foods' className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02] hover:from-red-600 hover:to-red-700">
                                    <Eye className="w-5 h-5" />
                                    View All Expired Items
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    {/* <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-3xl p-8 border border-red-200">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-red-700 mb-6">Inventory Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                                    <span className="text-red-600 font-medium">
                                        <span className="text-2xl font-bold block">{nearExpiryFoods.length}</span>
                                        <span className="text-sm">Near Expiry</span>
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                                    <span className="text-red-700 font-medium">
                                        <span className="text-2xl font-bold block">{expiredCount.length}</span>
                                        <span className="text-sm">Expired</span>
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <span className="text-green-700 font-medium">
                                        <span className="text-2xl font-bold block">{totalItems}</span>
                                        <span className="text-sm">Total Alert Items</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Action Section */}
                    {/* {totalItems > 0 && (
                        <div className="text-center mt-12">
                            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
                                Manage All Items ({totalItems})
                            </button>
                        </div>
                    )} */}
                </>
            )}
        </div>
    );
};

export default FoodStats;