import React from 'react';
import './Points.css';
import icon from './assets/icon.png'; // Import the icon image
import card from './assets/card.png'; // Import the card image

const Points = () => {
    return (
        <div className="points-container">
            {/* 顶部广告栏 */}
            <div className="ad-bar">
                <div className="pad-text">Exclusive Offers - Earn More Points with Every Trip!</div>
            </div>

            {/* 名称和图标行 */}
            <div className="top-row">
                <div className="left-section">
                    <span className="name-text">namename</span>
                </div>
                <div className="right-section">
                    <img src={icon} alt="Icon" className="icon-image" />
                </div>
            </div>

            {/* 圆角表格 */}
            <div className="points-table">
                <table className="table-layout">
                    <tbody>
                        <tr>
                            <td className="left-cell">Mined Point</td>
                            <td className="right-cell">Travel Rewards</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="center-cell">
                                <img src={icon} alt="Icon" className="icon-glow" /> 9999
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="center-cell">
                                <img src={card} alt="Card" className="card-image" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Points;
