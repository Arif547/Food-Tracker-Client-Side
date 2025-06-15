import React, { use, useEffect, useState } from 'react';
import UpdateModal from '../components/UpdateModal';
import ConfirmModal from '../components/ConfirmModal';
import { AuthContext } from '../provider/AuthProvider';

const MyItems = () => {
    const { user } = use(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchMyFoods = async () => {
            const res = await fetch(`http://localhost:3000/my-items?email=${user.email}`);
            const data = await res.json();
            setMyFoods(data);
        };

        if (user?.email) fetchMyFoods();
    }, [user]);

    const handleDelete = async () => {
        await fetch(`http://localhost:3000/foods/${selectedFood._id}`, {
            method: 'DELETE',
        });
        setMyFoods(myFoods.filter(food => food._id !== selectedFood._id));
        setShowDeleteModal(false);
    };

    const handleUpdate = (updatedFood) => {
        setMyFoods(myFoods.map(food => food._id === updatedFood._id ? updatedFood : food));
        setShowUpdateModal(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">My Food Items</h2>

            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">Image</th>
                            <th className="p-3 border">Title</th>
                            <th className="p-3 border">Category</th>
                            <th className="p-3 border">Expiry Date</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myFoods.map(food => (
                            <tr key={food._id} className="text-center border-t">
                                <td className="p-2"><img src={food.image} alt="" className="h-12 mx-auto" /></td>
                                <td className="p-2">{food.title}</td>
                                <td className="p-2">{food.Category}</td>
                                <td className="p-2">{food.ExpiryDate}</td>
                                <td className="p-2">
                                    <button
                                        className="bg-yellow-400 px-3 py-1 rounded mr-2"
                                        onClick={() => {
                                            setSelectedFood(food);
                                            setShowUpdateModal(true);
                                        }}
                                    >Update</button>

                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => {
                                            setSelectedFood(food);
                                            setShowDeleteModal(true);
                                        }}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {showUpdateModal && (
                <UpdateModal
                    food={selectedFood}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdate}
                />
            )}
            {showDeleteModal && (
                <ConfirmModal
                    message={`Are you sure you want to delete "${selectedFood.title}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default MyItems;
