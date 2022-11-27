import React from 'react';
import { FallingLines } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
            <FallingLines
                color="#181818"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            />
        </div>
    );
};

export default Loader;