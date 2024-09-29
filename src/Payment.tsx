//import React from 'react';
interface PaymentProps {
    planType: string | null; // 定义 planType 类型
  }
  
  const Payment: React.FC<PaymentProps> = ({ planType }) => {
    return (
      <div>
        <h1>Payment</h1>
        {planType ? <p>You have selected: {planType}</p> : <p>No plan selected.</p>}
      </div>
    );
  };
  

export default Payment;