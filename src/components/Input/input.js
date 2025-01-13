import React, { useEffect } from 'react';

export const Input = () => {


        useEffect(() => {
                console.log('useEffect');
        }, []);

        return (
                <>
                        <input></input>
                </>
        )
};