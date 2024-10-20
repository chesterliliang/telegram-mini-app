import React, { useEffect, useRef } from 'react';
import paymentfake from './assets/fakepayment.png';
import payed from './assets/payed.png';
import './Payment.css';
import { useGlobalContext } from './GlobalContext'; // 假设 GlobalContext.tsx 在相同目录或合适路径
interface PaymentProps {
    onback2page: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onback2page }) => {

    const {
        gAction,
    } = useGlobalContext();
    console.log(`Pay ${gAction}`);
    const paymentRef = useRef<HTMLDivElement>(null);
    const payedRef = useRef<HTMLImageElement>(null);

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
            switch (gAction) {
                case "Destroyer":
                    break;
                case "Cruiser":
                    break;
                case "BattleShip":
                    break;
                case "Carrier":
                    break;
                default:
                    return;
            }
            payedElement.style.display = 'block';
            setTimeout(() => {
                onback2page();
            }, 2000);
        }
    };

    return (
        <div className="payment-container">
            <div ref={paymentRef} className="payment-fake" onClick={handlePaymentClick}>
                <img src={paymentfake} alt="Payment Fake" className="paymentfake-image" />
                <img ref={payedRef} src={payed} alt="Payed" className="payed-image" />
            </div>
        </div>
    );
};

export default Payment;
