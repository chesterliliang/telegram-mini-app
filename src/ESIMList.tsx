import './ESIMList.css';
import cardpng from './assets/card.png';
import icon from './assets/icon.png';
import logo from './assets/logo.png'; // 确保 logo 图片路径正确

const eSIMs = [
  { id: 1, name: 'Plan A', data: '1GB', validity: '7 days', price: '5 USD', image: cardpng },
  { id: 2, name: 'Plan B', data: '3GB', validity: '30 days', price: '18 USD', image: cardpng },
  { id: 3, name: 'Plan C', data: '10GB', validity: '180 days', price: '49 USD', image: cardpng },
];

const handleBuyNow = (planName) => {
  alert(`You have selected ${planName}.`);
};

const openLink = () => {
  window.open('https://example.com', '_blank'); // 替换为实际链接
};

const ESIMList = () => {
  return (
    <div className="esim-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="subtitle">DeSIM.io</h2>
      <h1 className="title">Data Plans</h1>
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
                  <a href="#" onClick={openLink} className="link-button">139 countries</a>
                </td>
                <td>
                  <button className="buy-button" onClick={() => handleBuyNow(eSIM.name)}>Buy Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ESIMList;
