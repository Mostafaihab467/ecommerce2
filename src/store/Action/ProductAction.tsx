import agent from "../../agent/agent"
import { ProductModel } from "../../Models/ProductModel"





export const InitProducts = () => {
    return async (dispatch: any) => {
        await agent.products.getAllproducts().then((res) => {
            dispatch(INITPRODS([res.data]))
        })
    }
}


export const getProductByID = (id: string) => {
    return async (dispatch: any) => {
        await agent.products.getProductbyId(id).then((res) => {
            dispatch(SELECTED_PRODUCT(res.data as ProductModel))
        })
    }

}

export const udateProduct = (product: ProductModel) => {

    return async (dispatch: any) => {
        await agent.products.productUpdate(product).then((res) => {
            dispatch(UPDATE_PRODUCT(product))
        })


    }
}


export const deleteProduct = (id: string) => {
    return async (dispatch: any) => {
        await agent.products.deleteProduct(id).then(res => {
            dispatch(DELETE_PRODUCT(id))
        })
    }
}

const UPDATE_PRODUCT = (product: ProductModel) => ({
    type: 'UPDATE_PRODUCT',
    payload: product
})

export const INITPRODS = (products: any) => ({
    type: 'INITPRODS',
    payload: products
})

export const SELECTED_PRODUCT = (item: ProductModel) => ({
    type: 'SELECTED_PRODUCT',
    payload: item
})

const DELETE_PRODUCT = (id: string) => ({
    type: 'DELETE_PRODUCT',
    payload: id
})

