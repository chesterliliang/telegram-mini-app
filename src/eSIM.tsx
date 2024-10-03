import  { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './eSIM.css'; // 引入CSS

const eSIM = () => {
  const scannerRef = useRef<any>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScannerReady, setIsScannerReady] = useState<boolean>(false);
  const [decodedText, setDecodedText] = useState<string | null>(null); // 保存扫码结果
  const scannerId = 'qr-code-scanner';

  useEffect(() => {
    if (isScannerReady) {
      const startQrScanner = () => {
        try {
          scannerRef.current = new Html5Qrcode(scannerId);
          const config = { fps: 10, qrbox: { width: 250, height: 250 } };

          // 请求摄像头列表
          Html5Qrcode.getCameras()
            .then((devices) => {
              if (devices && devices.length) {
                // 过滤出后置摄像头
                const rearCameras = devices.filter(
                  (device) =>
                    device.label.toLowerCase().includes('back') ||
                    device.label.toLowerCase().includes('rear')
                );

                // 过滤出前置摄像头
                const frontCameras = devices.filter(
                  (device) =>
                    device.label.toLowerCase().includes('front') ||
                    device.label.toLowerCase().includes('face')
                );

                let cameraId: string;
                if (rearCameras.length > 0) {
                  // 使用后置摄像头
                  cameraId = rearCameras[0].id;
                } else if (frontCameras.length > 0) {
                  // 如果没有后置摄像头，使用前置
                  cameraId = frontCameras[0].id;
                } else {
                  // 默认使用第一个摄像头
                  cameraId = devices[0].id;
                }

                // 启动二维码扫描
                scannerRef.current
                  .start(
                    cameraId,
                    config,
                    (decodedText: string) => {
                      console.log('Decoded text:', decodedText);
                      setDecodedText(decodedText); // 显示扫描结果
                    }
                  )
                  .catch((err: any) => {
                    console.error('Error starting scanner:', err);
                    setCameraError('Failed to start the scanner.');
                  });
              } else {
                setCameraError('No cameras found.');
              }
            })
            .catch((err) => {
              console.error('Error in accessing cameras:', err);
              setCameraError('Failed to access the camera.');
            });
        } catch (error) {
          console.error('Error initializing scanner:', error);
          setCameraError('Scanner initialization failed.');
        }
      };

      startQrScanner();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch((error: any) => {
          console.log('Error stopping scanner:', error);
        });
      }
    };
  }, [isScannerReady]);

  useEffect(() => {
    setIsScannerReady(true); // 等到页面加载完成后才设置 ready 状态
  }, []);

  return (
    <div className="scanner-container">
      <div id={scannerId} className="scanner" />
      <div>
      {decodedText && <p className="decoded-text">Scanned Result: {decodedText}</p>}
      {cameraError && <p>{cameraError}</p>}
      </div>
    </div>
  );
};

export default eSIM;
