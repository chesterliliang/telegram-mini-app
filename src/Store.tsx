import './Store.css';
import cardpng from './assets/card.png';
import icon from './assets/icon.png';
import logo from './assets/logo.png'; // 确保 logo 图片路径正确
import iconGlobal from "./assets/global-line.png";

const eSIMs = [
  { id: 1, name: 'Plan A', data: '1GB', validity: '7 days', price: '5 USD', image: cardpng },
  { id: 2, name: 'Plan B', data: '3GB', validity: '30 days', price: '18 USD', image: cardpng },
  { id: 3, name: 'Plan C', data: '10GB', validity: '180 days', price: '49 USD', image: cardpng },
];

const Store = () => {
  return (
    <div className="esim-container">
      <div className="header-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="subtitle">DeSIM.io</h2>
      </div>
      <h1 className="title">
        <img src={iconGlobal} alt="Global Icon" className="global-icon" />
        <span className="data-plans-text">Data Plans</span>
      </h1>
      {eSIMs.map(eSIM => (
        <div className="esim-table-container" key={eSIM.id}>
          <table className="esim-table">
            <tbody>
              <tr style={{ height: '70px' }}>
                <td>
                  <img src={icon} alt="Icon" className="icon" /> Global
                </td>
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
                  <button className="buy-button" onClick={() => alert(`Buying ${eSIM.name}`)}>Buy Now</button>
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
