import React from "react";

const expiredFoods = [
    {
        id: 1,
        name: "Expired Milk",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        expiredDate: "2024-06-01",
        quantity: 2,
        reason: "Past expiration date",
    },
    {
        id: 2,
        name: "Stale Bread",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
        expiredDate: "2024-05-28",
        quantity: 1,
        reason: "Mold detected",
    },
    {
        id: 3,
        name: "Rotten Apples",
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
        expiredDate: "2024-05-25",
        quantity: 5,
        reason: "Spoiled",
    },
];

export default function ExpiredFoodsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-red-700 mb-2 text-center drop-shadow-lg">
                    Expired Foods
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Here are the foods that have expired. Please dispose of them safely.
                </p>
                <div className="grid gap-8 md:grid-cols-2">
                    {expiredFoods.map((food) => (
                        <div
                            key={food.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-center p-5 gap-6 border-l-8 border-red-400"
                        >
                            <img
                                src={food.image}
                                alt={food.name}
                                className="w-28 h-28 object-cover rounded-xl border-4 border-red-100"
                            />
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-red-600 mb-1">
                                    {food.name}
                                </h2>
                                <div className="text-gray-500 text-sm mb-2">
                                    <span className="font-medium">Expired:</span>{" "}
                                    {food.expiredDate}
                                </div>
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        Qty: {food.quantity}
                                    </span>
                                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        {food.reason}
                                    </span>
                                </div>
                                <button className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <a
                        href="/foods"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
                    >
                        Back to Foods
                    </a>
                </div>
            </div>
        </div>
    );
}