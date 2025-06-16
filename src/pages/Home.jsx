import React from 'react';
import Banner from '../components/Banner';

import NearExpiryFoods from '../components/NearExpiryFoods';
import ExpiredFoods from '../components/ExpiredFoods';
import { motion, useScroll } from "motion/react"
import FoodStats from '../components/FoodStats';


const Home = () => {
    const { scrollYProgress } = useScroll()

    return (
        <div>
            <motion.div className='z-50'
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    originX: 0,
                    backgroundColor: "#ff0088",
                }}
            />


            <Banner></Banner>
            <NearExpiryFoods></NearExpiryFoods>
            <ExpiredFoods></ExpiredFoods>
            {/* <FoodStats><g/FoodStats> */}

            <section className="bg-green-50 lg:py-[120px] py-[80px] px-5 rounded-xl shadow">
                <div className='max-w-[1220px] mx-auto'>
                    <h2 className="text-2xl font-bold mb-4 text-green-800">Tips to Reduce Food Waste</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Store perishables like dairy and meat in the coldest part of the fridge.</li>
                        <li>Use transparent containers so leftovers are easily visible.</li>
                        <li>Label items with purchase or open dates for quick tracking.</li>
                        <li>Plan meals based on what’s already in your fridge or pantry.</li>
                        <li>Freeze items nearing expiry to extend their usability.</li>
                    </ul>
                </div>
            </section>

            <section className="bg-yellow-50 lg:py-[120px] py-[80px] px-5 rounded-xl shadow">
                <div className='max-w-[1220px] mx-auto'>
                    <h2 className="text-2xl font-bold mb-4 text-yellow-800">Donate Surplus Food</h2>
                    <p className="text-gray-700 mb-3">
                        Have extra food you won’t use before it expires? Help others by donating to local charities. Ensure items are sealed and not expired.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li><a href="https://www.feedingamerica.org/find-your-local-foodbank" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Find a local food bank</a></li>
                        <li><a href="https://www.foodpantries.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Nearby food pantries</a></li>
                        <li>Contact local shelters, community fridges, or soup kitchens in your area.</li>
                    </ul>
                </div>
            </section>


        </div>
    );
};

export default Home;