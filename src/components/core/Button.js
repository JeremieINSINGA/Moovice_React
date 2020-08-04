import React from 'react';

const Button = ({ children, onClick }) => {
    return (
        <button 
            type="button" 
            className="btn btn-light mt-3" 
            onClick={onClick}>
                {children}
        </button>
    );
}

export default Button;