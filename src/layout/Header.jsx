import React, { use, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { FaUtensils } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
    const { user, logOut } = use(AuthContext);
    const [showMenu, setShowMenu] = useState(localStorage.getItem("menuState") === "true");

    const handleLogOut = () => {
        logOut().then(() => {
            toast.success("Sign-out successful!");
        }).catch(() => {
            toast.error("Something went wrong!");
        });
    }

    return (
        <div className='bg-white border-b border-gray-50 sticky top-0 z-50 '>
            <div className='grid grid-cols-3 lg:grid-cols-12 max-w-[1240px] max-lg:justify-center mx-auto py-4 lg:items-center px-5'>
                <div className='lg:hidden'>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-green-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white text-[18px] font-medium space-y-2 rounded-xl z-50 mt-3 w-52 p-3 shadow-lg">
                            <NavLink to='/' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Home</NavLink>
                            <NavLink to='/Fridge' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Fridge</NavLink>
                            <NavLink to='/expired-foods' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Expired Foods</NavLink>
                            <NavLink to='/donation' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Donation</NavLink>
                            <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Contact</NavLink>

                            {/* {user && <NavLink to='/add-food' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Add Food</NavLink>}
                            {user && <NavLink to='/my-items' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>My Items</NavLink>} */}
                        </ul>
                    </div>
                </div>

                <div className='flex gap-3 lg:col-span-3 max-lg:justify-center items-center'>
                    <Link to='/' className='flex items-center gap-2 group'>
                        <FaUtensils className='text-4xl text-green-600 group-hover:scale-110 transition-transform' />
                        <h1 className='text-2xl font-bold max-md:hidden group-hover:text-green-600 transition-colors'>FoodSaver</h1>
                    </Link>
                </div>

                <div className='menu-navbar flex lg:gap-8 gap-4 text-[18px] font-medium col-span-6 justify-center items-center max-lg:hidden'>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Home</NavLink>
                    <NavLink to='/Fridge' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Fridge</NavLink>
                    <NavLink to='/expired-foods' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Expired Foods</NavLink>

                    <NavLink to='/donation' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Donation</NavLink>
                    <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Contact</NavLink>
                    {/* {user && <>
                        <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Dashboard</NavLink>
                        <NavLink to='/add-food' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Add Food</NavLink>
                        <NavLink to='/my-items' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>My Items</NavLink>
                    </>} */}
                </div>

                <div className='lg:col-span-3 flex justify-end items-center gap-4'>
                    {user ? (
                        <div className="relative group">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="flex items-center gap-2">
                                    <img
                                        src={user.photoURL}
                                        alt="User Avatar"
                                        className="w-12 h-12 object-cover rounded-full cursor-pointer border-2 border-green-500 hover:border-green-600 transition-colors group-hover:scale-105"
                                    />
                                </div>
                                <div tabIndex={0} className="dropdown-content menu absolute top-14 right-0 bg-white p-6 shadow-2xl rounded-xl w-72 z-50 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                                            <img
                                                src={user.photoURL}
                                                alt="User Avatar"
                                                className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                                            />
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{user.displayName}</h3>
                                                <p className="text-sm text-green-600 font-medium">Premium Member</p>
                                            </div>
                                        </div>
                                        <Link to="/dashboard/my-items" className="flex text-xl font-medium items-center gap-3 py-2.5 px-4  hover:bg-green-50 rounded-lg transition-colors">

                                            Dashboard
                                        </Link>                                      

                                           
                                        
                                        <button
                                            onClick={handleLogOut}
                                            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg cursor-pointer hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex gap-4'>
                            <Link to='/login' className="px-6 py-2.5 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-medium transition-all duration-300 hover:scale-105">Login</Link>
                            <Link to='/register' className="px-6 py-2.5 text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg font-medium transition-all duration-300 hover:scale-105 max-md:hidden">Register</Link>
                        </div>
                    )}
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Header;