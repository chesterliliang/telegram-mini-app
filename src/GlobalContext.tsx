import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定义全局状态的类型
interface GlobalContextType {
  globalValue: string;
  setGlobalValue: React.Dispatch<React.SetStateAction<string>>;
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}

// 创建 Context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// 创建 Provider 组件
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalValue, setGlobalValue] = useState<string>('default value');
  const [user, setUser] = useState<string>('default user');
  const [action, setAction] = useState<string>('default action');

  return (
    <GlobalContext.Provider value={{ globalValue, setGlobalValue, user, setUser, action, setAction }}>
      {children}
    </GlobalContext.Provider>
  );
};

// 创建一个自定义 Hook 来使用全局状态
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
