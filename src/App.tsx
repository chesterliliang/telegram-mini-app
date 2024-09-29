import { useState } from 'react';
import Store from './Store';
import MyESIMs from './MyESIMs'; // 导入 MyESIMs 组件
import Token from './Token'; // 导入 Token 组件
import Profile from './Profile'; // 导入 Profile 组件
import icon from './assets/icon.png';

const App = () => {

  const [activeTab, setActiveTab] = useState('Store');

  const renderContent = () => {
    switch (activeTab) {
      case 'Store':
        return <Store />;
      case 'MyESIMs':
        return <MyESIMs />;;
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
      <Store />
      {renderContent()}
      <div className="tab-container">
        <button onClick={() => setActiveTab('Store')}>
          <div className="tab-icon-container">
            <img src={icon} alt="Store Icon" className="tab-icon" />
            <span>Store</span>
          </div>
        </button>
        <button onClick={() => setActiveTab('MyESIMs')}>
          <div className="tab-icon-container">
            <img src={icon} alt="MyESIMs Icon" className="tab-icon" />
            <span>MyESIMs</span>
          </div>
        </button>
        <button onClick={() => setActiveTab('Token')}>
          <div className="tab-icon-container">
            <img src={icon} alt="Token Icon" className="tab-icon" />
            <span>Token</span>
          </div>
        </button>
        <button onClick={() => setActiveTab('Profile')}>
          <div className="tab-icon-container">
            <img src={icon} alt="Profile Icon" className="tab-icon" />
            <span>Profile</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default App;