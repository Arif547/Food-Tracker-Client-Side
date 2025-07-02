import { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import {
    AiOutlineBars,
    AiOutlinePlus,
    AiOutlineHome,
    AiOutlineClose,
    AiOutlineSetting,
    AiOutlineHeart,
    AiOutlineUser
} from 'react-icons/ai';
import { BsBook, BsBookmark, BsCollection } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { IoRestaurantOutline, IoStatsChart } from 'react-icons/io5';
import { MdOutlineExplore, MdOutlineFavorite } from 'react-icons/md';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';
import { FaUtensils } from 'react-icons/fa';

const Sidebar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const sidebarRef = useRef(null);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    // Navigation items with categories
    const navigationSections = [
        {
            title: 'Main',
            items: [
                { path: '/', label: 'Home', icon: AiOutlineHome },
                // { path: '/dashboard/add-food', label: 'Dashboard', icon: IoStatsChart, end: true },
                // { path: '/explore', label: 'Explore', icon: MdOutlineExplore },
            ]
        },
        {
            title: 'My Recipes',
            items: [
                { path: '/dashboard/add-food', label: 'Add Food', icon: AiOutlinePlus },
                { path: '/dashboard/my-items', label: 'My Items', icon: BsBook },
                // { path: '/dashboard/saved-recipes', label: 'Saved Recipes', icon: BsBookmark },
                // { path: '/dashboard/favorites', label: 'Favorites', icon: MdOutlineFavorite },
            ]
        },
        // {
        //     title: 'Account',
        //     items: [
        //         { path: '/dashboard/profile', label: 'Profile', icon: CgProfile },
        //         { path: '/dashboard/settings', label: 'Settings', icon: AiOutlineSetting },
        //     ]
        // }
    ];

    // Handle logout with confirmation
    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success("Successfully logged out!");
            setIsOpen(false);
        } catch (error) {
            toast.error("Error logging out. Please try again.");
        }
    };

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Handle click outside to close sidebar (mobile)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const navLinkStyle = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden ${isActive
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
            : 'text-base-content hover:bg-primary/10 hover:text-primary hover:scale-105'
        } ${isCollapsed ? 'justify-center px-2' : ''}`;

    const sectionTitleStyle = `text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 px-3 ${isCollapsed ? 'hidden' : ''
        }`;

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="flex sticky z-40 top-0 items-center justify-between p-4 lg:hidden bg-base-100 shadow-sm border-b border-base-200">
                <Link to='/' className='flex items-center gap-2 group'>
                    <FaUtensils className='text-4xl text-green-600 group-hover:scale-110 transition-transform' />
                    <h1 className='text-2xl font-bold max-md:hidden group-hover:text-green-600 transition-colors'>FoodSaver</h1>
                </Link>

                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
                    aria-label="Toggle sidebar"
                >
                    <AiOutlineBars className="w-6 h-6 text-base-content" />
                </button>
            </div>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`
                    sticky top-0 left-0 z-50 h-screen bg-base-100 shadow-2xl border-r border-base-200
                    flex flex-col transition-all duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    ${isCollapsed ? 'w-24' : 'w-72'}
                    lg:translate-x-0 lg:static lg:z-auto
                `}
            >
                {/* Header Section */}
                <div className={`${isCollapsed ? '' : 'flex'} items-center justify-between p-4 border-b border-base-200 bg-base-50`}>
                    <Link to="/" className={`flex items-center space-x-3 group ${isCollapsed ? 'justify-center' : ''}`}>
                    
                        <Link to='/' className='flex items-center gap-2 group'>
                            <FaUtensils className='text-4xl text-green-600 group-hover:scale-110 transition-transform' />
                            
                            {!isCollapsed && (
                                <div>
                                    <h1 className='text-2xl font-bold max-md:hidden group-hover:text-green-600 transition-colors'>FoodSaver</h1>
                                    {/* <p className="text-xs text-base-content/60 -mt-1">Dashboard</p> */}
                                </div>
                            )}
                        </Link>

                    </Link>

                    <div className={`flex items-center space-x-2 ${isCollapsed ? 'mt-2 justify-center' : ''}`}>
                        {/* Collapse button for desktop */}
                        <button
                            onClick={toggleCollapse}
                            className="hidden lg:flex p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
                            aria-label="Toggle sidebar width"
                        >
                            <AiOutlineBars className="w-4 h-4 text-base-content" />
                        </button>

                        {/* Close button for mobile */}
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
                            aria-label="Close sidebar"
                        >
                            <AiOutlineClose className="w-5 h-5 text-base-content" />
                        </button>
                    </div>
                </div>

                {/* User Info Section */}
                {user && (
                    <div className={`p-4 border-b border-base-200 bg-gradient-to-r from-primary/5 to-secondary/5 ${isCollapsed ? 'px-2' : ''}`}>
                        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
                            <div className="relative">
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName || "User"}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
                            </div>
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-base-content truncate">
                                        {user.displayName || 'User'}
                                    </p>
                                    <p className="text-xs text-base-content/60 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Sections */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                    {navigationSections.map((section, sectionIndex) => (
                        <div key={section.title}>
                            <h3 className={sectionTitleStyle}>{section.title}</h3>
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            end={item.end}
                                            className={navLinkStyle}
                                            title={isCollapsed ? item.label : ''}
                                        >
                                            <IconComponent className="w-5 h-5 flex-shrink-0" />
                                            {!isCollapsed && (
                                                <>
                                                    <span className="flex-1">{item.label}</span>
                                                    {/* Active indicator */}
                                                    <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                                </>
                                            )}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer Section */}
                <div className="border-t border-base-200 p-4 space-y-3 bg-base-50">
                    {/* Dark Mode Toggle */}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogOut}
                        className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium 
                            text-error hover:bg-error/10 hover:scale-105 transition-all duration-200 group
                            ${isCollapsed ? 'justify-center px-2' : ''}
                        `}
                        title={isCollapsed ? 'Logout' : ''}
                    >
                        <FiLogOut className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform duration-200" />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
                    onClick={toggleSidebar}
                    aria-label="Close sidebar overlay"
                ></div>
            )}

            {/* Main content padding for desktop */}
            {/* <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}></div> */}
        </>
    );
};

export default Sidebar;