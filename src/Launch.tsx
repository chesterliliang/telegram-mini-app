import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './GlobalContext';
import axios from 'axios';
import { Telegram, WebApp as WebAppTypes } from '@twa-dev/types';
import './Launch.css';
import ship3 from './assets/ship3.png';
import loading from './assets/loading.svg';

const telegramWindow = window as unknown as Window & { Telegram: Telegram };

interface LaunchProps {
  onLaunchComplete: () => void;
}

const Launch: React.FC<LaunchProps> = ({ onLaunchComplete }) => {
  const navigate = useNavigate();
  const {
    gUsername, setgUsername,
    gTid, setgTid,
    gIsact, setgIsact,
    gAddress, setgAddress,
    gBalance,setgBalance,
    gIsagent, setgIsagent,
    gRid, setgRid,
    gDevid, setDevid,
  } = useGlobalContext();
  useEffect(() => {

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
            setgUsername(user.username);
            setgTid(user.id);
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
        setgAddress(response.data.address);
        setgBalance(response.data.balance);
        setgIsact(response.data.isact)
        setgIsagent(response.data.isagent);
        setgRid(response.data.rid);
        setDevid(response.data.devid);
        onLaunchComplete();
      } catch (error: any) {
        console.error('Login error:', error.message);
      }
    };

    if (telegramData.telegramId) {
      login(telegramData.telegramId);
    }
  }, [setgUsername, setgTid, setgIsagent, setgAddress,setgIsact, setgRid, setDevid, navigate]);

  useEffect(() => {
    console.log(`Updated gUsername ${gUsername}`);
    console.log(`Updated gTid ${gTid}`);
    console.log(`Updated gIsact ${gIsact}`);
    console.log(`Updated gAddress ${gAddress}`);
    console.log(`Updated gIsagent ${gIsagent}`);
    console.log(`Updated gBalance ${gBalance}`);
    console.log(`Updated gRid ${gRid}`);
    console.log(`Updated gDevid ${gDevid}`);
  }, [gUsername,gTid,gIsact,gAddress,gIsagent,gRid,gDevid]);

  return (
    <div className="launch-container">
      <img src={ship3} alt="Ship" className="ship-image" />
      <img src={loading} alt="Loading" className="loading-image" />
    </div>
  );
};

export default Launch;
