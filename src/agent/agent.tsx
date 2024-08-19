import axios, { AxiosResponse } from 'axios'
import { IUserModel } from '../Models/userModel';
import { ProductModel } from './../Models/ProductModel';
import { IOrder } from './../Models/OrderModel';



axios.defaults.baseURL = 'http://localhost:5000'

axios.interceptors.request.use(async (request) => {
    const token = window.localStorage.getItem('jwt')

    request.headers!.Authorization = `Bearer ${token}` 

    return request
})




axios.interceptors.response.use(async (response) => {


    return response
}, (error: AxiosResponse) => {

    console.log(error)

})


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
    productUpdate: (product: ProductModel) => axios.post('/api/products/EditProduct', product),
    deleteProduct: (id: string) => axios.get(`/api/products/deleteProduct/${id}`)


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

const agent = {
    products,
    Auth,
    Account,
    Order
}


export default agent