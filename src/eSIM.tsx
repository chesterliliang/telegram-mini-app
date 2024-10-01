// //import React from 'react';
// import { useEffect,useState  } from 'react';
// import { Html5QrcodeScanner } from "html5-qrcode";

// const eSIM = () => {

//     const [qrCodeMessage, setQrCodeMessage] = useState<string | null>(null);

//     function getLocalIP(callback: (ip: string) => void) {
//         const rtcPeerConnection = new RTCPeerConnection({ iceServers: [] });
//         const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
//         let localIP: string | null = null;
    
//         rtcPeerConnection.createDataChannel('');
    
//         rtcPeerConnection.createOffer()
//             .then((offer) => rtcPeerConnection.setLocalDescription(offer))
//             .catch((err) => console.error('Error in creating offer:', err));
    
//         rtcPeerConnection.onicecandidate = (event) => {
//             if (!event || !event.candidate || !event.candidate.candidate) return;
    
//             const candidate = event.candidate.candidate;
//             const ipMatch = ipRegex.exec(candidate);
//             if (ipMatch) {
//                 localIP = ipMatch[0];
//                 callback(localIP);
//                 rtcPeerConnection.close();
//             }
//         };
//     }

//     async function getPublicIP() {
//         try {
//             const response = await fetch('https://api.ipify.org?format=json');
//             const data = await response.json();
//             console.log('Your Public IP:', data.ip);
//         } catch (error) {
//             console.error('Error fetching public IP:', error);
//         }
//     }
    
//     useEffect(() => {
//         const scanner = new Html5QrcodeScanner(
//           "qr-reader", 
//           { fps: 10, qrbox: 250 },
//           false
//         );
    
//         scanner.render(
//           (decodedText, decodedResult) => {
//             // 当扫描到二维码时，执行回调
//             console.log(`Decoded Text: ${decodedText}`);
//             setQrCodeMessage(decodedText);
//             scanner.clear(); // 清除扫描器
//           },
//           (errorMessage) => {
//             // 当没有识别到二维码时的回调
//             console.log(`Error: ${errorMessage}`);
//           }
//         );
    
//         return () => {
//           // 组件卸载时清除资源
//           scanner.clear();
//         };
//       }, []);

//     return (
//         <div>
//             Hello World from eSIMs!
//             <div id="qr-reader" style={{ width: '100%' }}></div>
//             {qrCodeMessage && <p>Scanned QR Code: {qrCodeMessage}</p>}
//         </div>
//     );
// };

// export default eSIM;

import  { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

// interface QrCodeScannerProps {
//   onScanSuccess: (decodedText: string) => void; // 成功扫描二维码后的回调
// }

const eSIM = () => {
  const qrcodeRegionId = "qr-reader";

  useEffect(() => {
    const config = {
      fps: 10, // 每秒扫描帧数
      qrbox: { width: 250, height: 250 }, // 设置扫描框的大小
    };

    const qrCodeSuccessCallback = (decodedText: string) => {
      console.log(`QR Code detected: ${decodedText}`);
      //onScanSuccess(decodedText); // 执行回调，处理扫描到的文本
    };

    const qrCodeErrorCallback = (errorMessage: string) => {
      // 可以忽略不处理错误，除非你想显示错误
      console.warn(`QR Code scan error: ${errorMessage}`);
    };

    // 初始化二维码扫描器
    const html5QrCodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, false);
    html5QrCodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    // 清理函数，在组件卸载时销毁扫描器
    return () => {
      html5QrCodeScanner.clear();
    };
  }, []);

  return (
    <div>
      <div id={qrcodeRegionId} style={{ width: "500px" }} />
    </div>
  );
};

export default eSIM;
//<div id={qrcodeRegionId} style={{ width: "500px" }} />