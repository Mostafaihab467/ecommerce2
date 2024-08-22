import React from 'react';
import './SideBar.scss';
import { useSelector } from 'react-redux';
import { IUserModel } from '../../../Models/userModel';
import { Link } from 'react-router-dom';

interface SideBarProps {
  show: boolean;
  handleClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ show, handleClose }) => {
  const user = useSelector((state: any) => state.user.user) as IUserModel;

  return (
    <div className={`sidebarx ${show ? 'show' : ''}`}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Menu</h5>
        <button className="close-button" onClick={handleClose}>&times;</button>
      </div>

      <div className="offcanvas-body">
        {user.isAdmin && (
          <Link style={{textDecoration:'none'}} className="dashboard-link" to="./dashboard">
            <div className="dashboard-section sidebar-section">
              
              <ul className="dashboard-wrapper sidebar-menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  fill="currentColor"
                  className="bi bi-speedometer speedometerDashboard"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                  <path
                    fillRule="evenodd"
                    d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"
                  />
                </svg>
                <h5 className="sidebar-title">Dashboard</h5>
              </ul>
            </div>
          </Link>
        )}
   <div className="sidebar-divider"></div>
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
