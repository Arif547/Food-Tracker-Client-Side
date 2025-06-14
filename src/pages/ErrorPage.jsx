import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://i.ibb.co/JhtthCx/table-full-of-mexican-food-chili-con-carne-nacho-2025-01-09-07-03-58-utc.jpg)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-8xl font-bold">404</h1>
                        <p className="mb-5 text-3xl">
                            The page you were looking for does not exist
                        </p>
                        <Link to="/" className="btn btn-primary">Back To Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;