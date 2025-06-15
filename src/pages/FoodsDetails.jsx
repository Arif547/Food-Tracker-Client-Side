import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { formatDistanceToNowStrict, differenceInMilliseconds } from 'date-fns';
import { AuthContext } from '../provider/AuthProvider';

const FoodDetails = () => {
    const food = useLoaderData(); // Loaded from route: /foods-details/:id
    const { user } = use(AuthContext);
    const [note, setNote] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [countdown, setCountdown] = useState('');

    // Check if the logged-in user is the owner
    useEffect(() => {
        if (user?.email === food.userEmail) {
            setIsOwner(true);
        }
    }, [user, food]);


    // Fetch notes (you'll need a route like /notes?foodId=xxx)
    useEffect(() => {
        fetch(`http://localhost:3000/notes/${food._id}`)
            .then(res => res.json())
            .then(data => setAllNotes(data))
            .catch(err => console.error(err));
    }, [food._id]);

    // Countdown logic
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const expiry = new Date(food.ExpiryDate);
            if (expiry > now) {
                const diff = formatDistanceToNowStrict(expiry, { roundingMethod: 'floor' });
                setCountdown(diff + ' remaining');
            } else {
                setCountdown('Expired');
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [food.ExpiryDate]);

    const handleNoteSubmit = async () => {
        if (!note.trim()) return;

        const newNote = {
            foodId: food._id,
            text: note,
            createdAt: new Date(),
            userEmail: user.email,
            userName: user.displayName || 'Anonymous'
        };

        try {
            const res = await fetch('http://localhost:3000/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNote)
            });
            const saved = await res.json();
            setAllNotes(prev => [...prev, saved]);
            setNote('');
        } catch (err) {
            console.error('Failed to save note', err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="border rounded p-6 shadow">
                <img src={food.image} alt={food.title} className="w-full max-h-96 object-cover mb-4 rounded" />
                <h2 className="text-3xl font-bold mb-2">{food.title}</h2>
                <p><strong>Category:</strong> {food.Category}</p>
                <p><strong>Quantity:</strong> {food.Quantity}</p>
                <p><strong>Description:</strong> {food.Description}</p>
                <p><strong>Expiry Date:</strong> {food.ExpiryDate}</p>

                <div className="mt-4 p-4 bg-yellow-100 rounded">
                    <strong>⏳ Expiration Countdown:</strong> {countdown}
                </div>
            </div>

            <div className="border rounded p-6 shadow bg-white">
                <h3 className="text-2xl font-semibold mb-4">Add a Note</h3>

                <textarea
                    className="w-full p-3 border rounded resize-none"
                    rows="4"
                    placeholder="Write your note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    disabled={!isOwner}
                />

                <button
                    onClick={handleNoteSubmit}
                    disabled={!isOwner}
                    className={`mt-3 px-5 py-2 rounded text-white ${isOwner ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                    Add Note
                </button>

                {!isOwner && (
                    <p className="text-sm text-red-500 mt-2">
                        ⚠️ Only the user who added this item can submit a note.
                    </p>
                )}
            </div>

            <div className="border rounded p-6 shadow bg-white">
                <h3 className="text-xl font-bold mb-4">Notes</h3>
                {
                    allNotes.length === 0 ? (
                        <p>No notes yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            {allNotes.map((note, idx) => (
                                <li key={idx} className="border p-3 rounded bg-gray-50">
                                    <p className="text-gray-800">{note.text}</p>
                                    <small className="text-gray-500">
                                        Posted by {note.userName} on {new Date(note.createdAt).toLocaleString()}
                                    </small>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </div>
    );
};

export default FoodDetails;
