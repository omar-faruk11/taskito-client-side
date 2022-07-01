import React from 'react';
import loading from '../../src/Assat/loding.svg'

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <img src={loading} alt="loading" />
        </div>
    );
};

export default Loading;