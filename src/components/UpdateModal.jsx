import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const UpdateModal = ({ food, onClose, onUpdate, user }) => {
    const [formData, setFormData] = useState(food);

    // 🟡 This ensures form data updates when a different food is selected
    useEffect(() => {
        setFormData(food);
    }, [food]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`https://food-tracker-server-zeta.vercel.app/foods/${food._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                throw new Error('Failed to update food');
            }

            const updated = await res.json();
            onUpdate(updated);

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `"${updated.title}" has been successfully updated.`,
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            // Optional: show error alert
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message || 'Something went wrong while updating.',
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow w-[1220px]">
                <h3 className="text-xl font-bold mb-4 text-center">Update Food</h3>
                <form onSubmit={handleSubmit}>
                    {/* <input className="w-full p-2 mb-3 border" name="title" value={formData.title} onChange={handleChange} />
                    <input className="w-full p-2 mb-3 border" name="Category" value={formData.Category} onChange={handleChange} />
                    <input className="w-full p-2 mb-3 border" name="ExpiryDate" value={formData.ExpiryDate} onChange={handleChange} /> */}

                    {/* new line */}


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Food Image</label>
                            <input type="url" name="image" className="input w-full" placeholder="Image URL" required value={formData.image} onChange={handleChange} />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Food Title</label>
                            <input type="text" name="title" className="input w-full" placeholder="Food Title" required value={formData.title} onChange={handleChange} />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Quantity</label>
                            <input type="number" name="Quantity" className="input w-full" placeholder="1" required value={formData.Quantity} onChange={handleChange} />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Expiry Date</label>
                            <input type='date' name="ExpiryDate" className="input w-full" placeholder="Expiry Date" required value={formData.ExpiryDate} onChange={handleChange}></input>
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Category</label>
                            <select name="Category" className="select w-full" required value={formData.Category} onChange={handleChange}>
                                <option value="">Select Category</option>
                                <option>Dairy</option>
                                <option>Meat</option>
                                <option>Vegetables</option>
                                <option>Snacks</option>

                            </select>
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Description</label>
                            <textarea name="Description" className="textarea w-full" placeholder="Description" required value={formData.Description} onChange={handleChange} />
                        </fieldset>



                    </div>

                    {/* new line */}







                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
