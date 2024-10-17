import { useEffect, useState } from 'react';
import "./telegram-web-apps";
import { Telegram, WebApp as WebAppTypes } from "@twa-dev/types";
import './Earn.css';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import idJson from './id.json';
//import { createHash } from 'crypto-browserify';
import { Buffer } from 'buffer';

// 将 Buffer 设为全局对象
window.Buffer = window.Buffer || Buffer;


const telegramWindow = window as unknown as Window & { Telegram: Telegram };

export const WebApp: WebAppTypes = telegramWindow.Telegram.WebApp;

const Profile = () => {
  //const [userId, setUserId] = useState<string | null>(null); // 设置为 string | null
  //const [userName, setUserName] = useState<string | null>(null); // 设置为 string | null
  const [balance, setBalance] = useState<number | null>(null); // 设置为某Sol余额
  const [publicKey, setPublicKey] = useState<string | null>(null); // 设置为公钥
  const [tokenBalance, setTokenBalance] = useState<number | null>(null); // 设置为 SPL token 余额
  const [ataAddress, setAtaAddress] = useState<string | null>(null); // 设置为ATA地址

  useEffect(() => {
    // Telegram用户数据读取
    // const initData = telegramWindow ? WebApp.initData : null;
    // console.log("initData", initData);
    // if (initData) {
    //   const params = new URLSearchParams(initData);
    //   const userJson = params.get('user'); // 获取 user 字段的 JSON 数据
    //   console.log("userJson", userJson);
    //   if (userJson) {
    //     const user = JSON.parse(decodeURIComponent(userJson)); // 解析 JSON 数据
    //     console.log('userId:', user.id); // 打印 username
    //     console.log('Username:', user.username); // 打印 username
    //     setUserId(user.id);
    //     setUserName(user.username); // 设置 User ID
    //   }
    // }

    // Solana 账户余额查询
    const fetchBalance = async () => {
      try {
        console.log("balance");
        const connection = new Connection('https://rpc.devnet.soo.network/rpc');
        console.log("connection");
        const keypair = Keypair.fromSecretKey(new Uint8Array(idJson));
        const publicKey = keypair.publicKey;
        setPublicKey(publicKey.toBase58());
        console.log(`publicKey ${publicKey}`);
        const balanceInLamports = await connection.getBalance(publicKey);
        console.log(`balanceInLamports ${balanceInLamports}`);
        setBalance(balanceInLamports / 1e9); // 转为 SOL 单位

        // 查询 SPL Token 余额
        const mintAddress = new PublicKey('EdkKoVVqonryWzmdVfiDEdEmqdScqzX3rLHdk2cBqKHs');
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mintAddress, publicKey);
        console.log(`ata ${ata}`);
        setAtaAddress(ata.address.toBase58());
        setTokenBalance(Number(ata.amount) / 1e9); // 转为 token 单位
      } catch (error) {
        console.error('Failed to fetch balance:', error);
        setBalance(null);
        setTokenBalance(null);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile LV1</h2>
      <table className="profile-table">
        <tbody>
          <tr>
            <td className="left-align">Public Key:</td>
            <td className="right-align">{publicKey !== null ? publicKey : 'Loading...'}</td>
          </tr>
          <tr>
            <td className="left-align">Solana Balance:</td>
            <td className="right-align">{balance !== null ? `${balance} SOL` : 'Loading...'}</td>
          </tr>
          <tr>
            <td className="left-align">SPL Token Balance:</td>
            <td className="right-align">{tokenBalance !== null ? `${tokenBalance} TOKEN` : 'Loading...'}</td>
          </tr>
          <tr>
            <td className="left-align">ATA Address:</td>
            <td className="right-align">{ataAddress !== null ? ataAddress : 'Loading...'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
