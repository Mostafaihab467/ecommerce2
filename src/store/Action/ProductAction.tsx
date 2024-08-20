import agent from "../../agent/agent";
import { ProductModel } from "../../Models/ProductModel";
import { Action } from "../reducers/ProductReducer";

// src/store/actions/productActions.ts
export const SET_CURRENT_PAGE = (page: number) => ({
  type: "SET_CURRENT_PAGE",
  payload: page,
});

export const SET_TOTAL_PAGES = (total: number) => ({
  type: "SET_TOTAL_PAGES",
  payload: total,
});

export const InitProducts = (page: number = 1) => {
  return async (dispatch: any) => {
    try {
      // Fetch products with pagination
      const response = await agent.products.getAllproducts(page);

      // Check if response data exists
      if (response.data) {
        // Destructure the data and totalPages
        const data = response.data;
        const totalPages = response.data.totalPages;
        //   console.log("response : ",response)
        // Extract products from data
        const products = data.products;

        // Dispatch actions to update state
        dispatch(INITPRODS(products));
        dispatch(SET_TOTAL_PAGES(totalPages));
        dispatch(SET_CURRENT_PAGE(page));
      } else {
        console.error("No data found in response.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

export const AddProductImage = (products: any) => {
  return async (dispatch: any) => {
    await agent.products.AddProduct_Image(products).then((res) => {
      dispatch(ADD_PRODUCT_IMAGE(res.data as any));
    });
  };
};

export const userAddProduct = (products: any) => {
  return async (dispatch: any) => {
    await agent.products.userAddProduct(products).then((res) => {
      dispatch(USER_ADD_PRODUCT(res.data as any));
    });
  };
};

export const setFilters = (filters: any) => ({
  type: "SET_FILTERS",
  payload: filters,
});

export const getProductByID = (id: string) => {
  return async (dispatch: any) => {
    await agent.products.getProductbyId(id).then((res) => {
      dispatch(SELECTED_PRODUCT(res.data as ProductModel));
    });
  };
};

export const udateProduct = (product: ProductModel) => {
  return async (dispatch: any) => {
    await agent.products.productUpdate(product).then((res) => {
      dispatch(UPDATE_PRODUCT(product));
    });
  };
};

export const deleteProduct = (id: string) => {
  return async (dispatch: any) => {
    await agent.products.deleteProduct(id).then((res) => {
      dispatch(DELETE_PRODUCT(id));
    });
  };
};

const UPDATE_PRODUCT = (product: ProductModel) => ({
  type: "UPDATE_PRODUCT",
  payload: product,
});

export const INITPRODS = (action: any) => ({
  type: "INITPRODS",
  payload: action,
});

export const SELECTED_PRODUCT = (item: ProductModel) => ({
  type: "SELECTED_PRODUCT",
  payload: item,
});

const DELETE_PRODUCT = (id: string) => ({
  type: "DELETE_PRODUCT",
  payload: id,
});

export const HANDEL_PAGE_CHANGE = (page: number) => ({
  type: "HANDEL_PAGE_CHANGE",
  payload: page,
});

export const USER_ADD_PRODUCT = (payload: any) => ({
  type: "USER_ADD_PRODUCT",
  payload: payload,
});

export const ADD_PRODUCT_IMAGE = (payload: any) => ({
  type: "ADD_PRODUCT_IMAGE",
  payload: payload,
});
