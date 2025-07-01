import React from 'react';
import { Link } from 'react-router';
import * as motion from "motion/react-client"
import { Calendar, Package, Tag, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const FoodCard = ({ food, isNearlyExpired }) => {
    const isExpired = new Date(food.ExpiryDate) < new Date();
    const expiryDate = new Date(food.ExpiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    const getStatusColor = () => {
        if (isExpired) return 'from-red-500 to-red-600';
        if (isNearlyExpired) return 'from-amber-500 to-orange-500';
        return 'from-green-500 to-emerald-500';
    };

    const getStatusIcon = () => {
        if (isExpired) return <AlertTriangle className="w-4 h-4" />;
        if (isNearlyExpired) return <Clock className="w-4 h-4" />;
        return <CheckCircle className="w-4 h-4" />;
    };

    const getStatusText = () => {
        if (isExpired) return 'Expired';
        if (isNearlyExpired) return `${daysUntilExpiry} days left`;
        return 'Fresh';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-white text-sm font-medium bg-gradient-to-r ${getStatusColor()} backdrop-blur-sm shadow-lg`}>
                        {getStatusIcon()}
                        <span>{getStatusText()}</span>
                    </div>
                </div>

                {/* Image Container with Overlay */}
                <div className="relative overflow-hidden">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        src={food.image || "https://via.placeholder.com/400x250"}
                        alt={food.title}
                        className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="space-y-4">
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {food.title}
                        </h3>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-xl">
                                    <Tag className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Category</span>
                                    <p className="font-semibold text-gray-900">{food.Category}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex items-center justify-center w-8 h-8 bg-purple-50 rounded-xl">
                                    <Package className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Quantity</span>
                                    <p className="font-semibold text-gray-900">{food.Quantity}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-xl">
                                    <Calendar className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Expires</span>
                                    <p className="font-semibold text-gray-900">{food.ExpiryDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-4">
                            <Link to={`/food-details/${food._id}`}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-blue-500/25"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        View Details
                                        <motion.span
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            →
                                        </motion.span>
                                    </span>
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
            </div>
        </motion.div>
    );
};

export default FoodCard;