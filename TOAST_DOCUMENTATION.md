# Toast Notification System Documentation

This project now includes a comprehensive toast notification system using `react-toastify` that automatically handles HTTP request notifications and provides manual control for custom messages.

## Features

- **Automatic HTTP Request Handling**: All HTTP requests made through the agent are automatically monitored and show appropriate success/error toasts
- **Smart Success Notifications**: Success toasts are only shown for non-GET requests (POST, PUT, DELETE, etc.)
- **Detailed Error Handling**: Different error types (401, 403, 422, 500) show specific error messages
- **Custom Toast Service**: Utility class with pre-defined methods for common operations
- **Loading States**: Support for loading toasts that can be updated to success/error

## Setup

The toast system is already configured and ready to use:

1. **react-toastify** is installed and configured
2. **ToastContainer** is added to App.tsx
3. **Axios interceptors** automatically handle HTTP request notifications
4. **ToastService** utility is available for manual toast management

## Automatic Toast Notifications

### HTTP Requests
All HTTP requests made through `src/agent/agent.tsx` automatically show toast notifications:

- **Success**: Only shown for non-GET requests (POST, PUT, DELETE)
- **Error**: Shown for all failed requests with specific error messages

### Supported Operations
- Product management (add, edit, delete)
- User authentication (login, register)
- Order management (place order, payment)
- User management (delete user)
- Statistics loading

## Manual Toast Usage

### Import ToastService
```typescript
import { ToastService } from '../agent/agent';
```

### Basic Toast Methods
```typescript
// Basic notification types
ToastService.success('Operation completed successfully!');
ToastService.error('Something went wrong!');
ToastService.warning('Please check your input!');
ToastService.info('Here is some information.');
```

### Pre-defined Specific Methods
```typescript
// Authentication
ToastService.loginSuccess();
ToastService.loginError('Invalid credentials');
ToastService.registrationSuccess();
ToastService.registrationError('Email already exists');

// Products
ToastService.productAdded();
ToastService.productUpdated();
ToastService.productDeleted();

// Orders & Payments
ToastService.orderPlaced();
ToastService.paymentSuccess();
ToastService.paymentError('Card declined');

// System Errors
ToastService.networkError();
ToastService.serverError();
ToastService.unauthorized();
ToastService.permissionDenied();
ToastService.validationError('Please fill all required fields');
```

### Loading Toasts
```typescript
// Start a loading toast
const toastId = ToastService.loading('Processing your request...');

// Update to success
setTimeout(() => {
  ToastService.updateToSuccess(toastId, 'Request completed!');
}, 2000);

// Or update to error
setTimeout(() => {
  ToastService.updateToError(toastId, 'Request failed!');
}, 2000);
```

### Toast Management
```typescript
// Dismiss a specific toast
ToastService.dismiss(toastId);

// Dismiss all toasts
ToastService.dismissAll();
```

## Configuration

### Custom Styling Features
- **Modern Design**: Rounded corners, gradient backgrounds, and subtle shadows
- **Shimmer Animation**: Top border shimmer effect for visual appeal
- **Color-coded Types**: Each toast type has distinct colors and gradients
  - Success: Green gradients with checkmark styling
  - Error: Red gradients with warning styling
  - Warning: Yellow/orange gradients
  - Info: Blue/teal gradients
  - Loading: Gray gradients with spinning icon
- **Interactive Effects**: Hover effects with elevation and shadow changes
- **Responsive Design**: Adapts to mobile screens automatically
- **Dark Mode Support**: Automatic dark theme detection

### Default Toast Settings
- **Position**: bottom-right
- **Auto Close**: 5 seconds
- **Progress Bar**: Visible (with custom gradient styling)
- **Close on Click**: Enabled
- **Pause on Hover**: Enabled
- **Draggable**: Enabled
- **Theme**: Colored with custom gradients
- **Animation**: Bounce in/out from right with shimmer effects

### Custom Configuration
You can override default settings for individual toasts:

```typescript
ToastService.success('Custom message', {
  autoClose: 10000,
  position: 'bottom-center'
});
```

## Error Handling by HTTP Status

- **401 Unauthorized**: "Session expired. Please login again."
- **403 Forbidden**: "You don't have permission to perform this action."
- **422 Validation Error**: Shows specific validation message
- **500 Server Error**: "Server error! Please try again later."
- **Network Error**: "Network error! Please check your internet connection."

## Example Usage in Components

```typescript
import React from 'react';
import { ToastService } from '../agent/agent';

const MyComponent: React.FC = () => {
  const handleAction = async () => {
    try {
      const toastId = ToastService.loading('Saving...');
      
      // Your API call here
      await someApiCall();
      
      ToastService.updateToSuccess(toastId, 'Saved successfully!');
    } catch (error) {
      ToastService.error('Failed to save');
    }
  };

  return (
    <button onClick={handleAction}>
      Save Data
    </button>
  );
};
```

## Testing the Toast System

A test component is available at `src/components/ToastExample.tsx` that demonstrates all toast functionality. You can temporarily add it to your app to test the system:

```typescript
// In App.tsx (temporarily)
import ToastExample from './components/ToastExample';

// Add <ToastExample /> to your component tree
```

## Best Practices

1. **Use automatic toasts for API calls**: Let the interceptors handle most notifications
2. **Use specific methods**: Prefer `ToastService.loginSuccess()` over `ToastService.success('Login successful')`
3. **Use loading toasts for long operations**: Provide feedback during async operations
4. **Don't overuse toasts**: Only show important notifications to avoid annoying users
5. **Test error scenarios**: Make sure error toasts show appropriate messages

## Customization

To modify the default behavior:

1. **Change default settings**: Edit `src/utils/toast.ts`
2. **Add new specific methods**: Add methods to `ToastService` class
3. **Modify URL mappings**: Update `urlToMessageMap` in `src/agent/agent.tsx`
4. **Change interceptor behavior**: Modify the axios response interceptor

The toast system is now ready to provide comprehensive feedback for all user interactions in your ecommerce application!
