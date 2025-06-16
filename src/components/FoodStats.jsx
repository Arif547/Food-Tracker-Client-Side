import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const FoodStats = () => {

    const [nearExpiryFoods, setNearExpiryFoods] = useState([]);
    const [expiredCount, setExpiredCount] = useState([]);

    useEffect(() => {
        fetch('https://food-tracker-server-zeta.vercel.app/foods/near-expiry')
            .then(res => res.json())
            .then(data => setNearExpiryFoods(data));
    }, []);

    useEffect(() => {
        fetch('https://food-tracker-server-zeta.vercel.app/foods/expired')
            .then(res => res.json())
            .then(data => setExpiredCount(data));
    }, []);

    // console.log(nearExpiryFoods.length);
    // console.log(expiredCount.length);



    return (
        <div className='max-w-[1220px] mx-auto mb-16'>


            <h2 className="text-5xl font-bold mb-14 text-center">Food Stats</h2>

            <div className="flex gap-8 w-full">
                <div className="w-1/2 p-10 bg-[#F3F3F6] text-center rounded-2xl">
                    <div className="text-2xl font-medium mb-6">Nearly Expiring Foods</div>
                    <div className="text-6xl font-medium"><CountUp end={nearExpiryFoods.length} duration={2} enableScrollSpy /></div>
                    {/* <div className="stat-actions">
                        <button className="btn btn-xs btn-success">View All</button>
                    </div> */}
                </div>

                <div className="w-1/2 p-10 bg-[#F3F3F6] text-center rounded-2xl">
                    <div className="text-2xl font-medium mb-6">Expired Foods</div>
                    <div className="text-6xl font-medium"><CountUp end={expiredCount.length} duration={2} enableScrollSpy /></div>
                    {/* <div className="stat-actions">
                        <button className="btn btn-xs">View All</button>
                        
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default FoodStats;
