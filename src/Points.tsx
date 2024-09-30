import './Points.css';
import { useEffect, useState } from 'react';
import cardH from './assets/cardH.png';
import logo from './assets/logo.png';
import hand from './assets/hand.svg';
import coin from './assets/coinsy64.svg';
import circleLine from './assets/circle-line.svg';
import iconsetting from './assets/settings-line.svg';
import { Telegram, WebApp as WebAppTypes } from "@twa-dev/types";

const telegramWindow = window as unknown as Window & { Telegram: Telegram };
const WebApp: WebAppTypes = telegramWindow.Telegram.WebApp;

const Points = () => {
  const [points, setPoints] = useState<number>(9999);
  const [clicks, setClicks] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('Username');
  const [highlightPoints, setHighlightPoints] = useState<boolean>(false);

  // 获取 Telegram 用户名
  useEffect(() => {
    const initData = telegramWindow ? WebApp.initData : null;
    if (initData) {
      const params = new URLSearchParams(initData);
      const userJson = params.get('user');
      if (userJson) {
        const user = JSON.parse(decodeURIComponent(userJson));
        setUsername(user.username || 'Username');
      }
    }
  }, []);

  // 设置分数的自然增长
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + Math.floor(Math.random() * 3) + 3); // 随机增加 3-5
    }, 500); // 每 0.5 秒增加两次

    return () => clearInterval(interval);
  }, []);

  // 控制点击区域的点击次数和得分增加
  const handleClick = () => {
    if (clicks < 4) {
      setPoints((prevPoints) => prevPoints + Math.floor(Math.random() * 21) + 30); // 增加 30-50
      setClicks((prevClicks) => prevClicks + 1); // 增加点击次数
      setIsClicked(true); // 设置为点击状态
      setHighlightPoints(true); // 设置分数金色高亮
      setTimeout(() => {
        setHighlightPoints(false); // 500ms 后恢复原色
      }, 500);

      setTimeout(() => {
        setIsClicked(false); // 恢复点击效果
      }, 1000); // 1 秒后恢复
    }
  };

  // 每秒重置点击次数
  useEffect(() => {
    const resetClicks = setInterval(() => {
      setClicks(0);
    }, 1000);

    return () => clearInterval(resetClicks);
  }, []);

  return (
    <div className="points-container">
      {/* 广告栏 */}
      <div className="ad-bar">
        <span className="ad-text">Special Offer! Earn rewards with DeSIM.io</span>
      </div>

      <div className="top-row">
        {/* 左侧为 DeSIM.io 和 logo */}
        <div className="left-section">
          <img src={logo} alt="Logo" className="logo" />
          <span className="name-text">DeSIM.io</span>
        </div>
        {/* 右侧为 Telegram 的用户名 */}
        <div className="right-section">
          <span className="name-text">{username}</span>
          <img src={iconsetting} alt="Icon" className="icon-image" />
        </div>
      </div>

      {/* Card with overlay layers */}
      <div className="points-table" onClick={handleClick}>
        <table className="table-layout">
          <tbody>
            <tr>
              <td className="left-cell">Mined Speed <br /> LV.1</td>
              <td className="right-cell">Travel Rewards <br /> 0</td>
            </tr>
            <tr>
              <td colSpan={2} className="center-cell">
                <div className="card-container">
                  <img src={cardH} alt="Card" className="card-image" />
                  <img src={circleLine} alt="Circle Line" className="circle-image" />
                  <img src={hand} alt="Hand Icon" className="hand-image" />
                </div>
                <div className="points">
                  <div className="points-text">Points</div>
                  <div className={`points-value ${highlightPoints ? 'highlight' : ''}`}>
                    <img src={coin} alt="Coin Icon" className="coin-icon" />
                    {points}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Points;
