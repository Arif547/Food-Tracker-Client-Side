import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddFood = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    const handleAddFood = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newFood = Object.fromEntries(formData.entries());
        newFood.userName = user.displayName;
        newFood.userEmail = user.email;
        newFood.createdAt = new Date().toISOString();

        fetch('https://food-tracker-server-zeta.vercel.app/foods', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify(newFood)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Food added successfully!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/my-items')
                }
            })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 lg:py-[120px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                        Add New Food Item
                    </h2>

                    <form onSubmit={handleAddFood} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Food Image</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        type="url"
                                        name="image"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-lg transition duration-150 ease-in-out"
                                        placeholder="Enter image URL"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Food Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-lg"
                                    placeholder="Enter food title"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    name="Quantity"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-lg"
                                    placeholder="Enter quantity"
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                                <input
                                    type="date"
                                    name="ExpiryDate"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="Category"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option>Dairy</option>
                                    <option>Meat</option>
                                    <option>Vegetables</option>
                                    <option>Snacks</option>
                                </select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="Description"
                                    rows="4"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-lg"
                                    placeholder="Enter food description"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            >
                                Add Food Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;