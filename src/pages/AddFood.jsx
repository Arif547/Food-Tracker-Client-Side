import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const AddFood = () => {

    const { user } = use(AuthContext);
    // console.log(user);

    const handleAddFood = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newFood = Object.fromEntries(formData.entries());
        newFood.userName = user.displayName;
        newFood.userEmail = user.email;
        newFood.createdAt = new Date().toISOString();

        console.log(newFood);

        fetch('http://localhost:3000/foods', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFood)
        })
            .then(res => res.json())
            .then(data => {

                if (data.insertedId) {
                    // console.log('added successfully.')
                    Swal.fire({
                        title: "Food added successfully!",
                        icon: "success",
                        draggable: true
                    });

                    // form.reset()
                }
            })
    }

    return (
        <div className='max-w-[1240px] mx-auto mt-10 px-5 py-10 md:py-[120px]'>
            <h2 className="text-3xl font-bold mb-7 text-center">Add Your Food</h2>

            <form onSubmit={handleAddFood}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Food Image</label>
                        <input type="url" name="image" className="input w-full" placeholder="Image URL" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Food Title</label>
                        <input type="text" name="title" className="input w-full" placeholder="Food Title" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Quantity</label>
                        <input type="number" name="Quantity" className="input w-full" placeholder="1" required />
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Expiry Date</label>
                        <input type='date' name="ExpiryDate" className="input w-full" placeholder="Expiry Date" required></input>
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Category</label>
                        <select name="Category" className="select w-full" required>
                            <option value="">Select Category</option>
                            <option>Dairy</option>
                            <option>Meat</option>
                            <option>Vegetables</option>
                            <option>Snacks</option>

                        </select>
                    </fieldset>

                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Description</label>
                        <textarea name="Description" className="textarea w-full" placeholder="Description" required />
                    </fieldset>



                </div>

                <input type="submit" className="btn w-full mt-6" value="Add Food" />
            </form>

        </div>
    );
};

export default AddFood;