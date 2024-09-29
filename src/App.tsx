import { useState } from 'react';
import './App.css';
import Store from './Store';
import UeSIM from './eSIM'; // 导入 MyESIMs 组件
import Token from './Token'; // 导入 Token 组件
import Profile from './Profile'; // 导入 Profile 组件

import iconStore_Line from './assets/store-line.png';
import iconStore_Fill from './assets/store-fill.png';
import iconSIM_Line from './assets/sim-card-line.png';
import iconSIM_Fill from './assets/sim-card-fill.png';
import iconToken_Line from './assets/money-dollar-circle-line.png';
import iconToken_Fill from './assets/money-dollar-circle-fill.png';
import iconProfile_Line from './assets/profile-line.png';
import iconProfile_Fill from './assets/profile-fill.png';
const App = () => {

  const [activeTab, setActiveTab] = useState('Store');

  const renderContent = () => {
    switch (activeTab) {
      case 'Store':
        return <Store />;
      case 'eSIM':
        return <UeSIM />;;
      case 'Token':
        return <Token />;
      case 'Profile':
        return <Profile />;
      default:
        return <Store />;
    }
  };

  return (
    <div>
      {renderContent()}
      <div className="tab-container">
        <button onClick={() => setActiveTab('Store')}>
          <div className="tab-icon-container">
            <img src={activeTab === 'Store' ? iconStore_Fill : iconStore_Line} alt="Profile Icon" className="tab-icon" />
            <span className={activeTab === 'Store' ? 'active-tab' : ''}>Store</span>
          </div>
        </button>
        <button onClick={() => setActiveTab('eSIM')}>
          <div className="tab-icon-container">
            <img src={activeTab === 'eSIM' ? iconSIM_Fill : iconSIM_Line} alt="Profile Icon" className="tab-icon" />
            <span className={activeTab === 'eSIM' ? 'active-tab' : ''}>eSIM</span>
          </div>
        </button>
        <button onClick={() => setActiveTab('Token')}>
          <div className="tab-icon-container">
            <img src={activeTab === 'Token' ? iconToken_Fill : iconToken_Line} alt="Profile Icon" className="tab-icon" />
            <span className={activeTab === 'Token' ? 'active-tab' : ''}>Token</span>
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