import React from 'react';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
            </div>
            <div className="loading-text">Loading...</div>
        </div>
    );
};

export default Loading;

