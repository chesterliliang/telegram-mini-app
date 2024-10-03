import { useEffect, useState } from 'react';
import './eSIM.css';
import QRCode from './QRCode'; // 引入 QRCode 组件
import "./telegram-web-apps";
import { Telegram, WebApp as WebAppTypes } from "@twa-dev/types";

const telegramWindow = window as unknown as Window & { Telegram: Telegram };
export const WebApp: WebAppTypes = telegramWindow.Telegram.WebApp;

const eSIM = () => {
    const [userId, setUserId] = useState<string | null>(null); // 设置为 string | null
    const [userName, setUserName] = useState<string | null>(null); // 设置为 string | null
    const [isQRCodeOpen, setIsQRCodeOpen] = useState<boolean>(false); // 控制 QRCode 弹窗的状态
    const [qrCodeResult, setQrCodeResult] = useState<string | null>(null); // 用于存储二维码扫描结果

    // 打开 QRCode 界面
    const openQRCodeScanner = () => {
        setIsQRCodeOpen(true);
    };

    // 关闭 QRCode 界面
    const closeQRCodeScanner = () => {
        setIsQRCodeOpen(false);
    };

    // 处理扫码成功后的结果
    const handleQRCodeSuccess = (result: string) => {
        setQrCodeResult(result);
        closeQRCodeScanner();
    };

    // 打开图像选择器
    const openImageSelector = () => {
        setIsQRCodeOpen(false); // 关闭 QRCode 弹窗
        // 这里可以添加显示上传图片的逻辑
    };

    useEffect(() => {
        const initData = telegramWindow ? WebApp.initData : null;
        console.log("initData", initData);
        if (initData) {
            const params = new URLSearchParams(initData);
            const userJson = params.get('user'); // 获取 user 字段的 JSON 数据
            if (userJson) {
                const user = JSON.parse(decodeURIComponent(userJson)); // 解析 JSON 数据
                setUserId(user.id);
                setUserName(user.username); // 设置 User ID 和用户名
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

            {/* 扫码结果显示 */}
            {qrCodeResult && (
                <div className="qr-result">
                    QR Code Result: {qrCodeResult}
                </div>
            )}

            {/* 打开二维码扫描的按钮 */}
            <button className="scan-qr-button" onClick={openQRCodeScanner}>
                Scan QR Code
            </button>

      // QRCode 弹窗界面
            {isQRCodeOpen && (
                <div className="qrcode-modal" onClick={closeQRCodeScanner}>
                    <div className="qrcode-popup" onClick={(e) => e.stopPropagation()}>
                        {/* 在这里传递 onImageScan 和 onStartScan */}
                        <QRCode onScanSuccess={handleQRCodeSuccess} onImageScan={openImageSelector} onStartScan={true} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default eSIM;
