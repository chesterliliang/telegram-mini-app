import React, { useEffect } from 'react';
import './Payment.css';
import { TonConnect, TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
// Define custom storage using sessionStorage
// Define custom storage using sessionStorage with Promises
const customStorage = {
  getItem: (key: string) => {
      return new Promise<string | null>((resolve) => {
          resolve(sessionStorage.getItem(key));
      });
  },
  setItem: (key: string, value: string) => {
      return new Promise<void>((resolve) => {
          sessionStorage.setItem(key, value);
          resolve();
      });
  },
  removeItem: (key: string) => {
      return new Promise<void>((resolve) => {
          sessionStorage.removeItem(key);
          resolve();
      });
  }
};
// Initialize TonConnect instance globally to manage connection state
const tonConnect = new TonConnect({
    manifestUrl: 'https://192.168.42.214:5174/tonconnect-manifest.json',
    storage: customStorage // 使用 SessionStorage 以避免助记词恢复页面
});

interface PaymentProps {
    planType: string | null; // Plan selected in the Store
}

const Payment: React.FC<PaymentProps> = ({ planType }) => {
    useEffect(() => {
        // Use onStatusChange to monitor the wallet connection state
        const unsubscribe = tonConnect.onStatusChange((walletInfo) => {
            if (walletInfo) {
                console.log('Wallet connected:', walletInfo);
            } else {
                console.log('No wallet connected.');
            }
        });

        // Cleanup the subscription on component unmount
        return () => {
            unsubscribe();
        };
    }, []);

    const eSIMs = [
        { id: 1, name: 'Destroyer', data: '1GB', validity: '7 days', price: '5 USD' },
        { id: 2, name: 'Cruiser', data: '3GB', validity: '30 days', price: '18 USD' },
        { id: 3, name: 'BattleShip', data: '20GB', validity: '365 days', price: '69 USD' },
        { id: 4, name: 'Carrier', data: '120GB', validity: '365 days', price: '259 USD' }
    ];
    
    const planDetails = eSIMs.find(plan => plan.name === planType) || {
        name: 'N/A',
        price: 'N/A',
        data: 'N/A',
        validity: 'N/A'
    };

    return (
        <TonConnectUIProvider manifestUrl="https://1c45-38-150-99-30.ngrok-free.app/tonconnect-manifest.json">
            <div className="payment-container">
                <h1>Plan Summary</h1>
                {planType ? (
                    <table className="summary-table">
                        <tbody>
                            <tr>
                                <td className="left-align">Plan Name:</td>
                                <td className="right-align">{planDetails.name}</td>
                            </tr>
                            <tr>
                                <td className="left-align">Price:</td>
                                <td className="right-align">{planDetails.price}</td>
                            </tr>
                            <tr>
                                <td className="left-align">Data:</td>
                                <td className="right-align">{planDetails.data}</td>
                            </tr>
                            <tr>
                                <td className="left-align">Validity:</td>
                                <td className="right-align">{planDetails.validity}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No plan selected.</p>
                )}

                {/* TON Wallet button */}
                <TonConnectButton />

                {/* PayPal button */}
                <button className="pay-button">Use Paypal</button>
            </div>
        </TonConnectUIProvider>
    );
};

export default Payment;
