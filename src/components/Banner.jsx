import React from 'react';


const Banner = () => {
    return (
        <div>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <div
                        className="hero h-[650px]"
                        style={{
                            backgroundImage:
                                "url(https://i.ibb.co/rR6XwXLt/original-fajita-sizzling-hot-on-iron-plate-2025-03-26-21-19-35-utc.jpg)",
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div>
                                <h1 className="mb-5 text-5xl font-bold"> Welcome to Food Expiry Tracker System</h1>
                                <p className="mb-5 text-2xl">
                                    Keep Your Kitchen Organized & Waste-Free
                                </p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <div
                        className="hero h-[650px]"
                        style={{
                            backgroundImage:
                                "url(https://i.ibb.co/35CjFZJQ/mexican-food-table-with-tacos-nachos-and-beer-2025-03-06-05-39-47-utc.jpg)",
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div>
                                <h1 className="mb-5 text-5xl font-bold">Welcome to Your Food Expiry Assistant</h1>
                                <p className="mb-5 text-2xl">
                                    Track What You Store. Eat Before It’s Late.
                                </p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <div
                        className="hero h-[650px]"
                        style={{
                            backgroundImage:
                                "url(https://i.ibb.co/JhtthCx/table-full-of-mexican-food-chili-con-carne-nacho-2025-01-09-07-03-58-utc.jpg)",
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div>
                                <h1 className="mb-5 text-5xl font-bold">Your Personal Kitchen Companion</h1>
                                <p className="mb-5 text-2xl">
                                    Smart Tracking. Less Waste. Better Health.
                                </p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <div
                        className="hero h-[650px]"
                        style={{
                            backgroundImage:
                                "url(https://i.ibb.co/G4NvVDvD/typical-mexican-food-tacos-tamales-guacamole-t-2025-01-08-17-36-55-utc.jpg)",
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div>
                                <h1 className="mb-5 text-5xl font-bold">Stay Fresh, Stay Safe</h1>
                                <p className="mb-5 text-2xl">
                                    Monitor Expiry Dates and Reduce Food Waste Easily
                                </p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;