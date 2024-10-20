import { useState } from 'react';
import Launch from './Launch'; // 导入 Launch 组件
import './App.css';
import Store from './Store';
import UeSIM from './eSIM';
import Home from './Home';
import Action from './Action';
import { GlobalProvider } from './GlobalContext';
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
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'Store':
        return <Store />;
      case 'eSIM':
        return <UeSIM />;
      case 'Action':
        return <Action />;
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
    <GlobalProvider>
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
    </GlobalProvider>
  );
};

export default App;
