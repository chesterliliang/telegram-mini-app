import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './eSIM.css'; // 引入CSS

const eSIM = () => {
  const scannerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 用于图片识别的文件输入引用
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [decodedText, setDecodedText] = useState<string | null>(null); // 保存扫码结果
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const scannerId = 'qr-code-scanner';

  // 启动摄像头扫码
  const handleStartScan = () => {
    console.log("handleStartScan");

    if (isCameraOn) {
      console.log("Camera is already on.");
      return; // 防止重复启动
    }

    // 重新初始化 Html5Qrcode 实例
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(scannerId); // 重新初始化实例
    }

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const rearCameras = devices.filter(
            (device) =>
              device.label.toLowerCase().includes('back') ||
              device.label.toLowerCase().includes('rear')
          );

          const frontCameras = devices.filter(
            (device) =>
              device.label.toLowerCase().includes('front') ||
              device.label.toLowerCase().includes('face')
          );

          let cameraId: string;
          if (rearCameras.length > 0) {
            cameraId = rearCameras[0].id;
          } else if (frontCameras.length > 0) {
            cameraId = frontCameras[0].id;
          } else {
            cameraId = devices[0].id;
          }

          scannerRef.current
            .start(
              cameraId,
              config,
              (decodedText: string) => {
                console.log('Decoded text:', decodedText);
                setDecodedText(decodedText);
                handleStopScan(); // 扫码成功后停止
              }
            )
            .then(() => {
              setIsCameraOn(true); // 设置摄像头为开启状态
            })
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
  };

  // 停止扫码并销毁实例
  const handleStopScan = () => {
    console.log("handleStopScan");
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current.clear(); // 清理扫描器实例的内容
          scannerRef.current = null; // 销毁实例
          setIsCameraOn(false); // 更新状态
        })
        .catch((error: any) => {
          console.error('Error stopping scanner:', error);
        });
        handleStopScan();
    }
  };

  // 点击上传二维码图片进行识别
  const handleImageScan = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 触发文件选择
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (/*e*/) => {
        //const imageUrl = e.target?.result as string;
        //将图片URL设置为上传的图片（如果你需要在界面中展示）
      };

      reader.readAsDataURL(file); // 读取图片数据

      const image = new Image();
      image.src = URL.createObjectURL(file);
      console.log("image.src",image.src);
      image.onload = () => {
        console.log("file",file);
        if (!scannerRef.current) {
          scannerRef.current = new Html5Qrcode(scannerId); // 重新初始化实例
        }
        console.log("scannerRef.current",scannerRef.current);
        scannerRef.current.scanFile(file, true)
          .then((decodedText: string) => {
            setDecodedText(decodedText); // 设置解码结果
          })
          .catch(() => {
            alert('无法识别该图片中的二维码'); // 提示识别失败
          });
      };
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch((error: any) => {
          console.log('Error stopping scanner:', error);
        });
        scannerRef.current.clear();
        scannerRef.current = null; // 销毁实例
      }
    };
  }, []);

  return (
    <div className="scanner-container">
      {/* 显示扫描框和最后一帧或上传的图片 */}
      <div id={scannerId} className="scanner">
        {/* 你可以在这里显示上传的图片或最后一帧 */}
      </div>

      {/* 显示解码结果 */}
      {decodedText && <p className="decoded-text">Result: {decodedText}</p>}
      {cameraError && <p className="decoded-text">{cameraError}</p>}

      {/* 摄像头控制按钮 */}
      {!isCameraOn ? (
        <button className="start-scan-button" onClick={handleStartScan}>
          Use camera to scan
        </button>
      ) : (
        <button className="stop-scan-button" onClick={handleStopScan}>
          Stop Scan
        </button>
      )}

      {/* 图片扫码按钮 */}
      <button className="image-scan-button" onClick={handleImageScan}>
        upload QR code image
      </button>

      {/* 隐藏的文件输入，用于图片上传 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default eSIM;
