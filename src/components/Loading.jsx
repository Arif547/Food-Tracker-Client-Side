import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center'>
            <span className="loading loading-spinner text-error"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    );
};

export default Loading;