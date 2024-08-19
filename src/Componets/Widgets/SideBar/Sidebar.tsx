import React from 'react';
import './SideBar.scss';

interface SideBarProps {
  show: boolean;
  handleClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ show, handleClose }) => {
  return (
    <div className={`sidebarx ${show ? 'show' : ''}`}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Menu</h5>
        <button className="close-button" onClick={handleClose}>&times;</button>
      </div>
      <div className="offcanvas-body">
        <div className="sidebar-section">
          <h5 className="sidebar-heading">Departments</h5>
          <ul className="sidebar-menu">
            <li className="sidebar-item">Electronics</li>
            <li className="sidebar-item">Clothing</li>
            <li className="sidebar-item">Toys</li>
          </ul>
        </div>
        <div className="sidebar-divider"></div>
        <div className="sidebar-section">
          <h5 className="sidebar-heading">Settings</h5>
          <ul className="sidebar-menu">
            <li className="sidebar-item">Account</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
