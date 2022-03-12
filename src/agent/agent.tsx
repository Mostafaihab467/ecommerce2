import axios, { AxiosResponse } from 'axios'
import { IUserModel } from '../Models/userModel';
import { ProductModel } from './../Models/ProductModel';



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

const agent ={
    productsApi,
    Auth
}


export default agent