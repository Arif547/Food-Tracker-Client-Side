import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { formatDistanceToNowStrict, differenceInMilliseconds } from 'date-fns';
import { AuthContext } from '../provider/AuthProvider';
import { motion } from 'framer-motion';

const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = use(AuthContext);
    const [note, setNote] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        if (user?.email === food.userEmail) {
            setIsOwner(true);
        }
    }, [user, food]);

    useEffect(() => {
        fetch(`https://food-tracker-server-zeta.vercel.app/notes/${food._id}`)
            .then(res => res.json())
            .then(data => setAllNotes(data))
            .catch(err => console.error(err));
    }, [food._id]);

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
            const res = await fetch('https://food-tracker-server-zeta.vercel.app/notes', {
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
        <div className="max-w-6xl mx-auto py-16  lg:py-[120px] px-5 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 gap-8"
            >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <img src={food.image} alt={food.title} className="w-full h-[400px] object-cover transition-transform hover:scale-105 duration-300" />
                    <div className="p-6">
                        <h2 className="text-4xl font-bold mb-4 text-gray-800">{food.title}</h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600 font-semibold">Category:</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">{food.Category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600 font-semibold">Quantity:</span>
                                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">{food.Quantity}</span>
                            </div>
                            <p className="text-gray-700"><span className="font-semibold">Description:</span> {food.Description}</p>
                            <p className="text-gray-700"><span className="font-semibold">Expiry Date:</span> {food.ExpiryDate}</p>
                        </div>
                        
                        <div className="mt-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl shadow-inner">
                            <div className="flex items-center gap-2">
                                <span className="animate-pulse">⏳</span>
                                <span className="font-bold text-amber-800">{countdown}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-lg"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Add a Note</h3>
                        <textarea
                            className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            rows="4"
                            placeholder="Share your thoughts about this food item..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            disabled={!isOwner}
                        />
                        <button
                            onClick={handleNoteSubmit}
                            disabled={!isOwner}
                            className={`mt-4 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 ${
                                isOwner 
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1' 
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Add Note
                        </button>
                        {!isOwner && (
                            <p className="text-sm text-red-500 mt-3 flex items-center gap-2">
                                <span className="text-xl">⚠️</span>
                                Only the owner can add notes
                            </p>
                        )}
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white rounded-2xl p-6 shadow-lg"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Notes</h3>
                        {allNotes.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No notes yet. Be the first to add one!</p>
                        ) : (
                            <ul className="space-y-4">
                                {allNotes.map((note, idx) => (
                                    <motion.li 
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        <p className="text-gray-800 mb-2">{note.text}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="font-medium">{note.userName}</span>
                                            <span>•</span>
                                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default FoodDetails;
