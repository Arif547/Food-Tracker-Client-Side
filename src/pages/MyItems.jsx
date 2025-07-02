import React, { use, useEffect, useState } from 'react';
import UpdateModal from '../components/UpdateModal';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const MyItems = () => {
    const { user } = use(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMyFoods = async () => {
            const res = await fetch(`https://food-tracker-server-zeta.vercel.app/my-items?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            });
            const data = await res.json();
            setMyFoods(data);
        };

        if (user?.email) fetchMyFoods();
    }, [user]);

    const handleDelete = async (food) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete "${food.title}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4F46E5",
            cancelButtonColor: "#DC2626",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`https://food-tracker-server-zeta.vercel.app/foods/${food._id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${user.accessToken}`
                    }
                });

                if (res.ok) {
                    setMyFoods(myFoods.filter(f => f._id !== food._id));
                    Swal.fire("Deleted!", "The food item has been deleted.", "success");
                }
            }
        });
    };

    const handleUpdate = (updatedFood) => {
        setMyFoods(myFoods.map(food => food._id === updatedFood._id ? updatedFood : food));
        setShowUpdateModal(false);
    };

    const filteredFoods = myFoods.filter(food => 
        food.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.Category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-center text-indigo-600">My Food Items</h2>
                <p className="text-center mt-2 text-gray-600">Total Items: {myFoods.length}</p>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <div className="min-w-[800px] w-full">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="px-6 py-4 whitespace-nowrap">Image</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Title</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Category</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Expiry Date</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredFoods.map(food => (
                                    <tr key={food._id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={food.image} alt="" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">{food.title}</td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">{food.Category}</td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">{food.ExpiryDate}</td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                <button
                                                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                                                    onClick={() => {
                                                        setSelectedFood(food);
                                                        setShowUpdateModal(true);
                                                    }}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors duration-200"
                                                    onClick={() => handleDelete(food)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showUpdateModal && (
                <UpdateModal
                    food={selectedFood}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdate}
                    user={user}
                />
            )}
        </div>
    );
};

export default MyItems;
