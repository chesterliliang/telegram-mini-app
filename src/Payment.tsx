import React, { useEffect, useRef } from 'react';
import paymentfake from './assets/fakepayment.png';
import payed from './assets/payed.png';
import './Payment.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//const Payment: React.FC<{ redirectUrl: string }> = ({ redirectUrl }) => {

const Payment: React.FC = () => {
    const location = useLocation();
    const { redirectUrl } = location.state || { redirectUrl: '/' };
    console.log(`redirectUrl ${redirectUrl}`);
    const paymentRef = useRef<HTMLDivElement | null>(null);
    const payedRef = useRef<HTMLImageElement | null>(null);
    const navigate = useNavigate();
    useEffect(() => {    
        const paymentElement = paymentRef.current;
        if (paymentElement) {
            // Animate the payment image to slide up from the bottom and center
            paymentElement.style.transition = 'transform 1s ease-out';
            paymentElement.style.transform = 'translateY(0)';
        }
    }, []);

    const handlePaymentClick = () => {
        const payedElement = payedRef.current;
        if (payedElement) {
            // Show the payed image and animate it with a bounce effect
            payedElement.style.display = 'block';
            payedElement.style.animation = 'bounce 0.5s ease-out';
        }

        // Navigate to the specified redirectUrl after a delay
        setTimeout(() => {
            navigate(redirectUrl);
        }, 1000);
    };

    return (
        <div className="payment-container">
            <div ref={paymentRef} className="payment-fake" onClick={handlePaymentClick}>
                <img src={paymentfake} alt="Payment Fake" />
            </div>
            <img ref={payedRef} src={payed} alt="Payed" className="payed-image" />
        </div>
    );
};

export default Payment;
