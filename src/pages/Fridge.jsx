import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Search, Filter, Calendar, Clock, ChefHat, Utensils, AlertTriangle, CheckCircle, ArrowUpDown } from 'lucide-react';
import FoodCard from '../components/FoodCard';

const Fridge = () => {
    const initialFood = useLoaderData();
    const [foods, setFoods] = useState(initialFood);
    const [filteredFoods, setFilteredFoods] = useState(initialFood);
    const [category, setCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expiryFilter, setExpiryFilter] = useState('all');
    const [expiredFoods, setExpiredFoods] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);

    // Calculate stats
    const totalItems = foods.length;
    const categories = [...new Set(initialFood.map(item => item.Category))];

    useEffect(() => {
        const fetchFoods = async () => {
            setLoading(true);
            let url = 'https://food-tracker-server-zeta.vercel.app/foods';

            if (expiryFilter === 'expired') {
                url = 'https://food-tracker-server-zeta.vercel.app/foods/expired';
            } else if (category !== 'all') {
                url = `https://food-tracker-server-zeta.vercel.app/foods/category/${category}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                setFoods(data);

                const res = await fetch('https://food-tracker-server-zeta.vercel.app/foods/expired')
                if (!res.ok) throw new Error('Failed to fetch expired foods');
                const expireData = await res.json();
                setExpiredFoods(expireData);
            } catch (error) {
                console.error("Error fetching foods:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, [category, expiryFilter]);

    useEffect(() => {
        let filtered = [...foods];

        // Search filter - check multiple fields
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(food => {
                const name = foods.name || foods.FoodName || '';
                const category = food.Category || food.category || '';
                const description = food.description || food.Description || '';

                return name.toLowerCase().includes(searchLower) ||
                    category.toLowerCase().includes(searchLower) ||
                    description.toLowerCase().includes(searchLower);
            });
        }

        // Sort functionality
        filtered.sort((a, b) => {
            const nameA = (a.name || a.FoodName || '').toLowerCase();
            const nameB = (b.name || b.FoodName || '').toLowerCase();

            if (sortOrder === 'asc') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        setFilteredFoods(filtered);
    }, [foods, searchTerm, sortOrder]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Clock className="w-4 h-4" />
                            Smart Food Management
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Smart Fridge
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                Tracker
                            </span>
                        </h1>
                        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Never let good food go to waste again. Track expiration dates, get smart alerts, and make the most of your ingredients.
                        </p>
                        <div className="flex items-center justify-center gap-8 text-white">
                            <div className="text-center">
                                <div className="text-3xl font-bold">{totalItems}</div>
                                <div className="text-purple-200">Total Items</div>
                            </div>
                            <div className="w-px h-12 bg-purple-300"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-300">{categories.length}</div>
                                <div className="text-purple-200">Categories</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Foods
                            </label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name or category..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Expiry Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Status
                            </label>
                            <select
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                value={expiryFilter}
                                onChange={(e) => setExpiryFilter(e.target.value)}
                            >
                                <option value="all">All Items</option>
                                <option value="expired">Expired Items</option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort Order
                            </label>
                            <button
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all flex items-center justify-center gap-2"
                            >
                                <ArrowUpDown className="w-4 h-4" />
                                {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-500 rounded-lg p-2">
                                    <Utensils className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{filteredFoods.length}</div>
                                    <div className="text-sm text-gray-600">Items Found</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-500 rounded-lg p-2">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
                                    <div className="text-sm text-gray-600">Categories</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-500 rounded-lg p-2">
                                    <AlertTriangle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {expiryFilter === 'expired' ? filteredFoods.length : expiredFoods.length}
                                    </div>
                                    <div className="text-sm text-gray-600">Expired Items</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Your Food Collection
                    </h2>
                    <p className="text-gray-600">
                        {filteredFoods.length} {filteredFoods.length === 1 ? 'item' : 'items'}
                        {searchTerm && ` matching "${searchTerm}"`}
                        {category !== 'all' && ` in ${category}`}
                        {expiryFilter === 'expired' && ` (expired)`}
                    </p>
                </div>

                {/* Food Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                            <p className="text-gray-600">Loading your delicious collection...</p>
                        </div>
                    </div>
                ) : filteredFoods.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <ChefHat className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || category !== 'all' || expiryFilter !== 'all'
                                ? "Try adjusting your filters or search terms"
                                : "Start adding some delicious food to your collection!"
                            }
                        </p>
                        {(searchTerm || category !== 'all' || expiryFilter !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setCategory('all');
                                    setExpiryFilter('all');
                                }}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFoods.map(food => (
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