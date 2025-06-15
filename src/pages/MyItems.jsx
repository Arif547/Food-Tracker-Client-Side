import React, { use, useEffect, useState } from 'react';
import UpdateModal from '../components/UpdateModal';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const MyItems = () => {
    const { user } = use(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        const fetchMyFoods = async () => {
            const res = await fetch(`http://localhost:3000/my-items?email=${user.email}`);
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
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:3000/foods/${food._id}`, {
                    method: 'DELETE',
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
                                        onClick={() => handleDelete(food)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showUpdateModal && (
                <UpdateModal
                    food={selectedFood}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default MyItems;
