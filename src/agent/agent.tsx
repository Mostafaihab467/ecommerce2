import axios, { AxiosResponse } from 'axios'
import { IUserModel } from '../Models/userModel';
import { ProductModel } from './../Models/ProductModel';
import { IOrder } from './../Models/OrderModel';
import ToastService from '../utils/toast';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'http://192.168.1.30:5000'

// Map of URL patterns to meaningful messages
const urlToMessageMap: { [key: string]: { success: string, error: string } } = {
  '/api/products': { success: 'Products loaded successfully!', error: 'Failed to load products' },
  '/api/products/AddSellProduct': { success: 'Product added successfully!', error: 'Failed to add product' },
  '/api/products/AddproductImage': { success: 'Product image added!', error: 'Failed to add product image' },
  '/api/products/EditProduct': { success: 'Product updated successfully!', error: 'Failed to update product' },
  '/api/products/deleteProduct': { success: 'Product deleted successfully!', error: 'Failed to delete product' },
  '/api/products/deleteProductImage': { success: 'Product image deleted!', error: 'Failed to delete product image' },
  '/api/Account/login': { success: 'Login successful!', error: 'Login failed' },
  '/api/Account/register': { success: 'Registration successful!', error: 'Registration failed' },
  '/api/Account/AllUsers': { success: 'Users loaded successfully!', error: 'Failed to load users' },
  '/api/Account/delete_user': { success: 'User deleted successfully!', error: 'Failed to delete user' },
  '/api/order/placeOrder': { success: 'Order placed successfully!', error: 'Failed to place order' },
  '/api/order/Pay': { success: 'Payment successful!', error: 'Payment failed' },
  '/api/order/myorders': { success: 'Orders loaded successfully!', error: 'Failed to load orders' },
  '/api/Statstics/productStatstics': { success: 'Statistics loaded!', error: 'Failed to load statistics' }
};

// Helper function to get message based on URL
function getMessageForUrl(url: string, type: 'success' | 'error'): string {
  for (const pattern in urlToMessageMap) {
    if (url.includes(pattern)) {
      return urlToMessageMap[pattern][type];
    }
  }
  return type === 'success' ? 'Request completed successfully!' : 'Request failed!';
}

axios.interceptors.request.use(async (request) => {
    const token = window.localStorage.getItem('jwt')

    if (token) request.headers!.Authorization = `Bearer ${token}`

    return request
})

axios.interceptors.response.use(
    (response) => {
        const url = response.config.url || '';
        const method = response.config.method?.toUpperCase();
        
        // Only show success messages for non-GET requests
        if (method !== 'GET') {
            const message = getMessageForUrl(url, 'success');
            ToastService.success(message);
        }
        
        return response;
    },
    (error: any) => {
        let errorMessage = 'Request failed!';
        
        if (error.response) {
            // Server responded with error status
            const url = error.response.config?.url || '';
            const status = error.response.status;
            
            // Handle specific error statuses
            switch (status) {
                case 401:
                    ToastService.unauthorized();
                    return Promise.reject(error);
                case 403:
                    ToastService.permissionDenied();
                    return Promise.reject(error);
                case 422:
                    const validationMessage = error.response.data?.message || 'Validation failed';
                    ToastService.validationError(validationMessage);
                    return Promise.reject(error);
                case 500:
                    ToastService.serverError();
                    return Promise.reject(error);
                default:
                    errorMessage = getMessageForUrl(url, 'error');
                    
                    // Add specific error details if available
                    if (error.response.data?.message) {
                        errorMessage += `: ${error.response.data.message}`;
                    } else if (status) {
                        errorMessage += ` (${status})`;
                    }
            }
        } else if (error.request) {
            // Network error
            ToastService.networkError();
            return Promise.reject(error);
        } else {
            // Other error
            errorMessage = error.message || 'An unexpected error occurred.';
        }
        
        ToastService.error(errorMessage);
        console.error('API Error:', error);
        return Promise.reject(error);
    }
)


const products = {
    getAllproducts: (page: number) => axios.get(`/api/products?page=${page}`),
    getProductbyId: (id: string) => axios.get(`/api/products/${id}`),
    userAddProduct: (product: any) => {
     
        return axios.post('/api/products/AddSellProduct', product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    AddProduct_Image: (product: any) => {
       
        return axios.post('/api/products/AddproductImage', product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    productUpdate: (product: ProductModel) => axios.post('/api/products/EditProduct', product),
    deleteProduct: (id: string) => axios.get(`/api/products/deleteProduct/${id}`),
    deleteProductImage:(payload:any)=>axios.post('/api/products/deleteProductImage',payload)

}

const Auth = {
    login: (user: IUserModel) => axios.post('/api/Account/login', user),
    register: (user: IUserModel) => axios.post('/api/Account/register', user),
}

const Account = {
    getAllUsers: () => axios.get('./api/Account/AllUsers'),
    deleteUser: (id: string) => axios.delete(`/api/Account/delete_user/${id}`)
}


const Order = {
    placeOrder: (order: IOrder) => axios.post('/api/order/placeOrder', order),
    findOrderbyId: (id: string) => axios.get(`/api/order/${id}`),
    payOrder: (id: string) => axios.get(`/api/order/Pay/${id}`),
    getMyOrders: () => axios.post('api/order/myorders')
}


const statstics={
    getStatics:()=>axios.get("/api/Statstics/productStatstics"),
}

const agent = {
    products,
    Auth,
    Account,
    Order,
    statstics
}

// Export ToastService for use throughout the application
export { ToastService };

export default agent
