import { useState } from 'react';
import './App.css';
import Store from './Store';
import UeSIM from './eSIM';
import Points from './Points';
import Profile from './Profile';
import Payment from './Payment'; // 导入 Payment 组件

import iconStore_Line from './assets/store-line.png';
import iconStore_Fill from './assets/store-fill.png';
import iconSIM_Line from './assets/sim-card-line.png';
import iconSIM_Fill from './assets/sim-card-fill.png';
import iconToken_Line from './assets/money-dollar-circle-line.png';
import iconToken_Fill from './assets/money-dollar-circle-fill.png';
import iconProfile_Line from './assets/profile-line.png';
import iconProfile_Fill from './assets/profile-fill.png';

const App = () => {
  const [activeTab, setActiveTab] = useState('Points');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null); // 修改状态类型

  const renderContent = () => {
    switch (activeTab) {
      case 'Points':
        return <Points />;
      case 'Store':
        return <Store onBuyNow={setSelectedPlan} setActiveTab={setActiveTab} />; // 传递 setActiveTab
      case 'eSIM':
        return <UeSIM />;
      case 'Profile':
        return <Profile />;
      case 'Payment':
        return <Payment planType={selectedPlan} />; // 传递选中的 Plan 类型
      default:
        return <Points />;
    }
  };

  return (
    <div>
      {renderContent()}
      <div className="tab-container">
        <button onClick={() => setActiveTab('Points')}>
          <div className="tab-icon-container">
            <img src={activeTab === 'Points' ? iconToken_Fill : iconToken_Line} alt="Token Icon" className="tab-icon" />
            <span className={activeTab === 'Points' ? 'active-tab' : ''}>Points</span>
          </div>
        </button>
        <button onClick={() => setActiveTab('Store')}>
          <div className="tab-icon-container">
            <img src={activeTab === 'Store' ? iconStore_Fill : iconStore_Line} alt="Store Icon" className="tab-icon" />
            <span className={activeTab === 'Store' ? 'active-tab' : ''}>Store</span>
          </div>
        </button>
        <button onClick={() => setActiveTab('eSIM')}>
          <div className="tab-icon-container">
            <img src={activeTab === 'eSIM' ? iconSIM_Fill : iconSIM_Line} alt="eSIM Icon" className="tab-icon" />
            <span className={activeTab === 'eSIM' ? 'active-tab' : ''}>eSIM</span>
          </div>
        </button>
        <button onClick={() => setActiveTab('Profile')}>
          <div className="tab-icon-container">
            <img src={activeTab === 'Profile' ? iconProfile_Fill : iconProfile_Line} alt="Profile Icon" className="tab-icon" />
            <span className={activeTab === 'Profile' ? 'active-tab' : ''}>Profile</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default App;
