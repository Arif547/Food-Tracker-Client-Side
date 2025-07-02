import React, { useState } from 'react';
import { Lightbulb, Thermometer, Calendar, Eye, ChefHat, Snowflake, Clock, Leaf, Star } from 'lucide-react';

const tips = [
    {
        icon: Thermometer,
        title: "Optimal Storage Temperature",
        description: "Store perishables like dairy and meat in the coldest part of the fridge (usually the back bottom shelf) to maximize freshness.",
        category: "Storage",
        color: "bg-blue-50 border-blue-200",
        iconColor: "text-blue-600"
    },
    {
        icon: Eye,
        title: "Visual Organization",
        description: "Use transparent containers and clear storage bags so leftovers and ingredients are easily visible and won't be forgotten.",
        category: "Organization",
        color: "bg-purple-50 border-purple-200",
        iconColor: "text-purple-600"
    },
    {
        icon: Calendar,
        title: "Smart Labeling System",
        description: "Label all items with purchase dates, expiry dates, or 'use by' dates using removable stickers or washable markers.",
        category: "Tracking",
        color: "bg-green-50 border-green-200",
        iconColor: "text-green-600"
    },
    {
        icon: ChefHat,
        title: "Plan Around Inventory",
        description: "Create weekly meal plans based on what's already in your fridge and pantry to ensure everything gets used efficiently.",
        category: "Planning",
        color: "bg-orange-50 border-orange-200",
        iconColor: "text-orange-600"
    },
    {
        icon: Snowflake,
        title: "Freeze Before Expiry",
        description: "Freeze meat, bread, and prepared meals 1-2 days before their expiry date to extend their usability by weeks or months.",
        category: "Preservation",
        color: "bg-cyan-50 border-cyan-200",
        iconColor: "text-cyan-600"
    },
    {
        icon: Clock,
        title: "First In, First Out",
        description: "Practice FIFO rotation - use older items first by placing newer purchases behind existing ones in your fridge and pantry.",
        category: "Organization",
        color: "bg-pink-50 border-pink-200",
        iconColor: "text-pink-600"
    },
    {
        icon: Leaf,
        title: "Proper Produce Storage",
        description: "Store fruits and vegetables separately, as many fruits release ethylene gas that accelerates ripening in nearby produce.",
        category: "Storage",
        color: "bg-emerald-50 border-emerald-200",
        iconColor: "text-emerald-600"
    },
    {
        icon: Star,
        title: "Leftover Transformation",
        description: "Transform leftovers into new meals - yesterday's roast chicken becomes today's chicken salad or soup ingredients.",
        category: "Creativity",
        color: "bg-yellow-50 border-yellow-200",
        iconColor: "text-yellow-600"
    }
];

const categories = ["All", "Storage", "Organization", "Tracking", "Planning", "Preservation", "Creativity"];

const stats = [
    { number: "40%", label: "Food wasted globally", icon: "🌍" },
    { number: "$1,500", label: "Average household waste/year", icon: "💰" },
    { number: "30%", label: "Reduction with proper planning", icon: "📊" },
    { number: "7 days", label: "Average fridge life extension", icon: "⏰" }
];

const TipsSection = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredTips = activeCategory === "All"
        ? tips
        : tips.filter(tip => tip.category === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50 ">
            {/* Header Section */}
            <div className="relative overflow-hidden text-black">

                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center">
                        
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-6 py-3 rounded-full font-semibold mb-6">
                            <Lightbulb className="w-5 h-5" />
                            <span>Food Tips</span>
                        </div>
                        <h1 className="text-5xl font-bold mb-6">
                            Smart Food Management Tips
                        </h1>
                        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                            Discover proven strategies to reduce food waste, save money, and keep your kitchen organized.
                            Small changes can make a <span className="font-semibold text-violet-600">  big difference for your wallet and the environment. </span>
                        </p>
                    </div>
                </div>

            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                            <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                {/* Category Filter */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeCategory === category
                                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 shadow-md'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredTips.map((tip, index) => {
                        const IconComponent = tip.icon;
                        return (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${tip.color} hover:scale-105 hover:-translate-y-2`}
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                                </div>

                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${tip.color} ${tip.iconColor}`}>
                                    <IconComponent className="w-7 h-7" />
                                </div>

                                <div className="mb-3">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${tip.iconColor} bg-opacity-10`} style={{ backgroundColor: tip.iconColor.replace('text-', '').replace('-600', '') + '20' }}>
                                        {tip.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                                    {tip.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {tip.description}
                                </p>

                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Call to Action */}
                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
                            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                                Implement these tips today and see the difference in your food waste and grocery budget within just one week.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 shadow-lg">
                                    Track My Progress
                                </button>
                                <button className="bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-800 transition-colors duration-300 border-2 border-purple-500">
                                    Share These Tips
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipsSection;