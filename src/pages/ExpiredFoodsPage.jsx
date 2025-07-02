import { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';

const ExpiredFoodsPage = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchExpiredFoods = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('https://food-tracker-server-zeta.vercel.app/foods/expired');
                if (!res.ok) throw new Error('Failed to fetch expired foods');
                const data = await res.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching expired foods:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpiredFoods();
    }, []);

    // Calculate pagination
    const totalPages = Math.ceil(foods.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFoods = foods.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-16 lg:py-[120px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">Expired Foods</h1>
                    <p className="text-lg text-gray-600">These items have passed their expiration date</p>
                </div>
                
                {foods.length === 0 ? (
                    <div className="text-center text-gray-500 text-xl">
                        No expired foods found
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentFoods.map((food) => (
                                <FoodCard key={food._id} food={food} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 gap-2">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 rounded ${
                                            currentPage === index + 1
                                                ? 'bg-red-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ExpiredFoodsPage;
