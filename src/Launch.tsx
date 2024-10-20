import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './GlobalContext';
import axios from 'axios';
import { Telegram, WebApp as WebAppTypes } from '@twa-dev/types';
import './Launch.css';

const telegramWindow = window as unknown as Window & { Telegram: Telegram };

interface LaunchProps {
  onLaunchComplete: () => void;
}

const Launch: React.FC<LaunchProps> = ({ onLaunchComplete }) => {
  const [counter, setCounter] = useState<number>(0);
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    // 计时器，每秒更新一次
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    // 获取 Telegram 用户 ID 和用户名
    let telegramData: { telegramId?: string; telegramUsername?: string } = {};
    if (telegramWindow.Telegram) {
      const WebApp: WebAppTypes = telegramWindow.Telegram.WebApp;
      WebApp.ready();
      const initData = WebApp.initData || '';
      if (initData) {
        try {
          const params = new URLSearchParams(initData);
          const userJson = params.get('user');
          if (userJson) {
            const user = JSON.parse(decodeURIComponent(userJson));
            telegramData = {
              telegramId: user.id,
              telegramUsername: user.username,
            };
          }
        } catch (error) {
          console.error('Failed to parse Telegram init data:', error);
        }
      }
    }

    // 调用 login 方法
    const login = async (telegramId: string) => {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          tid: telegramId
        });
        console.log('Login response:', response.data);
        setUser({ ...telegramData, ...response.data }); // 将 Telegram 数据和登录返回的数据合并后赋值给全局变量 user
        onLaunchComplete();
      } catch (error: any) {
        console.error('Login error:', error.message);
      }
    };

    if (telegramData.telegramId) {
      login(telegramData.telegramId);
    }

    return () => {
      clearInterval(timer);
    };
  }, [setUser, navigate]);

  return (
    <div className="launch-container">
      <h1 className="counter-display">{counter}</h1>
    </div>
  );
};

export default Launch;
