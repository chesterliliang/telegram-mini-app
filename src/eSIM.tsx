import { useEffect, useState } from 'react';
import './eSIM.css';
import QRCode from './QRCode'; // 引入 QRCode 组件
import "./telegram-web-apps";
import { Telegram, WebApp as WebAppTypes } from "@twa-dev/types";

const telegramWindow = window as unknown as Window & { Telegram: Telegram };
export const WebApp: WebAppTypes = telegramWindow.Telegram.WebApp;

const eSIM = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [isQRCodeOpen, setIsQRCodeOpen] = useState<boolean>(false); // 控制 QRCode 弹窗的状态
    const [qrCodeResult, setQrCodeResult] = useState<string | null>(null); // 用于存储二维码扫描结果
    const [qrCodeError, setQrCodeError] = useState<{ code: number, status: string } | null>(null); // 存储错误信息

    // 打开二维码扫描界面
    const openQRCodeScanner = () => {
        console.log('Opening QRCode Scanner');
        setIsQRCodeOpen(true); // 打开 QRCode 页面
        setQrCodeError(null);  // 清空之前的错误信息
        setQrCodeResult(null); // 清空之前的扫描结果
    };

    // 关闭二维码扫描界面
    const closeQRCodeScanner = () => {
        console.log('closeQRCodeScanner triggered, isQRCodeOpen:', isQRCodeOpen);
        setIsQRCodeOpen(false); // 关闭 QRCode 页面
    };

    // 处理扫码成功后的结果
    const handleQRCodeSuccess = (result: string) => {
        console.log('handleQRCodeSuccess:', result);
        setQrCodeResult(result);
        setQrCodeError(null); // 成功后清空错误信息
        setTimeout(() => closeQRCodeScanner(), 500); // 延迟关闭，确保状态同步
    };

    // 处理扫码失败的错误信息
    const handleQRCodeError = (error: { code: number, status: string }) => {
        console.log('handleQRCodeError:', error);
        if(error.code==500)
            return;
        setQrCodeError(error);
        setTimeout(() => closeQRCodeScanner(), 500); // 延迟关闭，确保状态同步
    };

    // 处理用户取消扫码操作
    const handleQRCodeCancel = () => {
        console.log('handleQRCodeCancel');
        setQrCodeError({ code: 0, status: 'QR Code scan cancelled' });
        closeQRCodeScanner(); // 用户取消操作后关闭 QRCode 页面
    };

    useEffect(() => {
        console.log('useEffect: isQRCodeOpen changed:', isQRCodeOpen);
    }, [isQRCodeOpen]);

    useEffect(() => {
        const initData = telegramWindow ? WebApp.initData : null;
        if (initData) {
            const params = new URLSearchParams(initData);
            const userJson = params.get('user');
            if (userJson) {
                const user = JSON.parse(decodeURIComponent(userJson));
                setUserId(user.id);
                setUserName(user.username);
            }
        }
    }, []);

    return (
        <div className="profile-container">
            <h2>User Profile LV1</h2>
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

            {/* 错误信息显示 */}
            {qrCodeError && (
                <div className="qr-error">
                    Error Code: {qrCodeError.code}, Message: {qrCodeError.status}
                </div>
            )}

            {/* 打开二维码扫描的按钮 */}
            <button className="scan-qr-button" onClick={openQRCodeScanner}>
                Scan QR Code
            </button>

            {/* QRCode 弹窗界面 */}
            {isQRCodeOpen && (
                <div className="qrcode-modal">
                    <div className="qrcode-popup">
                        <QRCode
                            onScanSuccess={handleQRCodeSuccess}
                            onImageScan={() => console.log("Image Scan Clicked")}
                            onStartScan={isQRCodeOpen}
                            onError={handleQRCodeError} // 传递错误处理回调
                            onCancel={handleQRCodeCancel} // 传递取消操作回调
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default eSIM;
