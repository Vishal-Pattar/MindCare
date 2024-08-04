import React, { useEffect } from 'react';
import './AlertBox.css';
import { MdErrorOutline, MdWarningAmber, MdInfo, MdCheckCircle } from "react-icons/md";

const AlertBox = ({ id, children, removeAlert, variant, component }) => {
  useEffect(() => {
    if (typeof removeAlert === 'function') {
      const timer = setTimeout(() => {
        removeAlert(id);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [id, removeAlert]);

  const getIcon = () => {
    switch (variant) {
      case 'error':
        return <MdErrorOutline className='alertbox__symbol' />;
      case 'warning':
        return <MdWarningAmber className='alertbox__symbol' />;
      case 'info':
        return <MdInfo className='alertbox__symbol' />;
      case 'success':
        return <MdCheckCircle className='alertbox__symbol' />;
      default:
        return null;
    }
  };

  return (
    <div className={`alertbox__container alert__${variant} alert__${component}`}>
      {getIcon()}
      {children}
    </div>
  );
};

export default AlertBox;