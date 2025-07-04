import React from 'react';
import { ToastService } from '../agent/agent';

const ToastExample: React.FC = () => {
  
  const handleSuccessToast = () => {
    ToastService.success('This is a success message!');
  };

  const handleErrorToast = () => {
    ToastService.error('This is an error message!');
  };

  const handleWarningToast = () => {
    ToastService.warning('This is a warning message!');
  };

  const handleInfoToast = () => {
    ToastService.info('This is an info message!');
  };

  const handleLoadingToast = () => {
    const toastId = ToastService.loading('Loading data...');
    
    // Simulate an async operation
    setTimeout(() => {
      ToastService.updateToSuccess(toastId, 'Data loaded successfully!');
    }, 2000);
  };

  const handleLoadingErrorToast = () => {
    const toastId = ToastService.loading('Processing...');
    
    // Simulate an async operation that fails
    setTimeout(() => {
      ToastService.updateToError(toastId, 'Operation failed!');
    }, 2000);
  };

  const handleSpecificToasts = () => {
    ToastService.loginSuccess();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h3 style={{ marginBottom: '20px', color: '#2d3748' }}>🍞 Toast Notification Examples</h3>
      <p style={{ marginBottom: '20px', color: '#718096', fontSize: '14px' }}>
        Test the custom styled toast notifications positioned at bottom-right corner.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button 
          onClick={handleSuccessToast} 
          className="btn btn-success"
          style={{ borderRadius: '8px', fontWeight: '500' }}
        >
          ✓ Success Toast
        </button>
        
        <button 
          onClick={handleErrorToast} 
          className="btn btn-danger"
          style={{ borderRadius: '8px', fontWeight: '500' }}
        >
          ✗ Error Toast
        </button>
        
        <button 
          onClick={handleWarningToast} 
          className="btn btn-warning"
          style={{ borderRadius: '8px', fontWeight: '500' }}
        >
          ⚠ Warning Toast
        </button>
        
        <button 
          onClick={handleInfoToast} 
          className="btn btn-info"
          style={{ borderRadius: '8px', fontWeight: '500' }}
        >
          ℹ️ Info Toast
        </button>
        
        <button 
          onClick={handleLoadingToast} 
          className="btn btn-primary"
          style={{ borderRadius: '8px', fontWeight: '500' }}
        >
          🔄 Loading → Success
        </button>
        
        <button 
          onClick={handleLoadingErrorToast} 
          className="btn btn-secondary"
          style={{ borderRadius: '8px', fontWeight: '500' }}
        >
          🔄 Loading → Error
        </button>
        
        <button 
          onClick={handleSpecificToasts} 
          className="btn btn-dark"
          style={{ borderRadius: '8px', fontWeight: '500' }}
        >
          🔑 Login Success
        </button>
        
        <button 
          onClick={() => ToastService.dismissAll()} 
          className="btn btn-outline-secondary"
          style={{ borderRadius: '8px', fontWeight: '500' }}
        >
          🗙️ Dismiss All
        </button>
      </div>
    </div>
  );
};

export default ToastExample;
