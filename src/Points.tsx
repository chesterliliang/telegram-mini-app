import './Points.css';
import { useEffect, useState } from 'react';
import cardH from './assets/cardH.png';
import ship1 from './assets/ship1.png'
import logo from './assets/logo.png';
import hand from './assets/hand.svg';
import coin from './assets/coinsy64.svg';
import circleLine from './assets/circle-line.svg';
import iconsetting from './assets/settings-line.svg';
import starWarsTheme from './assets/starwarmusic.mp3';
import { Telegram, WebApp as WebAppTypes } from "@twa-dev/types";

const telegramWindow = window as unknown as Window & { Telegram: Telegram };
const WebApp: WebAppTypes = telegramWindow.Telegram.WebApp;

const Points = () => {
  const [points, setPoints] = useState<number>(9999);
  const [clicks, setClicks] = useState<number>(0);
  const [username, setUsername] = useState<string>('Username');
  const [highlightPoints, setHighlightPoints] = useState<boolean>(false);

  const [shipPosition, setShipPosition] = useState({ top: '10%', left: '10%' });

  // 生成随机位置，但确保不在页面的中心区域
  const getRandomPosition = () => {
    const top = Math.random() * 70 + 5 + '%'; // 控制top值在5%-75%之间
    const left = Math.random() * 70 + 5 + '%'; // 控制left值在5%-75%之间
    return { top, left };
  };

    // 每隔几秒钟更新位置，模拟随机漂浮效果
    useEffect(() => {
      const interval = setInterval(() => {
        setShipPosition(getRandomPosition());
      }, 3000); // 每3秒更新一次位置
  
      return () => clearInterval(interval); // 清除定时器
    }, []);

    // 点击 ship1 时触发的事件
    const handleShipClick = () => {
      alert("You clicked the ship!");
    };

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
      setHighlightPoints(true); // 设置分数金色高亮
      setTimeout(() => {
        setHighlightPoints(false); // 500ms 后恢复原色
      }, 500);
    }
  };

  // 每秒重置点击次数
  useEffect(() => {
    const resetClicks = setInterval(() => {
      setClicks(0);
    }, 1000);

    return () => clearInterval(resetClicks);
  }, []);

  // 按钮点击事件
  // const handleButtonClick = () => {
  //   alert('Become DeSIM distributor +10 Millions');
  // };

  // 页面加载后播放音乐
  useEffect(() => {
    const audio = new Audio(starWarsTheme); // 创建音频对象
    audio.play(); // 播放音频
    audio.loop = false; // 设置循环播放
  }, []);

  return (
    <div className="points-container">
      <img
        src={ship1}
        alt="Ship"
        className="ship1-image"
        style={{
          position: 'absolute',
          top: shipPosition.top,
          left: shipPosition.left,
          transition: 'top 4s ease, left 6s ease' // 平滑过渡
        }}
        onClick={handleShipClick}
      />
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
      <div className="points-table">
        <table className="table-layout">
          <tbody>
            <tr>
              <td className="left-cell">Mined Speed <br /> LV.1</td>
              <td className="right-cell">Travel Rewards <br /> 0</td>
            </tr>
            <tr>
              <td colSpan={2} className="center-cell">
                <div className="card-container" onClick={handleClick}>
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
         {/* 新增的按钮，宽度与表格相同，位置在表格下方 5% 页面高度的距离 */}
       
      
      <div className="tail-rec">
          <div className="dad-text">
            <span>To become a partner of DeSIM means you can get 100 real sim cards for free! It can be used to download any eSIM data plans without any limitation on any phones </span><br /> 
            <span>It means you invite your friends to use eSIM serive whatever device they used, bring them to telegram and make them partners of DeSIM. If that happens, you will get your reward in USDT and get another 100 Millions points!!</span>
          </div>
      </div>
      </div>
    </div>
  );
};

export default Points;


