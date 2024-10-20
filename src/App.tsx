import { useState } from 'react';
import Launch from './Launch'; // 导入 Launch 组件
import './App.css';
import Store from './Store';
import UeSIM from './eSIM';
import Home from './Home';
import Payment from './Payment';
import Action from './Action';
import { GlobalProvider } from './GlobalContext';
import { useGlobalContext } from './GlobalContext'; // 假设 GlobalContext.tsx 在相同目录或合适路径
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';//, useNavigate

import iconStore_Line from './assets/store-line.png';
import iconStore_Fill from './assets/store-fill.png';
import iconSIM_Line from './assets/sim-card-line.png';
import iconSIM_Fill from './assets/sim-card-fill.png';
import iconToken_Line from './assets/money-dollar-circle-line.png';
import iconToken_Fill from './assets/money-dollar-circle-fill.png';
import iconProfile_Line from './assets/profile-line.png';
import iconProfile_Fill from './assets/profile-fill.png';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Launch');
  const [showTabs, setShowTabs] = useState(false);
  
  const renderContent = () => {
    const { gAction, setgAction } = useGlobalContext();
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'Store':
        return <Store onStore2pay={() => {
          setActiveTab('Payment');
          setShowTabs(true);
        }} />;
      case 'eSIM':
        return <UeSIM />;
      case 'Action':
        return <Action />;
      case 'Payment':
        return (
          <Payment
            onback2page={() => {
              // const { gAction, setgAction } = useGlobalContext();
              // console.log(`page ${gAction}`);
              if (gAction === 'Detroyer') {
                setActiveTab('eSIM');
                setgAction('idle');
                setShowTabs(true);
              } else {
                setActiveTab('Action');
                setgAction('idle');
                setShowTabs(true);
              }
            }}
          />
        );
      case 'Launch':
        return <Launch onLaunchComplete={() => {
          setActiveTab('Home');
          setShowTabs(true);
        }} />;
      default:
        return <Home />;
    }
  };

  return (

      <Router>
        <Routes>
          <Route path="/" element={
            <div>
              {renderContent()}
              {showTabs && (
                <div className="tab-container">
                  <button onClick={() => setActiveTab('Home')}>
                    <div className="tab-icon-container">
                      <img src={activeTab === 'Home' ? iconToken_Fill : iconToken_Line} alt="Token Icon" className="tab-icon" />
                      <span className={activeTab === 'Home' ? 'active-tab' : ''}>Home</span>
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
                  <button onClick={() => setActiveTab('Action')}>
                    <div className="tab-icon-container">
                      <img src={activeTab === 'Action' ? iconProfile_Fill : iconProfile_Line} alt="Earn Icon" className="tab-icon" />
                      <span className={activeTab === 'Action' ? 'active-tab' : ''}>Action</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          } />
        </Routes>
      </Router>
   
  );
};

const WrappedApp: React.FC = () => {
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
};

export default WrappedApp;
