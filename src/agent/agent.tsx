import axios, { AxiosResponse } from 'axios'
import { ProductModel } from './../Models/ProductModel';



axios.defaults.baseURL = 'http://localhost:5000'

axios.interceptors.request.use(async(request)=>{



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

const agent ={
    productsApi
}


export default agent