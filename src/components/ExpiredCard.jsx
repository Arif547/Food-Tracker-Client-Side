import React from 'react';
import { Link } from 'react-router';
import * as motion from "motion/react-client"
import { Calendar, Package, Tag, AlertTriangle, Trash2, Archive } from 'lucide-react';

const ExpiredCard = ({ food }) => {
    const expiryDate = new Date(food.ExpiryDate);
    const today = new Date();
    const daysExpired = Math.ceil((today - expiryDate) / (1000 * 60 * 60 * 24));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-red-100">

                {/* Expired Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl text-white text-sm font-bold bg-gradient-to-r from-red-500 to-rose-600 backdrop-blur-sm shadow-lg animate-pulse">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Expired {daysExpired} day{daysExpired !== 1 ? 's' : ''} ago</span>
                    </div>
                </div>

                {/* Archive/Delete Action */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* <div className="flex gap-2">
                        <button className="p-2 bg-gray-800/70 hover:bg-gray-800/90 text-white rounded-xl backdrop-blur-sm transition-colors duration-200">
                            <Archive className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl backdrop-blur-sm transition-colors duration-200">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div> */}
                </div>

                {/* Image Container with Overlay */}
                <div className="relative overflow-hidden">
                    <motion.img
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                        src={food.image || "https://via.placeholder.com/400x250"}
                        alt={food.title}
                        className="w-full h-56 object-cover filter grayscale-[30%] group-hover:grayscale-[10%] transition-all duration-500"
                    />
                    {/* Red tinted overlay to indicate expired status */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-red-500/5 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="space-y-4">
                        {/* Title with strike-through effect */}
                        <div className="relative">
                            <h3 className="text-2xl font-bold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                                {food.title}
                            </h3>
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full h-0.5 bg-red-400 opacity-60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3 text-gray-500">
                                <div className="flex items-center justify-center w-8 h-8 bg-red-50 rounded-xl">
                                    <Tag className="w-4 h-4 text-red-500" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-400">Category</span>
                                    <p className="font-semibold text-gray-600">{food.Category}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-500">
                                <div className="flex items-center justify-center w-8 h-8 bg-red-50 rounded-xl">
                                    <Package className="w-4 h-4 text-red-500" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-400">Quantity</span>
                                    <p className="font-semibold text-gray-600">{food.Quantity}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-500">
                                <div className="flex items-center justify-center w-8 h-8 bg-red-50 rounded-xl">
                                    <Calendar className="w-4 h-4 text-red-500" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-400">Expired on</span>
                                    <p className="font-semibold text-red-600">{food.ExpiryDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Warning Message */}
                        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-red-800">Food Safety Warning</p>
                                    <p className="text-xs text-red-600 mt-1">This item has expired and may not be safe to consume. Consider proper disposal.</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Link to={`/food-details/${food._id}`} className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r  from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700  text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <span className="flex items-center justify-center gap-2 text-sm">
                                        View Details
                                        <motion.span
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 3 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            →
                                        </motion.span>
                                    </span>
                                </motion.button>
                            </Link>

                            {/* <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <Trash2 className="w-4 h-4" />
                            </motion.button> */}
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-red-400/15 to-rose-400/15 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-red-400/10 to-orange-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />

                {/* Red accent line */}
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-500 to-rose-600 opacity-60"></div>
            </div>
        </motion.div>
    );
};

export default ExpiredCard;