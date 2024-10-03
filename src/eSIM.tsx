import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './eSIM.css'; // 引入CSS

const eSIM = () => {
  const scannerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [decodedText, setDecodedText] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [lastCameraFrameUrl, setLastCameraFrameUrl] = useState<string | null>(null);
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

                // 捕获最后一帧图像
                const videoElement = document.querySelector<HTMLVideoElement>(`#${scannerId} video`);
                if (videoElement) {
                  const canvas = document.createElement('canvas');
                  canvas.width = videoElement.videoWidth;
                  canvas.height = videoElement.videoHeight;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    const frameUrl = canvas.toDataURL('image/png');
                    setLastCameraFrameUrl(frameUrl); // 将最后一帧保存
                  }
                }

                handleStopScan(); // 稍微延迟后停止扫描
                
              }
            )
            .then(() => {
              setIsCameraOn(true);
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
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImageUrl(imageUrl); // 将上传的图片显示在框内
        setLastCameraFrameUrl(null); // 上传图片后移除最后一帧图像
      };

      reader.readAsDataURL(file); // 读取图片数据

      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (!scannerRef.current) {
          scannerRef.current = new Html5Qrcode(scannerId); // 重新初始化实例
        }

        scannerRef.current.scanFile(file, true)
          .then((decodedText: string) => {
            setDecodedText(decodedText); // 设置解码结果
          })
          .catch(() => {
            alert('no qr code');
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
        {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded QR Code" className="uploaded-image" />}
        {lastCameraFrameUrl && <img src={lastCameraFrameUrl} alt="Camera Last Frame" className="uploaded-image" />}
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
        Upload QR code image
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
