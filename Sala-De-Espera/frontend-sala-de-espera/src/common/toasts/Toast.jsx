import React, { useState, useEffect } from 'react';
import './Toast.css';

function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 2000);
        return () => clearTimeout(timer); 
    }, [onClose]);

    return (
        <div className={`toast ${type}`}>
            {message}
        </div>
    );
}

export default function ToastManager({ toasts, removeToast }) {
    return (
        <div className="toast-container">
            {toasts.map((toast, index) => (
                <Toast 
                    key={index} 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => removeToast(index)} 
                />
            ))}
        </div>
    );
}
