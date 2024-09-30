import React, { useEffect, useState } from 'react';
import './Points.css';
import icon from './assets/icon.png'; // 右侧图标
import logo from './assets/logo.png'; // 左侧Logo
import card from './assets/card.png'; // 卡片图片
import { Telegram, WebApp as WebAppTypes } from '@twa-dev/types'; // Telegram类型

const telegramWindow = window as unknown as Window & { Telegram: Telegram };
export const WebApp: WebAppTypes = telegramWindow.Telegram.WebApp;

const Points = () => {
    const [username, setUsername] = useState('User'); // 默认用户名
    const [points, setPoints] = useState(9999); // 初始积分

    // 通过Telegram获取用户名的方法
    useEffect(() => {
        const initData = telegramWindow ? WebApp.initData : null;
        if (initData) {
            const params = new URLSearchParams(initData);
            const userJson = params.get('user'); // 获取 user 字段的 JSON 数据
            if (userJson) {
                const user = JSON.parse(decodeURIComponent(userJson));
                setUsername(user.username);
            }
        }
    }, []);

    // 每秒更新积分，值在3-5之间增长
    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(prev => prev + Math.floor(Math.random() * 3) + 3); // 增长3-5
        }, 500); // 每秒钟更新两次
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="points-container">
            {/* 顶部广告栏 */}
            <div className="ad-bar">
                <div className="pad-text">Exclusive Offers - Earn More Points with Every Trip!</div>
            </div>

            {/* 名称和图标行 */}
            <div className="top-row">
                <div className="left-section">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <span className="name-text">DeSIM.io</span>
                </div>
                <div className="right-section">
                    <span className="username-text">{username}</span>
                    <img src={icon} alt="Icon" className="icon-image" />
                </div>
            </div>

            {/* 圆角表格 */}
            <div className="points-table">
                <table className="table-layout">
                    <tbody>
                        <tr>
                            <td className="left-cell">Mined Speed <br /> <span className="small-text">LV.1</span></td>
                            <td className="right-cell">Travel Rewards <br /> <span className="small-text">0</span></td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="center-cell">
                                Points <br />
                                <div className="points-flip">{points}</div> {/* 积分动态显示 */}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="center-cell">
                                <img src={card} alt="Card" className="card-image" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Points;
