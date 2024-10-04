import { useEffect, useState } from 'react';
import "./telegram-web-apps";
import { Telegram, WebApp as WebAppTypes } from "@twa-dev/types";
import './Earn.css';

const telegramWindow = window as unknown as Window & { Telegram: Telegram };

export const WebApp: WebAppTypes = telegramWindow.Telegram.WebApp;

const Profile = () => {
  const [userId, setUserId] = useState<string | null>(null); // 设置为 string | null
  const [userName, setUserName] = useState<string | null>(null); // 设置为 string | null
  useEffect(() => {
    const initData = telegramWindow ? WebApp.initData : null;
    console.log("initData",initData);
    if (initData) {
      const params = new URLSearchParams(initData);
      const userJson = params.get('user'); // 获取 user 字段的 JSON 数据
      console.log("userJson",userJson);
      if (userJson) {
        const user = JSON.parse(decodeURIComponent(userJson)); // 解析 JSON 数据
        console.log('userId:', user.id); // 打印 username
        console.log('Username:', user.username); // 打印 username
        setUserId(user.id);
        setUserName(user.username); // 设置 User ID

      }
    }
  }, []);

  return (
    <div className="profile-container">
    <h2>User Profile  LV1</h2>
    {userId && userName ? (
      <table className="profile-table">
        <tbody>
          <tr>
            <td className="left-align">User ID:</td>
            <td className="right-align">{userId}</td>
          </tr>
          <tr>
            <td className="left-align">User Name:</td>
            <td className="right-align">{userName}</td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div>Loading...</div>
    )}
  </div>
  );
};

export default Profile;
