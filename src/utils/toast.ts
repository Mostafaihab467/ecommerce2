import { toast, ToastOptions } from 'react-toastify';

// Default toast configuration
const defaultToastConfig: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
};

// Custom toast utility class
export class ToastService {
  
  static success(message: string, options?: ToastOptions) {
    toast.success(message, { ...defaultToastConfig, ...options });
  }

  static error(message: string, options?: ToastOptions) {
    toast.error(message, { ...defaultToastConfig, ...options });
  }

  static warning(message: string, options?: ToastOptions) {
    toast.warning(message, { ...defaultToastConfig, ...options });
  }

  static info(message: string, options?: ToastOptions) {
    toast.info(message, { ...defaultToastConfig, ...options });
  }

  // Specific toast methods for common operations
  static loginSuccess() {
    this.success("Welcome back! Login successful.");
  }

  static loginError(errorMessage?: string) {
    this.error(errorMessage || "Login failed. Please check your credentials.");
  }

  static registrationSuccess() {
    this.success("Account created successfully! Please login.");
  }

  static registrationError(errorMessage?: string) {
    this.error(errorMessage || "Registration failed. Please try again.");
  }

  static productAdded() {
    this.success("Product added successfully!");
  }

  static productUpdated() {
    this.success("Product updated successfully!");
  }

  static productDeleted() {
    this.success("Product deleted successfully!");
  }

  static orderPlaced() {
    this.success("Order placed successfully! You will receive a confirmation email.");
  }

  static paymentSuccess() {
    this.success("Payment processed successfully!");
  }

  static paymentError(errorMessage?: string) {
    this.error(errorMessage || "Payment failed. Please try again.");
  }

  static networkError() {
    this.error("Network error! Please check your internet connection.");
  }

  static serverError() {
    this.error("Server error! Please try again later.");
  }

  static unauthorized() {
    this.error("Session expired. Please login again.");
  }

  static permissionDenied() {
    this.error("You don't have permission to perform this action.");
  }

  static validationError(message?: string) {
    this.warning(message || "Please check your input and try again.");
  }

  // Generic loading toast
  static loading(message: string = "Loading...") {
    return toast.loading(message);
  }

  // Update loading toast to success
  static updateToSuccess(toastId: any, message: string) {
    toast.update(toastId, {
      render: message,
      type: "success",
      isLoading: false,
      autoClose: 5000
    });
  }

  // Update loading toast to error
  static updateToError(toastId: any, message: string) {
    toast.update(toastId, {
      render: message,
      type: "error",
      isLoading: false,
      autoClose: 5000
    });
  }

  // Dismiss a specific toast
  static dismiss(toastId?: any) {
    toast.dismiss(toastId);
  }

  // Dismiss all toasts
  static dismissAll() {
    toast.dismiss();
  }
}

export default ToastService;
