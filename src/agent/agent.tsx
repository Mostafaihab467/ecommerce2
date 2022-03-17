import axios, { AxiosResponse } from 'axios'
import { IUserModel } from '../Models/userModel';
import { ProductModel } from './../Models/ProductModel';
import { IOrder } from './../Models/OrderModel';



axios.defaults.baseURL = 'http://localhost:5000'

axios.interceptors.request.use(async(request)=>{
    const token = window.localStorage.getItem('jwt')
    
   token ? request.headers!.Authorization = `Bearer ${token}` : null
  
    return request
})




axios.interceptors.response.use(async(response)=>{


    return response
},(error:AxiosResponse)=>{

  console.log(error)

})


const productsApi={
    getAllproducts:()=>axios.get('/api/products'),
    getProductbyId:(id:string)=>axios.get(`/api/products/${id}`),
    addto_cart:(items:ProductModel)=>axios.post('/api/addtocart',items)
 

}

const Auth={
    login:(user:IUserModel)=>axios.post('/api/Account/login',user),
    register:(user:IUserModel)=>axios.post('/api/Account/register',user)
}

const Order={
    placeOrder:(order:IOrder)=>axios.post('/api/order/placeOrder',order),
    findOrderbyId:(id:string)=>axios.get(`/api/order/${id}`),
    payOrder:(id:string)=>axios.get(`/api/order/Pay/${id}`),
    getMyOrders:()=>axios.post('api/order/myorders')
}

const agent ={
    productsApi,
    Auth,
    Order
}


export default agent