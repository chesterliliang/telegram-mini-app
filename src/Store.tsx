import { useEffect, useState } from 'react';
import './Store.css';
import cardpng from './assets/card.png';
import logo from './assets/logo.png'; // 确保 logo 图片路径正确
import iconGlobal from "./assets/global-line.png";
import adIcon from './assets/ad-icon.webp'; // 添加广告图标
import { Telegram, WebApp as WebAppTypes } from "@twa-dev/types"; // 引用 Telegram 和 WebApp 类型

const telegramWindow = window as unknown as Window & { Telegram: Telegram }; // 定义全局 window 对象，包含 Telegram

// eSIM 计划定义
const eSIMs = [
  { id: 1, name: 'Destroyer', data: '1GB', validity: '7 days', price: '5 USD', image: cardpng },
  { id: 2, name: 'Cruiser', data: '3GB', validity: '30 days', price: '18 USD', image: cardpng },
  { id: 3, name: 'BattleShip', data: '20GB', validity: '365 days', price: '69 USD', image: cardpng },
  { id: 3, name: 'Carrier', data: '120GB', validity: '365 days', price: '259 USD', image: cardpng },
];

interface StoreProps {
  onBuyNow: (planType: string) => void;
  setActiveTab: (tab: string) => void;
}

const Store: React.FC<StoreProps> = ({ onBuyNow, setActiveTab }) => {
  const [tgName, setTgName] = useState<string>('Name'); // 默认值为 "Name"

  // 通过 telegramWindow 获取用户名
  useEffect(() => {
    if (telegramWindow.Telegram) {
      const WebApp: WebAppTypes = telegramWindow.Telegram.WebApp;
      WebApp.ready(); // 确保 WebApp 准备就绪
      const initData = WebApp.initData || ''; // 获取 Telegram 初始化数据
      if (initData) {
        try {
          const params = new URLSearchParams(initData);
          const userJson = params.get('user'); // 获取 user 字段的 JSON 数据
          if (userJson) {
            const user = JSON.parse(decodeURIComponent(userJson)); // 解析 JSON 数据
            if (user && user.username) {
              setTgName(user.username); // 设置为用户名
            }
          }
        } catch (error) {
          console.error('Failed to parse Telegram init data:', error);
        }
      }
    }
  }, []);

  const handleBuyNow = (planType: string) => {
    onBuyNow(planType);
    setActiveTab('Payment');
  };

  return (
    <div className="esim-container">
      {/* Header section with logo, DeSIM.io, and Hello Name */}
      <div className="header-container">
        <div className="left-section">
          <img src={logo} alt="Logo" className="logo" /><a className="header-text">DeSIM</a>
        </div>
        <div className="right-section">
          <span className="hello-text">{tgName}</span> {/* 显示 Telegram 用户名 */}
        </div>
      </div>

      {/* head_rec 矩形背景和广告 */}
      <div className="head-rec">
        <div>
          <div className="ad-title">Why DeSIM</div>
          <div className="sad-text">
            We offer stable and fast global data plans and token rewards.
          </div>
        </div>
        <img src={adIcon} alt="Ad Icon" className="ad-image" />
      </div>

      <h1 className="title">
        <img src={iconGlobal} alt="Global Icon" className="global-icon" />
        <span className="data-plans-text">Data Plans</span>
      </h1>
      {eSIMs.map(eSIM => (
        <div className="esim-table-container" key={eSIM.id}>
          <table className="esim-table">
            <tbody>
              <tr>
                <td>Global</td>
                <td className="image-cell">
                  <img src={eSIM.image} alt={eSIM.name} className="esim-image" />
                </td>
              </tr>
              <tr>
                <td>Name:</td>
                <td className="right-align">{eSIM.name}</td>
              </tr>
              <tr>
                <td>Data:</td>
                <td className="right-align">{eSIM.data}</td>
              </tr>
              <tr>
                <td>Validity:</td>
                <td className="right-align">{eSIM.validity}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td className="right-align">{eSIM.price}</td>
              </tr>
              <tr>
                <td>
                  <a href="https://example.com" className="link-button">139 countries</a>
                </td>
                <td colSpan={1}>
                  <button className="buy-button" onClick={() => handleBuyNow(eSIM.name)}>Buy Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Store;
