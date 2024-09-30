import React from 'react';
import './Payment.css';


interface PaymentProps {
    planType: string | null; // Plan selected in the Store
}

const Payment: React.FC<PaymentProps> = ({ planType }) => {
   
    // Define a summary of the selected plan for demonstration
    const planDetails = {
        name: planType || 'N/A',
        price: planType === 'Plan A' ? '5 USD' : planType === 'Plan B' ? '18 USD' : '49 USD',
        data: planType === 'Plan A' ? '1GB' : planType === 'Plan B' ? '3GB' : '10GB',
        validity: planType === 'Plan A' ? '7 days' : planType === 'Plan B' ? '30 days' : '180 days',
    };

    return ( 

            
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
    
      <button className="pay-button" >Confirm</button> 
      </div>
  );
};

export default Payment;
