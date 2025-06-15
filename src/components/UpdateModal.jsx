import React, { useState } from 'react';

const UpdateModal = ({ food, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(food);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3000/foods/${food._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const updated = await res.json();
        onUpdate(updated);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow w-96">
                <h3 className="text-xl font-bold mb-4">Update Food</h3>
                <form onSubmit={handleSubmit}>
                    <input className="w-full p-2 mb-3 border" name="title" value={formData.title} onChange={handleChange} />
                    <input className="w-full p-2 mb-3 border" name="Category" value={formData.Category} onChange={handleChange} />
                    <input className="w-full p-2 mb-3 border" name="ExpiryDate" value={formData.ExpiryDate} onChange={handleChange} />
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
